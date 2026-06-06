import {
  collection, addDoc, getDocs, query,
  orderBy, serverTimestamp, where,
  doc, updateDoc, increment, setDoc, getDoc,
  deleteDoc, Timestamp,
} from "firebase/firestore";
import { db } from "./firebase";
import { type BlogPost } from "@/data/blog";

// ── Types ────────────────────────────────────────────────────

export type Review = {
  id:          string;
  serviceSlug: string;
  name:        string;
  role:        string;
  rating:      number;
  text:        string;
  createdAt:   Timestamp | null;
  approved:    boolean;
};

export type ContactSubmission = {
  name:      string;
  email:     string;
  subject:   string;
  message:   string;
};

export type Subscriber = {
  email:     string;
};

// ── Reviews ──────────────────────────────────────────────────

export async function submitReview(
  data: Omit<Review, "id" | "createdAt" | "approved">
) {
  await addDoc(collection(db, "reviews"), {
    ...data,
    approved:  false,   // admin approves before showing
    createdAt: serverTimestamp(),
  });
}

export async function getApprovedReviews(serviceSlug: string): Promise<Review[]> {
  const q = query(
    collection(db, "reviews"),
    where("serviceSlug", "==", serviceSlug),
    where("approved", "==", true),
    orderBy("createdAt", "desc")
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Review));
}

export async function getAllReviews(): Promise<Review[]> {
  const q = query(collection(db, "reviews"), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Review));
}

// ── Contact submissions ───────────────────────────────────────

export async function submitContact(data: ContactSubmission) {
  await addDoc(collection(db, "contacts"), {
    ...data,
    createdAt: serverTimestamp(),
    read:      false,
  });
}

// ── Newsletter subscribers ────────────────────────────────────

export async function subscribeEmail(email: string) {
  // Use email as doc ID to prevent duplicates
  const ref = doc(db, "subscribers", email.toLowerCase().trim());
  await setDoc(ref, { email: email.toLowerCase().trim(), subscribedAt: serverTimestamp() }, { merge: true });
}

// ── Page analytics ────────────────────────────────────────────

export async function trackPageView(page: string) {
  const ref = doc(db, "analytics", page);
  const snap = await getDoc(ref);
  if (snap.exists()) {
    await updateDoc(ref, { views: increment(1), lastVisited: serverTimestamp() });
  } else {
    await setDoc(ref, { page, views: 1, lastVisited: serverTimestamp() });
  }
}

// ── Blogs CRUD ───────────────────────────────────────────────

export async function createBlogPost(data: Omit<BlogPost, "id">): Promise<string> {
  const docRef = await addDoc(collection(db, "blogs"), {
    ...data,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function updateBlogPost(id: string, data: Partial<BlogPost>): Promise<void> {
  const ref = doc(db, "blogs", id);
  await updateDoc(ref, {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteBlogPost(id: string): Promise<void> {
  const ref = doc(db, "blogs", id);
  await deleteDoc(ref);
}

export async function getFirestoreBlogPosts(): Promise<(BlogPost & { id: string })[]> {
  try {
    const q = query(collection(db, "blogs"), orderBy("createdAt", "desc"));
    const snap = await getDocs(q);
    return snap.docs.map((d) => {
      const data = d.data();
      return {
        id: d.id,
        slug: data.slug || "",
        title: data.title || "",
        excerpt: data.excerpt || "",
        content: data.content || "",
        category: data.category || "Engineering",
        date: data.date || "",
        readTime: data.readTime || "",
        tags: data.tags || [],
        coverImage: data.coverImage || "",
        author: data.author || { name: "", role: "", avatar: "" }
      } as BlogPost & { id: string };
    });
  } catch (err) {
    console.error("Error getting firestore blogs:", err);
    return [];
  }
}

export async function getFirestoreBlogPostBySlug(slug: string): Promise<(BlogPost & { id: string }) | null> {
  try {
    const q = query(collection(db, "blogs"), where("slug", "==", slug));
    const snap = await getDocs(q);
    if (snap.empty) return null;
    const doc = snap.docs[0];
    const data = doc.data();
    return {
      id: doc.id,
      slug: data.slug || "",
      title: data.title || "",
      excerpt: data.excerpt || "",
      content: data.content || "",
      category: data.category || "Engineering",
      date: data.date || "",
      readTime: data.readTime || "",
      tags: data.tags || [],
      coverImage: data.coverImage || "",
      author: data.author || { name: "", role: "", avatar: "" }
    } as BlogPost & { id: string };
  } catch (err) {
    console.error("Error getting blog by slug:", err);
    return null;
  }
}

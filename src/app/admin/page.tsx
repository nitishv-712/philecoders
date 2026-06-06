"use client";

import { useState, useEffect, useMemo } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import {
  getFirestoreBlogPosts,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
  getAllReviews,
  updateReviewApproval,
  deleteReview,
  getAllContacts,
  markContactAsRead,
  deleteContact,
  getAllSubscribers,
  deleteSubscriber,
  getAnalyticsStats,
  type Review,
  type ContactSubmission
} from "@/lib/firestore";
import { blogPosts as staticPosts, type BlogPost } from "@/data/blog";
import {
  Plus,
  LogOut,
  Edit2,
  Trash2,
  Calendar,
  Layers,
  Search,
  Loader2,
  FileText,
  Lock,
  Globe,
  MessageSquare,
  Mail,
  Users,
  BarChart2,
  Check,
  X,
  MailOpen,
  Star,
  Activity,
  ArrowUpRight
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogFormModal from "@/components/BlogFormModal";

type MergedBlogPost = BlogPost & {
  id: string;
  isStatic: boolean;
};

export default function AdminDashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Dashboard Tabs
  const [activeTab, setActiveTab] = useState<"blogs" | "reviews" | "contacts" | "subscribers" | "analytics">("blogs");
  const [searchQuery, setSearchQuery] = useState("");

  // Data states
  const [customPosts, setCustomPosts] = useState<(BlogPost & { id: string })[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [contacts, setContacts] = useState<(ContactSubmission & { id: string; createdAt?: string; read: boolean })[]>([]);
  const [subscribers, setSubscribers] = useState<{ email: string; subscribedAt?: string }[]>([]);
  const [analytics, setAnalytics] = useState<{ page: string; views: number; lastVisited?: string }[]>([]);

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<(BlogPost & { id: string }) | null>(null);

  // Delete states
  const [deletingPostId, setDeletingPostId] = useState<string | null>(null);
  const [deletingLoading, setDeletingLoading] = useState(false);

  const router = useRouter();

  // Load all dashboard dynamic components
  const loadAllData = async () => {
    try {
      const [postsData, reviewsData, contactsData, subsData, analyticsData] = await Promise.all([
        getFirestoreBlogPosts(),
        getAllReviews(),
        getAllContacts(),
        getAllSubscribers(),
        getAnalyticsStats()
      ]);
      setCustomPosts(postsData);
      setReviews(reviewsData);
      setContacts(contactsData);
      setSubscribers(subsData);
      setAnalytics(analyticsData);
    } catch (err) {
      console.error("Failed to load dashboard statistics:", err);
    }
  };

  // Auth State Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        router.push("/admin/login");
      } else {
        setUser(currentUser);
        await loadAllData();
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push("/");
    } catch (err) {
      console.error(err);
    }
  };

  // Merge static posts and dynamic posts
  const mergedPosts = useMemo((): MergedBlogPost[] => {
    const staticMerged: MergedBlogPost[] = staticPosts.map((post, index) => ({
      ...post,
      id: `static-${index}`,
      isStatic: true
    }));

    const customMerged: MergedBlogPost[] = customPosts.map((post) => ({
      ...post,
      isStatic: false
    }));

    return [...customMerged, ...staticMerged];
  }, [customPosts]);

  // Statistics Computations
  const stats = useMemo(() => {
    const totalBlogs = mergedPosts.length;
    const totalReviews = reviews.length;
    const approvedReviews = reviews.filter((r) => r.approved).length;
    const totalContacts = contacts.length;
    const unreadContacts = contacts.filter((c) => !c.read).length;
    const totalSubscribers = subscribers.length;
    const totalViews = analytics.reduce((sum, item) => sum + item.views, 0);
    return { totalBlogs, totalReviews, approvedReviews, totalContacts, unreadContacts, totalSubscribers, totalViews };
  }, [mergedPosts, reviews, contacts, subscribers, analytics]);

  // Handle Blog CRUD
  const handleSaveBlogPost = async (postData: Omit<BlogPost, "id"> & { id?: string }) => {
    if (postData.id) {
      const { id, ...data } = postData;
      await updateBlogPost(id, data);
    } else {
      await createBlogPost(postData);
    }
    await loadAllData();
  };

  const handleDeleteBlogPost = async () => {
    if (!deletingPostId) return;
    setDeletingLoading(true);
    try {
      await deleteBlogPost(deletingPostId);
      await loadAllData();
      setDeletingPostId(null);
    } catch (err) {
      console.error("Failed to delete post:", err);
    } finally {
      setDeletingLoading(false);
    }
  };

  // Handle Reviews CRUD
  const handleToggleReview = async (id: string, currentApprovedStatus: boolean) => {
    try {
      await updateReviewApproval(id, !currentApprovedStatus);
      await loadAllData();
    } catch (err) {
      console.error("Failed to toggle review approval:", err);
    }
  };

  const handleDeleteReviewItem = async (id: string) => {
    if (!confirm("Are you sure you want to delete this review?")) return;
    try {
      await deleteReview(id);
      await loadAllData();
    } catch (err) {
      console.error("Failed to delete review:", err);
    }
  };

  // Handle Contacts CRUD
  const handleMarkContactAsReadItem = async (id: string) => {
    try {
      await markContactAsRead(id);
      await loadAllData();
    } catch (err) {
      console.error("Failed to mark contact submission as read:", err);
    }
  };

  const handleDeleteContactItem = async (id: string) => {
    if (!confirm("Are you sure you want to delete this contact submission?")) return;
    try {
      await deleteContact(id);
      await loadAllData();
    } catch (err) {
      console.error("Failed to delete contact entry:", err);
    }
  };

  // Handle Newsletter Subscribers CRUD
  const handleDeleteSub = async (email: string) => {
    if (!confirm(`Are you sure you want to unsubscribe ${email}?`)) return;
    try {
      await deleteSubscriber(email);
      await loadAllData();
    } catch (err) {
      console.error("Failed to remove subscriber:", err);
    }
  };

  // Filter Active Tab Data based on Search Query
  const filteredBlogs = useMemo(() => {
    return mergedPosts.filter((post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [mergedPosts, searchQuery]);

  const filteredReviews = useMemo(() => {
    return reviews.filter((r) =>
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.serviceSlug.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [reviews, searchQuery]);

  const filteredContacts = useMemo(() => {
    return contacts.filter((c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.message.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [contacts, searchQuery]);

  const filteredSubscribers = useMemo(() => {
    return subscribers.filter((s) =>
      s.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [subscribers, searchQuery]);

  const filteredAnalytics = useMemo(() => {
    return analytics.filter((a) =>
      a.page.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [analytics, searchQuery]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--bg)" }}>
        <Loader2 className="animate-spin text-[#7c3aed]" size={45} />
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-24 px-5 sm:px-8" style={{ background: "var(--bg)" }}>
        <div className="max-w-6xl mx-auto space-y-10">

          {/* Header Panel */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 pb-6 border-b" style={{ borderColor: "var(--border-soft)" }}>
            <div>
              <h1 className="text-4xl font-black leading-tight" style={{ color: "var(--text-primary)" }}>
                Management <span className="gradient-text">Dashboard</span>
              </h1>
              <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
                Logged in as <span className="font-semibold text-slate-800">{user?.email}</span>
              </p>
            </div>

            <div className="flex gap-3 w-full sm:w-auto">
              <button
                onClick={() => { setEditingPost(null); setIsModalOpen(true); }}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-bold shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
                style={{ background: "linear-gradient(135deg, #0170f4, #7c3aed)" }}
              >
                <Plus size={16} /> Write Post
              </button>
              <button
                onClick={handleSignOut}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-semibold transition-all hover:bg-red-50 hover:text-red-600 hover:border-red-200 cursor-pointer"
                style={{ background: "var(--bg-card)", borderColor: "var(--border)", color: "var(--text-body)" }}
              >
                <LogOut size={15} /> Log Out
              </button>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl border" style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
              <p className="text-xs font-bold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>Total Blogs</p>
              <h3 className="text-3xl font-black mt-2 gradient-text">{stats.totalBlogs}</h3>
            </div>
            <div className="p-5 rounded-2xl border" style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
              <p className="text-xs font-bold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>Service Reviews</p>
              <h3 className="text-3xl font-black mt-2 text-[#0170f4]">
                {stats.approvedReviews} <span className="text-xs font-normal text-slate-400">/ {stats.totalReviews} approved</span>
              </h3>
            </div>
            <div className="p-5 rounded-2xl border" style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
              <p className="text-xs font-bold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>Inquiries</p>
              <h3 className="text-3xl font-black mt-2 text-[#7c3aed]">
                {stats.unreadContacts} <span className="text-xs font-normal text-slate-400">/ {stats.totalContacts} unread</span>
              </h3>
            </div>
            <div className="p-5 rounded-2xl border" style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
              <p className="text-xs font-bold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>Newsletter Subs</p>
              <h3 className="text-3xl font-black mt-2 text-[#059669]">{stats.totalSubscribers}</h3>
            </div>
          </div>

          {/* Tabs Selector Navigation */}
          <div className="flex border-b overflow-x-auto gap-2 py-1" style={{ borderColor: "var(--border-soft)" }}>
            <button
              onClick={() => { setActiveTab("blogs"); setSearchQuery(""); }}
              className="flex items-center gap-2 px-5 py-3 text-sm font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap"
              style={{
                borderColor: activeTab === "blogs" ? "#7c3aed" : "transparent",
                color: activeTab === "blogs" ? "var(--text-primary)" : "var(--text-muted)"
              }}
            >
              <FileText size={16} /> Blog Posts ({stats.totalBlogs})
            </button>
            <button
              onClick={() => { setActiveTab("reviews"); setSearchQuery(""); }}
              className="flex items-center gap-2 px-5 py-3 text-sm font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap"
              style={{
                borderColor: activeTab === "reviews" ? "#7c3aed" : "transparent",
                color: activeTab === "reviews" ? "var(--text-primary)" : "var(--text-muted)"
              }}
            >
              <MessageSquare size={16} /> Reviews ({stats.totalReviews})
            </button>
            <button
              onClick={() => { setActiveTab("contacts"); setSearchQuery(""); }}
              className="flex items-center gap-2 px-5 py-3 text-sm font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap"
              style={{
                borderColor: activeTab === "contacts" ? "#7c3aed" : "transparent",
                color: activeTab === "contacts" ? "var(--text-primary)" : "var(--text-muted)"
              }}
            >
              <Mail size={16} /> Contact Forms ({stats.unreadContacts} new)
            </button>
            <button
              onClick={() => { setActiveTab("subscribers"); setSearchQuery(""); }}
              className="flex items-center gap-2 px-5 py-3 text-sm font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap"
              style={{
                borderColor: activeTab === "subscribers" ? "#7c3aed" : "transparent",
                color: activeTab === "subscribers" ? "var(--text-primary)" : "var(--text-muted)"
              }}
            >
              <Users size={16} /> Subscribers ({stats.totalSubscribers})
            </button>
            <button
              onClick={() => { setActiveTab("analytics"); setSearchQuery(""); }}
              className="flex items-center gap-2 px-5 py-3 text-sm font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap"
              style={{
                borderColor: activeTab === "analytics" ? "#7c3aed" : "transparent",
                color: activeTab === "analytics" ? "var(--text-primary)" : "var(--text-muted)"
              }}
            >
              <Activity size={16} /> Traffic Stats ({stats.totalViews} views)
            </button>
          </div>

          {/* Filter Toolbar */}
          <div className="flex items-center justify-between gap-4 p-4 rounded-2xl border" style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
            <div className="relative w-full md:w-80">
              <span className="absolute inset-y-0 left-4 flex items-center pointer-events-none" style={{ color: "var(--text-faint)" }}>
                <Search size={16} />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`Search ${activeTab}...`}
                className="w-full pl-11 pr-4 py-2 rounded-xl text-sm outline-none transition-all"
                style={{
                  background: "var(--input-bg)",
                  border: "1px solid var(--input-border)",
                  color: "var(--text-primary)"
                }}
                onFocus={(e) => (e.target.style.borderColor = "#7c3aed")}
                onBlur={(e) => (e.target.style.borderColor = "var(--input-border)")}
              />
            </div>
          </div>

          {/* Main Display Container */}
          <div className="rounded-2xl border overflow-hidden shadow-lg" style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
            <div className="overflow-x-auto">

              {/* TABS: BLOGS */}
              {activeTab === "blogs" && (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b text-xs font-bold uppercase tracking-wider" style={{ borderColor: "var(--border-soft)", background: "rgba(0,0,0,0.01)" }}>
                      <th className="p-4 pl-6" style={{ color: "var(--text-muted)" }}>Post Info</th>
                      <th className="p-4" style={{ color: "var(--text-muted)" }}>Category</th>
                      <th className="p-4" style={{ color: "var(--text-muted)" }}>Date</th>
                      <th className="p-4" style={{ color: "var(--text-muted)" }}>Source</th>
                      <th className="p-4 pr-6 text-right" style={{ color: "var(--text-muted)" }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y text-sm" style={{ borderColor: "var(--border-soft)" }}>
                    {filteredBlogs.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="p-10 text-center" style={{ color: "var(--text-muted)" }}>
                          No records match the filter query.
                        </td>
                      </tr>
                    ) : (
                      filteredBlogs.map((post) => (
                        <tr key={post.id} className="hover:bg-slate-50/40 transition-colors">
                          <td className="p-4 pl-6">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 relative border bg-slate-900" style={{ borderColor: "var(--border-soft)" }}>
                                <img src={post.coverImage} alt="" className="object-cover w-full h-full" onError={(e) => {
                                  (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=80&q=80";
                                }} />
                              </div>
                              <div>
                                <p className="font-bold truncate max-w-xs md:max-w-md" style={{ color: "var(--text-primary)" }}>{post.title}</p>
                                <p className="text-xs truncate max-w-xs md:max-w-md font-mono" style={{ color: "var(--text-faint)" }}>/{post.slug}</p>
                              </div>
                            </div>
                          </td>
                          <td className="p-4">
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold"
                              style={{ background: "var(--tag-bg)", color: "var(--tag-color)" }}>
                              <Layers size={10} /> {post.category}
                            </span>
                          </td>
                          <td className="p-4" style={{ color: "var(--text-body)" }}>
                            <span className="flex items-center gap-1.5 text-xs text-slate-500">
                              <Calendar size={12} /> {post.date}
                            </span>
                          </td>
                          <td className="p-4">
                            {post.isStatic ? (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-xs font-bold bg-purple-50 text-purple-700 border border-purple-100">
                                <Lock size={10} /> Read-only Template
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-xs font-bold bg-blue-50 text-blue-700 border border-blue-100">
                                <Globe size={10} /> Live Database
                              </span>
                            )}
                          </td>
                          <td className="p-4 pr-6 text-right">
                            {post.isStatic ? (
                              <span className="text-xs font-semibold" style={{ color: "var(--text-faint)" }}>
                                No modification allowed
                              </span>
                            ) : (
                              <div className="flex justify-end gap-2">
                                <button
                                  onClick={() => { setEditingPost(post as BlogPost & { id: string }); setIsModalOpen(true); }}
                                  className="p-2 rounded-lg border text-blue-600 hover:bg-blue-50 hover:border-blue-200 transition-all cursor-pointer"
                                  style={{ borderColor: "var(--border)" }}
                                >
                                  <Edit2 size={13} />
                                </button>
                                <button
                                  onClick={() => setDeletingPostId(post.id)}
                                  className="p-2 rounded-lg border text-red-600 hover:bg-red-50 hover:border-red-200 transition-all cursor-pointer"
                                  style={{ borderColor: "var(--border)" }}
                                >
                                  <Trash2 size={13} />
                                </button>
                              </div>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              )}

              {/* TABS: REVIEWS */}
              {activeTab === "reviews" && (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b text-xs font-bold uppercase tracking-wider" style={{ borderColor: "var(--border-soft)", background: "rgba(0,0,0,0.01)" }}>
                      <th className="p-4 pl-6" style={{ color: "var(--text-muted)" }}>Author</th>
                      <th className="p-4" style={{ color: "var(--text-muted)" }}>Service Page</th>
                      <th className="p-4" style={{ color: "var(--text-muted)" }}>Rating & Content</th>
                      <th className="p-4" style={{ color: "var(--text-muted)" }}>Approval Status</th>
                      <th className="p-4 pr-6 text-right" style={{ color: "var(--text-muted)" }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y text-sm" style={{ borderColor: "var(--border-soft)" }}>
                    {filteredReviews.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="p-10 text-center" style={{ color: "var(--text-muted)" }}>
                          No reviews found in database.
                        </td>
                      </tr>
                    ) : (
                      filteredReviews.map((review) => (
                        <tr key={review.id} className="hover:bg-slate-50/40 transition-colors">
                          <td className="p-4 pl-6">
                            <p className="font-bold text-slate-800">{review.name}</p>
                            <p className="text-xs text-slate-500">{review.role}</p>
                          </td>
                          <td className="p-4">
                            <span className="font-mono text-xs text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                              /{review.serviceSlug}
                            </span>
                          </td>
                          <td className="p-4 max-w-sm">
                            <div className="flex gap-0.5 text-amber-500 mb-1">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star key={i} size={12} fill={i < review.rating ? "currentColor" : "none"} />
                              ))}
                            </div>
                            <p className="text-xs text-slate-700 italic line-clamp-2">"{review.text}"</p>
                          </td>
                          <td className="p-4">
                            <button
                              onClick={() => handleToggleReview(review.id, review.approved)}
                              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer"
                              style={{
                                background: review.approved ? "#dcfce7" : "#fee2e2",
                                color: review.approved ? "#15803d" : "#b91c1c"
                              }}
                            >
                              {review.approved ? (
                                <>
                                  <Check size={11} /> Approved & Displayed
                                </>
                              ) : (
                                <>
                                  <X size={11} /> Pending Review
                                </>
                              )}
                            </button>
                          </td>
                          <td className="p-4 pr-6 text-right">
                            <button
                              onClick={() => handleDeleteReviewItem(review.id)}
                              className="p-2 rounded-lg border text-red-600 hover:bg-red-50 hover:border-red-200 transition-all cursor-pointer"
                              style={{ borderColor: "var(--border)" }}
                            >
                              <Trash2 size={13} />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              )}

              {/* TABS: CONTACT SUBMISSIONS */}
              {activeTab === "contacts" && (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b text-xs font-bold uppercase tracking-wider" style={{ borderColor: "var(--border-soft)", background: "rgba(0,0,0,0.01)" }}>
                      <th className="p-4 pl-6" style={{ color: "var(--text-muted)" }}>Sender</th>
                      <th className="p-4" style={{ color: "var(--text-muted)" }}>Subject & Message</th>
                      <th className="p-4" style={{ color: "var(--text-muted)" }}>Date Submitted</th>
                      <th className="p-4" style={{ color: "var(--text-muted)" }}>Read Status</th>
                      <th className="p-4 pr-6 text-right" style={{ color: "var(--text-muted)" }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y text-sm" style={{ borderColor: "var(--border-soft)" }}>
                    {filteredContacts.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="p-10 text-center" style={{ color: "var(--text-muted)" }}>
                          No contact inquiries submitted.
                        </td>
                      </tr>
                    ) : (
                      filteredContacts.map((c) => (
                        <tr key={c.id} className="hover:bg-slate-50/40 transition-colors">
                          <td className="p-4 pl-6">
                            <p className="font-bold text-slate-800">{c.name}</p>
                            <a href={`mailto:${c.email}`} className="text-xs text-blue-600 hover:underline">{c.email}</a>
                          </td>
                          <td className="p-4 max-w-md">
                            <p className="font-bold text-slate-800 text-xs mb-1">Sub: {c.subject}</p>
                            <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100 leading-relaxed font-sans">{c.message}</p>
                          </td>
                          <td className="p-4 text-xs text-slate-500">
                            {c.createdAt}
                          </td>
                          <td className="p-4">
                            {c.read ? (
                              <span className="inline-flex items-center gap-1 text-xs text-slate-500 font-medium">
                                <MailOpen size={12} className="text-slate-400" /> Read
                              </span>
                            ) : (
                              <button
                                onClick={() => handleMarkContactAsReadItem(c.id)}
                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-[#f3e8ff] text-[#7c3aed] border border-[#e9d5ff] transition-all hover:scale-105 cursor-pointer"
                              >
                                Mark as Read
                              </button>
                            )}
                          </td>
                          <td className="p-4 pr-6 text-right">
                            <button
                              onClick={() => handleDeleteContactItem(c.id)}
                              className="p-2 rounded-lg border text-red-600 hover:bg-red-50 hover:border-red-200 transition-all cursor-pointer"
                              style={{ borderColor: "var(--border)" }}
                            >
                              <Trash2 size={13} />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              )}

              {/* TABS: NEWSLETTER SUBSCRIBERS */}
              {activeTab === "subscribers" && (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b text-xs font-bold uppercase tracking-wider" style={{ borderColor: "var(--border-soft)", background: "rgba(0,0,0,0.01)" }}>
                      <th className="p-4 pl-6" style={{ color: "var(--text-muted)" }}>Subscriber Email</th>
                      <th className="p-4" style={{ color: "var(--text-muted)" }}>Subscription Date</th>
                      <th className="p-4 pr-6 text-right" style={{ color: "var(--text-muted)" }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y text-sm" style={{ borderColor: "var(--border-soft)" }}>
                    {filteredSubscribers.length === 0 ? (
                      <tr>
                        <td colSpan={3} className="p-10 text-center" style={{ color: "var(--text-muted)" }}>
                          No subscribers registered yet.
                        </td>
                      </tr>
                    ) : (
                      filteredSubscribers.map((sub) => (
                        <tr key={sub.email} className="hover:bg-slate-50/40 transition-colors">
                          <td className="p-4 pl-6">
                            <p className="font-bold text-slate-800">{sub.email}</p>
                          </td>
                          <td className="p-4 text-xs text-slate-500">
                            {sub.subscribedAt || "Unknown date"}
                          </td>
                          <td className="p-4 pr-6 text-right">
                            <button
                              onClick={() => handleDeleteSub(sub.email)}
                              className="p-2 rounded-lg border text-red-600 hover:bg-red-50 hover:border-red-200 transition-all cursor-pointer"
                              style={{ borderColor: "var(--border)" }}
                            >
                              <Trash2 size={13} />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              )}

              {/* TABS: WEB TRAFFIC STATS */}
              {activeTab === "analytics" && (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b text-xs font-bold uppercase tracking-wider" style={{ borderColor: "var(--border-soft)", background: "rgba(0,0,0,0.01)" }}>
                      <th className="p-4 pl-6" style={{ color: "var(--text-muted)" }}>Page URL</th>
                      <th className="p-4" style={{ color: "var(--text-muted)" }}>View Count</th>
                      <th className="p-4" style={{ color: "var(--text-muted)" }}>Visitor Graph</th>
                      <th className="p-4 pr-6" style={{ color: "var(--text-muted)" }}>Last Activity Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y text-sm" style={{ borderColor: "var(--border-soft)" }}>
                    {filteredAnalytics.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="p-10 text-center" style={{ color: "var(--text-muted)" }}>
                          No page views logged yet.
                        </td>
                      </tr>
                    ) : (
                      filteredAnalytics.map((a) => {
                        const highestCount = Math.max(...analytics.map(itm => itm.views), 1);
                        const progressPercent = Math.min((a.views / highestCount) * 100, 100);
                        return (
                          <tr key={a.page} className="hover:bg-slate-50/40 transition-colors">
                            <td className="p-4 pl-6 font-mono text-xs">
                              <span className="flex items-center gap-1 text-[#7c3aed]">
                                {a.page} <ArrowUpRight size={10} />
                              </span>
                            </td>
                            <td className="p-4 font-bold text-slate-800">
                              {a.views.toLocaleString()}
                            </td>
                            <td className="p-4 w-1/3">
                              <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                                <div className="bg-gradient-to-r from-[#0170f4] to-[#7c3aed] h-full rounded-full" style={{ width: `${progressPercent}%` }} />
                              </div>
                            </td>
                            <td className="p-4 text-xs text-slate-500 pr-6">
                              {a.lastVisited || "N/A"}
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              )}

            </div>
          </div>

        </div>
      </main>

      {/* Editor Modal */}
      <BlogFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveBlogPost}
        editingPost={editingPost}
      />

      {/* Delete Confirmation Modal */}
      {deletingPostId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
          <div className="w-full max-w-md p-6 rounded-3xl border shadow-2xl space-y-6"
            style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto mb-4 border border-red-100">
                <Trash2 size={20} />
              </div>
              <h3 className="text-lg font-black" style={{ color: "var(--text-primary)" }}>Delete Article?</h3>
              <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
                This action cannot be undone. The article will be permanently removed from the database and sitemap.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setDeletingPostId(null)}
                className="flex-1 py-2.5 rounded-xl border text-sm font-semibold transition-all hover:bg-slate-50 cursor-pointer"
                style={{ borderColor: "var(--border)", color: "var(--text-body)" }}
              >
                Keep Post
              </button>
              <button
                onClick={handleDeleteBlogPost}
                disabled={deletingLoading}
                className="flex-1 py-2.5 rounded-xl text-white text-sm font-bold bg-red-600 hover:bg-red-700 transition-all disabled:opacity-60 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                {deletingLoading ? <Loader2 className="animate-spin" size={15} /> : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}

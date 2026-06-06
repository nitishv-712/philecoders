"use client";

import { useState, useEffect, useMemo } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import {
  getFirestoreBlogPosts,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost
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
  Globe
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
  const [customPosts, setCustomPosts] = useState<(BlogPost & { id: string })[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<(BlogPost & { id: string }) | null>(null);

  // Delete states
  const [deletingPostId, setDeletingPostId] = useState<string | null>(null);
  const [deletingLoading, setDeletingLoading] = useState(false);

  const router = useRouter();

  // Load custom posts from firestore
  const loadPosts = async () => {
    try {
      const posts = await getFirestoreBlogPosts();
      setCustomPosts(posts);
    } catch (err) {
      console.error("Failed to load firestore posts:", err);
    }
  };

  // Auth State Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        router.push("/admin/login");
      } else {
        setUser(currentUser);
        await loadPosts();
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

  // Filter posts
  const filteredPosts = useMemo(() => {
    return mergedPosts.filter((post) => {
      return (
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  }, [mergedPosts, searchQuery]);

  const stats = useMemo(() => {
    const total = mergedPosts.length;
    const custom = customPosts.length;
    const staticCount = staticPosts.length;
    const categories = Array.from(new Set(mergedPosts.map((p) => p.category))).length;
    return { total, custom, staticCount, categories };
  }, [mergedPosts, customPosts]);

  const handleSave = async (postData: Omit<BlogPost, "id"> & { id?: string }) => {
    if (postData.id) {
      // Update
      const { id, ...data } = postData;
      await updateBlogPost(id, data);
    } else {
      // Create
      await createBlogPost(postData);
    }
    await loadPosts();
  };

  const handleDelete = async () => {
    if (!deletingPostId) return;
    setDeletingLoading(true);
    try {
      await deleteBlogPost(deletingPostId);
      await loadPosts();
      setDeletingPostId(null);
    } catch (err) {
      console.error("Failed to delete post:", err);
    } finally {
      setDeletingLoading(false);
    }
  };

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
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-semibold transition-all hover:bg-red-50 hover:text-red-600 hover:borderColor-red-200 cursor-pointer"
                style={{ background: "var(--bg-card)", borderColor: "var(--border)", color: "var(--text-body)" }}
              >
                <LogOut size={15} /> Log Out
              </button>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl border" style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
              <p className="text-xs font-bold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>Total Posts</p>
              <h3 className="text-3xl font-black mt-2 gradient-text">{stats.total}</h3>
            </div>
            <div className="p-5 rounded-2xl border" style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
              <p className="text-xs font-bold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>Custom Posts</p>
              <h3 className="text-3xl font-black mt-2 text-[#0170f4]">{stats.custom}</h3>
            </div>
            <div className="p-5 rounded-2xl border" style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
              <p className="text-xs font-bold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>Static Posts</p>
              <h3 className="text-3xl font-black mt-2 text-[#7c3aed]">{stats.staticCount}</h3>
            </div>
            <div className="p-5 rounded-2xl border" style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
              <p className="text-xs font-bold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>Categories</p>
              <h3 className="text-3xl font-black mt-2 text-[#059669]">{stats.categories}</h3>
            </div>
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
                placeholder="Search database records..."
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

          {/* Posts Control Table */}
          <div className="rounded-2xl border overflow-hidden shadow-lg" style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
            <div className="overflow-x-auto">
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
                  {filteredPosts.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="p-10 text-center" style={{ color: "var(--text-muted)" }}>
                        No records match the filter query.
                      </td>
                    </tr>
                  ) : (
                    filteredPosts.map((post) => (
                      <tr key={post.id} className="hover:bg-slate-50/40 transition-colors">
                        {/* Title & Slug */}
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

                        {/* Category */}
                        <td className="p-4">
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold"
                            style={{ background: "var(--tag-bg)", color: "var(--tag-color)" }}>
                            <Layers size={10} /> {post.category}
                          </span>
                        </td>

                        {/* Date */}
                        <td className="p-4" style={{ color: "var(--text-body)" }}>
                          <span className="flex items-center gap-1.5 text-xs text-slate-500">
                            <Calendar size={12} /> {post.date}
                          </span>
                        </td>

                        {/* Source type */}
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

                        {/* Control Actions */}
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
            </div>
          </div>

        </div>
      </main>

      {/* Editor Modal */}
      <BlogFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
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
                onClick={handleDelete}
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

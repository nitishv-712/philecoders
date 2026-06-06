"use client";

import { useState, useEffect } from "react";
import { X, Loader2, Image, Eye, Edit3, HelpCircle } from "lucide-react";
import { type BlogPost } from "@/data/blog";

type BlogFormModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (post: Omit<BlogPost, "id"> & { id?: string }) => Promise<void>;
  editingPost: (BlogPost & { id: string }) | null;
};

const CATEGORIES = ["Engineering", "UI/UX Design", "Marketing"];

const IMAGE_PRESETS = [
  { label: "NextJS Scale", url: "/blog/nextjs-scale.png" },
  { label: "Design Systems", url: "/blog/design-systems.png" },
  { label: "React SEO", url: "/blog/react-seo.png" },
];

export default function BlogFormModal({ isOpen, onClose, onSave, editingPost }: BlogFormModalProps) {
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Engineering");
  const [readTime, setReadTime] = useState("5 min read");
  const [tagsInput, setTagsInput] = useState("");
  const [coverImage, setCoverImage] = useState("/blog/nextjs-scale.png");
  
  // Author defaults
  const [authorName, setAuthorName] = useState("Nitish V.");
  const [authorRole, setAuthorRole] = useState("Founder & Lead Engineer");
  const [authorAvatar, setAuthorAvatar] = useState("NV");

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Initialize fields on open or editingPost change
  useEffect(() => {
    if (editingPost) {
      setTitle(editingPost.title);
      setSlug(editingPost.slug);
      setExcerpt(editingPost.excerpt);
      setContent(editingPost.content);
      setCategory(editingPost.category);
      setReadTime(editingPost.readTime);
      setTagsInput(editingPost.tags.join(", "));
      setCoverImage(editingPost.coverImage);
      setAuthorName(editingPost.author.name);
      setAuthorRole(editingPost.author.role);
      setAuthorAvatar(editingPost.author.avatar);
    } else {
      // Clear for new post
      setTitle("");
      setSlug("");
      setExcerpt("");
      setContent("");
      setCategory("Engineering");
      setReadTime("5 min read");
      setTagsInput("");
      setCoverImage("/blog/nextjs-scale.png");
      setAuthorName("Nitish V.");
      setAuthorRole("Founder & Lead Engineer");
      setAuthorAvatar("NV");
    }
    setError("");
    setActiveTab("edit");
  }, [editingPost, isOpen]);

  // Auto-slugify from title
  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!editingPost) {
      const suggestedSlug = val
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim();
      setSlug(suggestedSlug);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!title.trim() || !slug.trim() || !content.trim() || !excerpt.trim()) {
      setError("Please fill in all required fields.");
      return;
    }

    setSaving(true);
    try {
      const tags = tagsInput
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t.length > 0);

      const formattedPost = {
        title,
        slug,
        excerpt,
        content,
        category,
        readTime,
        tags,
        coverImage,
        date: editingPost ? editingPost.date : new Date().toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric"
        }),
        author: {
          name: authorName,
          role: authorRole,
          avatar: authorAvatar
        }
      };

      await onSave(editingPost ? { ...formattedPost, id: editingPost.id } : formattedPost);
      onClose();
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to save the post. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-md overflow-y-auto">
      {/* Dynamic typography preview support */}
      <style dangerouslySetInnerHTML={{ __html: `
        .preview-pane h2 {
          font-size: 1.5rem;
          font-weight: 800;
          margin-top: 2rem;
          margin-bottom: 1rem;
          color: var(--text-primary);
        }
        .preview-pane p {
          margin-bottom: 1.25rem;
          line-height: 1.75;
          color: var(--text-body);
        }
        .preview-pane blockquote {
          border-left: 4px solid var(--badge-color);
          background: var(--badge-bg);
          padding: 1rem 1.25rem;
          font-style: italic;
          color: var(--text-muted);
          margin: 1.5rem 0;
          border-radius: 0 0.5rem 0.5rem 0;
        }
        .preview-pane ul {
          list-style-type: disc;
          padding-left: 1.5rem;
          margin-bottom: 1.25rem;
          color: var(--text-body);
        }
        .preview-pane li {
          margin-bottom: 0.5rem;
        }
        .preview-pane code {
          background: rgba(0,0,0,0.05);
          padding: 0.2rem 0.4rem;
          border-radius: 0.25rem;
          font-size: 0.85em;
          color: #7c3aed;
        }
        .preview-pane pre {
          background: #0f172a;
          color: #f8fafc;
          padding: 1rem;
          border-radius: 0.75rem;
          overflow-x: auto;
          margin: 1.5rem 0;
        }
      `}} />

      <div className="relative w-full max-w-4xl rounded-3xl border shadow-2xl overflow-hidden flex flex-col my-8 max-h-[85vh]"
        style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
        
        {/* Top Highlight strip */}
        <div className="absolute top-0 left-0 right-0 h-[3px]"
          style={{ background: "linear-gradient(90deg, #0170f4, #7c3aed)" }} />

        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b" style={{ borderColor: "var(--border-soft)" }}>
          <div>
            <h2 className="text-xl font-black" style={{ color: "var(--text-primary)" }}>
              {editingPost ? "Edit" : "Write"} <span className="gradient-text">Blog Post</span>
            </h2>
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>
              {editingPost ? "Modify the existing article" : "Publish a brand new engineering or design article"}
            </p>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl border transition-all hover:bg-slate-50 cursor-pointer" style={{ borderColor: "var(--border)" }}>
            <X size={18} style={{ color: "var(--text-muted)" }} />
          </button>
        </div>

        {/* Form and Preview Tabs */}
        <div className="flex bg-slate-50/50 border-b px-6 py-2 gap-2" style={{ borderColor: "var(--border-soft)" }}>
          <button
            onClick={() => setActiveTab("edit")}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer"
            style={{
              background: activeTab === "edit" ? "var(--badge-bg)" : "transparent",
              color: activeTab === "edit" ? "var(--badge-color)" : "var(--text-muted)",
              border: activeTab === "edit" ? "1px solid rgba(124,58,237,0.2)" : "1px solid transparent"
            }}
          >
            <Edit3 size={13} /> Form Editor
          </button>
          <button
            onClick={() => setActiveTab("preview")}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer"
            style={{
              background: activeTab === "preview" ? "var(--badge-bg)" : "transparent",
              color: activeTab === "preview" ? "var(--badge-color)" : "var(--text-muted)",
              border: activeTab === "preview" ? "1px solid rgba(124,58,237,0.2)" : "1px solid transparent"
            }}
          >
            <Eye size={13} /> Visual Preview
          </button>
        </div>

        {/* Modal Scrollable Container */}
        <div className="flex-1 overflow-y-auto p-6">
          {error && (
            <div className="mb-5 p-3.5 rounded-xl border text-sm font-semibold text-red-600 bg-red-50 border-red-100">
              {error}
            </div>
          )}

          {activeTab === "edit" ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Row 1: Title & Slug */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
                    Article Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Scaling Next.js to 10M Users"
                    value={title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-all"
                    style={{ background: "var(--input-bg)", border: "1px solid var(--input-border)", color: "var(--text-primary)" }}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider flex items-center gap-1" style={{ color: "var(--text-muted)" }}>
                    Slug / URL Path <span className="text-red-500">*</span>
                    <span className="text-slate-400 cursor-help flex items-center" title="Web-safe path representation of title">
                      <HelpCircle size={12} />
                    </span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. scaling-nextjs-10m-users"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))}
                    className="w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-all"
                    style={{ background: "var(--input-bg)", border: "1px solid var(--input-border)", color: "var(--text-primary)" }}
                  />
                </div>
              </div>

              {/* Row 2: Category & Read Time & Tags */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-all"
                    style={{ background: "var(--input-bg)", border: "1px solid var(--input-border)", color: "var(--text-primary)" }}
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
                    Read Time
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 6 min read"
                    value={readTime}
                    onChange={(e) => setReadTime(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-all"
                    style={{ background: "var(--input-bg)", border: "1px solid var(--input-border)", color: "var(--text-primary)" }}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
                    Tags (comma separated)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Next.js, Scale, DevOps"
                    value={tagsInput}
                    onChange={(e) => setTagsInput(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-all"
                    style={{ background: "var(--input-bg)", border: "1px solid var(--input-border)", color: "var(--text-primary)" }}
                  />
                </div>
              </div>

              {/* Cover Image Preset Selector */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
                  Cover Image URL
                </label>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    placeholder="URL to image"
                    value={coverImage}
                    onChange={(e) => setCoverImage(e.target.value)}
                    className="flex-1 px-4 py-2.5 rounded-xl text-sm outline-none transition-all"
                    style={{ background: "var(--input-bg)", border: "1px solid var(--input-border)", color: "var(--text-primary)" }}
                  />
                  <div className="flex gap-2 flex-wrap">
                    {IMAGE_PRESETS.map((preset) => (
                      <button
                        key={preset.label}
                        type="button"
                        onClick={() => setCoverImage(preset.url)}
                        className="px-3 py-1.5 rounded-xl text-xs border font-semibold transition-all hover:bg-slate-50 cursor-pointer flex items-center gap-1"
                        style={{
                          borderColor: coverImage === preset.url ? "#7c3aed" : "var(--border)",
                          background: coverImage === preset.url ? "var(--badge-bg)" : "transparent",
                          color: coverImage === preset.url ? "var(--badge-color)" : "var(--text-muted)"
                        }}
                      >
                        <Image size={11} /> {preset.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Author Settings Accordion */}
              <div className="p-4 rounded-2xl border space-y-4" style={{ borderColor: "var(--border)" }}>
                <h4 className="text-xs font-black uppercase tracking-wider" style={{ color: "var(--text-primary)" }}>
                  Author Settings
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>Name</label>
                    <input
                      type="text"
                      value={authorName}
                      onChange={(e) => setAuthorName(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg text-xs outline-none transition-all"
                      style={{ background: "var(--input-bg)", border: "1px solid var(--input-border)", color: "var(--text-primary)" }}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>Role</label>
                    <input
                      type="text"
                      value={authorRole}
                      onChange={(e) => setAuthorRole(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg text-xs outline-none transition-all"
                      style={{ background: "var(--input-bg)", border: "1px solid var(--input-border)", color: "var(--text-primary)" }}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>Avatar Initials</label>
                    <input
                      type="text"
                      maxLength={3}
                      value={authorAvatar}
                      onChange={(e) => setAuthorAvatar(e.target.value.toUpperCase())}
                      className="w-full px-3 py-1.5 rounded-lg text-xs outline-none transition-all"
                      style={{ background: "var(--input-bg)", border: "1px solid var(--input-border)", color: "var(--text-primary)" }}
                    />
                  </div>
                </div>
              </div>

              {/* Excerpt Textarea */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
                  Excerpt / Brief Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={2}
                  maxLength={250}
                  placeholder="Summarize the article in 1 or 2 lines for the listing view..."
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-all resize-y"
                  style={{ background: "var(--input-bg)", border: "1px solid var(--input-border)", color: "var(--text-primary)" }}
                />
              </div>

              {/* Content Textarea (supports HTML markup) */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
                    Content Body (Supports HTML markup) <span className="text-red-500">*</span>
                  </label>
                  <span className="text-[10px]" style={{ color: "var(--text-faint)" }}>
                    Use &lt;p&gt;, &lt;h2&gt;, &lt;blockquote&gt;, &lt;ul&gt; &lt;li&gt;, &lt;pre&gt;&lt;code&gt;
                  </span>
                </div>
                <textarea
                  required
                  rows={10}
                  placeholder="<p>Write your detailed article body here...</p><h2>1. Focus on Performance</h2><p>Here is some code:</p><pre><code>const a = 1;</code></pre>"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-all resize-y font-mono"
                  style={{ background: "var(--input-bg)", border: "1px solid var(--input-border)", color: "var(--text-primary)" }}
                />
              </div>

              {/* Modal Actions */}
              <div className="flex justify-end gap-3 pt-4 border-t" style={{ borderColor: "var(--border-soft)" }}>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl border text-sm font-semibold transition-all hover:bg-slate-50 cursor-pointer"
                  style={{ borderColor: "var(--border)", color: "var(--text-body)" }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 rounded-xl text-white text-sm font-bold shadow-md transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 flex items-center gap-1.5 cursor-pointer"
                  style={{ background: "linear-gradient(135deg, #0170f4, #7c3aed)" }}
                >
                  {saving ? (
                    <>
                      <Loader2 className="animate-spin" size={16} /> Saving...
                    </>
                  ) : (
                    "Save Post"
                  )}
                </button>
              </div>

            </form>
          ) : (
            <div className="space-y-6">
              {/* Preview layout matching detail view */}
              <div>
                <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full inline-block mb-3"
                  style={{ background: "var(--tag-bg)", color: "var(--tag-color)" }}>
                  {category}
                </span>
                <h1 className="text-3xl font-black mb-4 leading-snug" style={{ color: "var(--text-primary)" }}>
                  {title || "Untitled Post"}
                </h1>
                <div className="flex items-center gap-3.5 pb-6 border-b mb-6" style={{ borderColor: "var(--border-soft)" }}>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm text-white"
                    style={{ background: "linear-gradient(135deg, #0170f4, #7c3aed)" }}>
                    {authorAvatar}
                  </div>
                  <div>
                    <p className="text-xs font-bold" style={{ color: "var(--text-primary)" }}>{authorName}</p>
                    <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>{authorRole} • {readTime}</p>
                  </div>
                </div>
              </div>

              {coverImage && (
                <div className="rounded-2xl overflow-hidden aspect-[21/9] relative border" style={{ borderColor: "var(--border-soft)" }}>
                  <img
                    src={coverImage}
                    alt="Cover preview"
                    className="object-cover absolute inset-0 w-full h-full"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80";
                    }}
                  />
                </div>
              )}

              {/* Content rendering wrapper */}
              <div className="preview-pane max-w-none pt-4">
                {content ? (
                  <div dangerouslySetInnerHTML={{ __html: content }} />
                ) : (
                  <p className="text-sm italic" style={{ color: "var(--text-faint)" }}>No content written yet. Switch to the editor to write.</p>
                )}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

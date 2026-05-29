"use client";

import { MaybeImage } from "@/components/MaybeImage";
import {
  BarChart3,
  CalendarPlus,
  CheckCircle2,
  ImagePlus,
  LogOut,
  MessageSquare,
  Newspaper,
  PenLine,
  Save,
  Trash2,
  Upload
} from "lucide-react";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { blogPosts, comments as seededComments, events, galleryItems } from "@/lib/content";
import { getClientDb, getClientStorage, isFirebaseConfigured } from "@/lib/firebase";
import type { BlogPost, Category, Comment, EventItem, EventType, GalleryItem } from "@/lib/types";
import { excerptFromHtml, makeSlug } from "@/lib/utils";
import { RichTextEditor } from "./RichTextEditor";

type Tab = "overview" | "blog" | "events" | "gallery" | "images" | "comments";

const tabs: Array<{ id: Tab; label: string; icon: typeof BarChart3 }> = [
  { id: "overview", label: "Overview", icon: BarChart3 },
  { id: "blog", label: "Blog", icon: Newspaper },
  { id: "events", label: "Events", icon: CalendarPlus },
  { id: "gallery", label: "Gallery", icon: ImagePlus },
  { id: "images", label: "Images", icon: ImagePlus },
  { id: "comments", label: "Comments", icon: MessageSquare }
];

const categories: Category[] = ["Psychology", "Leadership", "Education", "Wellness"];
const eventTypes: EventType[] = ["Conferences", "Workshops", "Lectures", "PDC events", "University activities"];
const galleryCategories: GalleryItem["category"][] = ["Events", "Lectures", "Workshops", "Community"];

const emptyPost: BlogPost = {
  id: "",
  slug: "",
  title: "",
  excerpt: "",
  category: "Psychology",
  coverImage: "",
  content: "<p></p>",
  author: "Steve Muthusi, PhD",
  publishedAt: new Date().toISOString().slice(0, 10),
  likes: 0
};

const emptyEvent: EventItem = {
  id: "",
  slug: "",
  title: "",
  date: new Date().toISOString().slice(0, 10),
  type: "PDC events",
  description: "",
  coverImage: "",
  gallery: [],
  location: "Nairobi, Kenya"
};

const emptyGallery: GalleryItem = {
  id: "",
  title: "",
  category: "Events",
  image: "",
  description: ""
};

export function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const [tab, setTab] = useState<Tab>("overview");
  const [posts, setPosts] = useState<BlogPost[]>(blogPosts);
  const [eventItems, setEventItems] = useState<EventItem[]>(events);
  const [images, setImages] = useState<GalleryItem[]>(galleryItems);
  const [commentItems, setCommentItems] = useState<Comment[]>(seededComments);
  const [postDraft, setPostDraft] = useState<BlogPost>(emptyPost);
  const [eventDraft, setEventDraft] = useState<EventItem>(emptyEvent);
  const [galleryDraft, setGalleryDraft] = useState<GalleryItem>(emptyGallery);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    loadContent();
  }, []);

  const imageStats = useMemo(() => {
    const blogImages = posts.reduce((sum, post) => sum + (post.coverImage?.trim() ? 1 : 0), 0);
    const galleryImages = images.reduce((sum, item) => sum + (item.image?.trim() ? 1 : 0), 0);
    const eventCoverImages = eventItems.reduce((sum, event) => sum + (event.coverImage?.trim() ? 1 : 0), 0);
    const eventGalleryImages = eventItems.reduce(
      (sum, event) => sum + event.gallery.filter((item) => item?.trim()).length,
      0
    );

    return {
      blogImages,
      galleryImages,
      eventCoverImages,
      eventGalleryImages,
      totalImageReferences: blogImages + galleryImages + eventCoverImages + eventGalleryImages
    };
  }, [posts, eventItems, images]);

  async function clearAllCmsImages() {
    const confirmed = window.confirm(
      "Remove all CMS image references from blog posts, events, and gallery items? This will blank cover images and event galleries."
    );
    if (!confirmed) return;

    const updatedPosts = posts.map((item) => ({ ...item, coverImage: "" }));
    const updatedEvents = eventItems.map((item) => ({ ...item, coverImage: "", gallery: [] }));
    const updatedGallery = images.map((item) => ({ ...item, image: "" }));

    await Promise.all([
      Promise.all(updatedPosts.map((item) => persist("blogPosts", "cms:blogPosts", item))),
      Promise.all(updatedEvents.map((item) => persist("events", "cms:events", item))),
      Promise.all(updatedGallery.map((item) => persist("galleryItems", "cms:galleryItems", item)))
    ]);

    setPosts(updatedPosts);
    setEventItems(updatedEvents);
    setImages(updatedGallery);
    setNotice(
      "All CMS image references have been removed. Blog posts, events, and gallery items now use blank image fields."
    );
  }

  async function loadContent() {
    if (isFirebaseConfigured) {
      const db = getClientDb();
      if (db) {
        const [postSnap, eventSnap, gallerySnap, commentSnap] = await Promise.all([
          db.collection("blogPosts").get(),
          db.collection("events").get(),
          db.collection("galleryItems").get(),
          db.collection("comments").get()
        ]);
        if (!postSnap.empty) setPosts(postSnap.docs.map((item) => item.data() as BlogPost));
        if (!eventSnap.empty) setEventItems(eventSnap.docs.map((item) => item.data() as EventItem));
        if (!gallerySnap.empty) setImages(gallerySnap.docs.map((item) => item.data() as GalleryItem));
        if (!commentSnap.empty) setCommentItems(commentSnap.docs.map((item) => item.data() as Comment));
        return;
      }
    }

    setPosts(readLocal("cms:blogPosts", blogPosts));
    setEventItems(readLocal("cms:events", events));
    setImages(readLocal("cms:galleryItems", galleryItems));
    setCommentItems([...seededComments, ...readLocal("comments:moderation", [])]);
  }

  function readLocal<T>(key: string, fallback: T): T {
    const saved = window.localStorage.getItem(key);
    return saved ? (JSON.parse(saved) as T) : fallback;
  }

  async function persist<T extends { id: string }>(collectionName: string, key: string, item: T) {
    if (isFirebaseConfigured) {
      const db = getClientDb();
      if (db) {
        await db.collection(collectionName).doc(item.id).set(item, { merge: true });
        return;
      }
    }
    const existing = readLocal<T[]>(key, []);
    const next = [item, ...existing.filter((entry) => entry.id !== item.id)];
    window.localStorage.setItem(key, JSON.stringify(next));
  }

  async function remove(collectionName: string, key: string, id: string) {
    if (isFirebaseConfigured) {
      const db = getClientDb();
      if (db) {
        await db.collection(collectionName).doc(id).delete();
        return;
      }
    }
    const existing = readLocal<Array<{ id: string }>>(key, []);
    window.localStorage.setItem(key, JSON.stringify(existing.filter((entry) => entry.id !== id)));
  }

  async function uploadImage(file: File, path: string) {
    if (isFirebaseConfigured) {
      const storage = getClientStorage();
      if (storage) {
        const storageRef = storage.ref(`${path}/${Date.now()}-${file.name}`);
        await storageRef.put(file);
        return storageRef.getDownloadURL();
      }
    }

    return new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.readAsDataURL(file);
    });
  }

  async function handleFile(file: File | undefined, path: string, setter: (url: string) => void) {
    if (!file) return;
    const url = await uploadImage(file, path);
    setter(url);
  }

  async function savePost(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const id = postDraft.id || `post-${Date.now()}`;
    const slug = postDraft.slug || makeSlug(postDraft.title);
    const next = {
      ...postDraft,
      id,
      slug,
      excerpt: postDraft.excerpt || excerptFromHtml(postDraft.content),
      coverImage: postDraft.coverImage
    };
    await persist("blogPosts", "cms:blogPosts", next);
    setPosts((items) => [next, ...items.filter((item) => item.id !== id)]);
    setPostDraft(emptyPost);
    setNotice("Blog post saved.");
  }

  async function saveEvent(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const id = eventDraft.id || `event-${Date.now()}`;
    const next = {
      ...eventDraft,
      id,
      slug: eventDraft.slug || makeSlug(eventDraft.title),
      coverImage: eventDraft.coverImage,
      gallery: eventDraft.gallery
    };
    await persist("events", "cms:events", next);
    setEventItems((items) => [next, ...items.filter((item) => item.id !== id)]);
    setEventDraft(emptyEvent);
    setNotice("Event saved.");
  }

  async function saveGallery(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const id = galleryDraft.id || `gallery-${Date.now()}`;
    const next = {
      ...galleryDraft,
      id,
      image: galleryDraft.image
    };
    await persist("galleryItems", "cms:galleryItems", next);
    setImages((items) => [next, ...items.filter((item) => item.id !== id)]);
    setGalleryDraft(emptyGallery);
    setNotice("Gallery item saved.");
  }

  async function deletePost(id: string) {
    await remove("blogPosts", "cms:blogPosts", id);
    setPosts((items) => items.filter((item) => item.id !== id));
  }

  async function deleteEvent(id: string) {
    await remove("events", "cms:events", id);
    setEventItems((items) => items.filter((item) => item.id !== id));
  }

  async function deleteGallery(id: string) {
    await remove("galleryItems", "cms:galleryItems", id);
    setImages((items) => items.filter((item) => item.id !== id));
  }

  function moderateComment(id: string, status?: "approved") {
    const next = status
      ? commentItems.map((item) => (item.id === id ? { ...item, status } : item))
      : commentItems.filter((item) => item.id !== id);
    setCommentItems(next);
    window.localStorage.setItem("comments:moderation", JSON.stringify(next.filter((item) => item.status === "pending")));
    setNotice(status ? "Comment approved." : "Comment deleted.");
  }

  const stats = useMemo(
    () => [
      { label: "Blog posts", value: posts.length },
      { label: "Events", value: eventItems.length },
      { label: "Gallery images", value: images.length },
      { label: "Pending comments", value: commentItems.filter((item) => item.status === "pending").length }
    ],
    [commentItems, eventItems, images, posts]
  );

  return (
    <div className="min-h-screen bg-surface px-4 pb-12 pt-28 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-col justify-between gap-4 rounded-[8px] bg-royal p-6 text-white shadow-institutional md:flex-row md:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.26em] text-white">Admin Dashboard</p>
            <h1 className="mt-2 font-heading text-4xl">Content management</h1>
            <p className="mt-2 text-sm text-white/65">
              {isFirebaseConfigured ? "Firebase connected." : "Demo mode using local browser storage."}
            </p>
          </div>
          <button
            type="button"
            onClick={onLogout}
            className="inline-flex min-h-11 w-fit items-center gap-2 rounded-full border border-white/14 px-4 text-sm font-bold text-white hover:bg-white/10"
          >
            <LogOut className="h-4 w-4" /> Logout
          </button>
        </div>

        <div className="mb-6 flex gap-2 overflow-x-auto rounded-full bg-white p-2 shadow-institutional">
          {tabs.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setTab(item.id)}
              className={`inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-sm font-bold transition ${
                tab === item.id ? "bg-royal text-white" : "text-navy hover:bg-surface"
              }`}
            >
              <item.icon className="h-4 w-4" /> {item.label}
            </button>
          ))}
        </div>

        {notice ? <p className="mb-5 rounded-[8px] bg-royal px-4 py-3 text-sm font-bold text-white">{notice}</p> : null}

        {tab === "overview" ? (
          <div className="grid gap-5 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-[8px] bg-white p-6 shadow-institutional">
                <p className="font-heading text-5xl text-navy">{stat.value}</p>
                <p className="mt-3 text-xs font-bold uppercase tracking-[0.18em] text-slateText">{stat.label}</p>
              </div>
            ))}
          </div>
        ) : null}

        {tab === "blog" ? (
          <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
            <form onSubmit={savePost} className="rounded-[8px] bg-white p-6 shadow-institutional">
              <FormTitle icon={PenLine} title="Blog editor" />
              <TextInput label="Title" value={postDraft.title} onChange={(value) => setPostDraft({ ...postDraft, title: value })} />
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <SelectInput label="Category" value={postDraft.category} options={categories} onChange={(value) => setPostDraft({ ...postDraft, category: value as Category })} />
                <TextInput label="Publish date" type="date" value={postDraft.publishedAt} onChange={(value) => setPostDraft({ ...postDraft, publishedAt: value })} />
              </div>
              <TextArea label="Excerpt" value={postDraft.excerpt} onChange={(value) => setPostDraft({ ...postDraft, excerpt: value })} />
              <UploadField onFile={(file) => handleFile(file, "blog", (url) => setPostDraft({ ...postDraft, coverImage: url }))} />
              {postDraft.coverImage ? <PreviewImage src={postDraft.coverImage} alt={postDraft.title || "Cover preview"} /> : null}
              <div className="mt-4">
                <p className="mb-2 text-sm font-bold text-navy">Content</p>
                <RichTextEditor value={postDraft.content} onChange={(value) => setPostDraft({ ...postDraft, content: value })} />
              </div>
              <SaveButton label="Save blog post" />
            </form>
            <ContentList
              items={posts}
              title="Published posts"
              onEdit={(item) => setPostDraft(item as BlogPost)}
              onDelete={(id) => deletePost(id)}
            />
          </div>
        ) : null}

        {tab === "events" ? (
          <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
            <form onSubmit={saveEvent} className="rounded-[8px] bg-white p-6 shadow-institutional">
              <FormTitle icon={CalendarPlus} title="Event editor" />
              <TextInput label="Title" value={eventDraft.title} onChange={(value) => setEventDraft({ ...eventDraft, title: value })} />
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <SelectInput label="Type" value={eventDraft.type} options={eventTypes} onChange={(value) => setEventDraft({ ...eventDraft, type: value as EventType })} />
                <TextInput label="Date" type="date" value={eventDraft.date} onChange={(value) => setEventDraft({ ...eventDraft, date: value })} />
              </div>
              <TextInput label="Location" value={eventDraft.location} onChange={(value) => setEventDraft({ ...eventDraft, location: value })} />
              <TextArea label="Description" value={eventDraft.description} onChange={(value) => setEventDraft({ ...eventDraft, description: value })} />
              <UploadField onFile={(file) => handleFile(file, "events", (url) => setEventDraft({ ...eventDraft, coverImage: url }))} />
              {eventDraft.coverImage ? <PreviewImage src={eventDraft.coverImage} alt={eventDraft.title || "Event preview"} /> : null}
              <SaveButton label="Save event" />
            </form>
            <ContentList
              items={eventItems}
              title="Events"
              onEdit={(item) => setEventDraft(item as EventItem)}
              onDelete={(id) => deleteEvent(id)}
            />
          </div>
        ) : null}

        {tab === "gallery" ? (
          <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
            <form onSubmit={saveGallery} className="rounded-[8px] bg-white p-6 shadow-institutional">
              <FormTitle icon={ImagePlus} title="Gallery upload" />
              <TextInput label="Title" value={galleryDraft.title} onChange={(value) => setGalleryDraft({ ...galleryDraft, title: value })} />
              <SelectInput label="Category" value={galleryDraft.category} options={galleryCategories} onChange={(value) => setGalleryDraft({ ...galleryDraft, category: value as GalleryItem["category"] })} />
              <TextArea label="Description" value={galleryDraft.description} onChange={(value) => setGalleryDraft({ ...galleryDraft, description: value })} />
              <UploadField onFile={(file) => handleFile(file, "gallery", (url) => setGalleryDraft({ ...galleryDraft, image: url }))} />
              {galleryDraft.image ? <PreviewImage src={galleryDraft.image} alt={galleryDraft.title || "Gallery preview"} /> : null}
              <SaveButton label="Save gallery image" />
            </form>
            <ContentList
              items={images}
              title="Gallery images"
              onEdit={(item) => setGalleryDraft(item as GalleryItem)}
              onDelete={(id) => deleteGallery(id)}
            />
          </div>
        ) : null}

        {tab === "images" ? (
          <div className="space-y-6">
            <div className="grid gap-5 md:grid-cols-4">
              <article className="rounded-[8px] bg-white p-6 shadow-institutional">
                <p className="font-heading text-5xl text-navy">{imageStats.totalImageReferences}</p>
                <p className="mt-3 text-xs font-bold uppercase tracking-[0.18em] text-slateText">Total image references</p>
              </article>
              <article className="rounded-[8px] bg-white p-6 shadow-institutional">
                <p className="font-heading text-5xl text-navy">{imageStats.blogImages}</p>
                <p className="mt-3 text-xs font-bold uppercase tracking-[0.18em] text-slateText">Blog cover images</p>
              </article>
              <article className="rounded-[8px] bg-white p-6 shadow-institutional">
                <p className="font-heading text-5xl text-navy">{imageStats.eventCoverImages}</p>
                <p className="mt-3 text-xs font-bold uppercase tracking-[0.18em] text-slateText">Event cover images</p>
              </article>
              <article className="rounded-[8px] bg-white p-6 shadow-institutional">
                <p className="font-heading text-5xl text-navy">{imageStats.galleryImages}</p>
                <p className="mt-3 text-xs font-bold uppercase tracking-[0.18em] text-slateText">Gallery images</p>
              </article>
            </div>
            <div className="rounded-[8px] bg-white p-6 shadow-institutional">
              <p className="mb-4 text-sm font-bold text-navy">Image cleanup</p>
              <p className="text-sm text-slateText">
                This section scans the CMS-managed content for all cover, gallery, and gallery item images. Use the button below to blank those image references and remove them from the website.
              </p>
              <button
                type="button"
                onClick={clearAllCmsImages}
                className="mt-5 inline-flex min-h-12 items-center gap-2 rounded-full bg-royal px-5 text-sm font-bold text-white transition hover:-translate-y-0.5"
              >
                <Trash2 className="h-4 w-4" /> Remove all CMS images
              </button>
            </div>
          </div>
        ) : null}

        {tab === "comments" ? (
          <div className="grid gap-4">
            {commentItems.map((comment) => (
              <article key={comment.id} className="rounded-[8px] bg-white p-5 shadow-institutional">
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                  <div>
                    <p className="font-bold text-navy">{comment.name}</p>
                    <p className="mt-1 text-sm text-slateText">{comment.message}</p>
                    <p className="mt-2 text-xs font-bold uppercase tracking-[0.18em] text-royal">
                      {comment.entityType} - {comment.status}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => moderateComment(comment.id, "approved")}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-royal text-white"
                      title="Approve comment"
                    >
                      <CheckCircle2 className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => moderateComment(comment.id)}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-royal text-white"
                      title="Delete comment"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

function FormTitle({ icon: Icon, title }: { icon: typeof PenLine; title: string }) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-surface text-royal">
        <Icon className="h-5 w-5" />
      </span>
      <h2 className="font-heading text-3xl text-navy">{title}</h2>
    </div>
  );
}

function TextInput({
  label,
  value,
  onChange,
  type = "text"
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}) {
  return (
    <label className="mt-4 grid gap-2 text-sm font-bold text-navy">
      {label}
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="min-h-12 rounded-[8px] border border-navy/10 px-4 font-normal outline-none focus:border-royal"
      />
    </label>
  );
}

function TextArea({
  label,
  value,
  onChange
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="mt-4 grid gap-2 text-sm font-bold text-navy">
      {label}
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        rows={4}
        className="rounded-[8px] border border-navy/10 px-4 py-3 font-normal outline-none focus:border-royal"
      />
    </label>
  );
}

function SelectInput({
  label,
  value,
  options,
  onChange
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="mt-4 grid gap-2 text-sm font-bold text-navy">
      {label}
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="min-h-12 rounded-[8px] border border-navy/10 px-4 font-normal outline-none focus:border-royal"
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}

function UploadField({ onFile }: { onFile: (file: File | undefined) => void }) {
  return (
    <label className="mt-4 flex min-h-28 cursor-pointer flex-col items-center justify-center gap-2 rounded-[8px] border border-dashed border-navy/20 bg-surface text-center text-sm font-bold text-navy">
      <Upload className="h-5 w-5 text-royal" />
      Upload image
      <input type="file" accept="image/*" onChange={(event) => onFile(event.target.files?.[0])} className="sr-only" />
    </label>
  );
}

function PreviewImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative mt-4 aspect-[16/9] overflow-hidden rounded-[8px]">
      <MaybeImage src={src} alt={alt} fill className="object-cover" unoptimized={src.startsWith("data:")} />
    </div>
  );
}

function SaveButton({ label }: { label: string }) {
  return (
    <button
      type="submit"
      className="mt-5 inline-flex min-h-12 items-center gap-2 rounded-full bg-royal px-5 text-sm font-bold text-white transition hover:-translate-y-0.5"
    >
      <Save className="h-4 w-4" /> {label}
    </button>
  );
}

function ContentList({
  items,
  title,
  onEdit,
  onDelete
}: {
  items: Array<{ id: string; title: string; coverImage?: string; image?: string; description?: string; excerpt?: string }>;
  title: string;
  onEdit: (item: unknown) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div className="rounded-[8px] bg-white p-6 shadow-institutional">
      <h2 className="font-heading text-3xl text-navy">{title}</h2>
      <div className="mt-5 grid gap-4">
        {items.map((item) => (
          <article key={item.id} className="rounded-[8px] border border-navy/10 p-4">
            <div className="flex gap-4">
              {item.coverImage || item.image ? (
                <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded-[8px]">
                  <MaybeImage
                    src={item.coverImage || item.image || ""}
                    alt={item.title}
                    fill
                    className="object-cover"
                    unoptimized={(item.coverImage || item.image || "").startsWith("data:")}
                  />
                </div>
              ) : null}
              <div className="min-w-0 flex-1">
                <h3 className="line-clamp-2 font-bold text-navy">{item.title}</h3>
                <p className="mt-1 line-clamp-2 text-sm text-slateText">{item.excerpt || item.description}</p>
                <div className="mt-3 flex gap-2">
                  <button type="button" onClick={() => onEdit(item)} className="rounded-full bg-surface px-3 py-2 text-xs font-bold text-navy">
                    Edit
                  </button>
                  <button type="button" onClick={() => onDelete(item.id)} className="rounded-full bg-royal px-3 py-2 text-xs font-bold text-white">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

"use client";

import { MessageCircle, Send } from "lucide-react";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { comments as seededComments } from "@/lib/content";
import type { Comment } from "@/lib/types";
import { formatDate } from "@/lib/utils";

export function Comments({
  entityId,
  entityType
}: {
  entityId: string;
  entityType: "blog" | "event";
}) {
  const storageKey = `comments:${entityType}:${entityId}`;
  const [items, setItems] = useState<Comment[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    const saved = window.localStorage.getItem(storageKey);
    const localItems = saved ? (JSON.parse(saved) as Comment[]) : [];
    setItems([
      ...seededComments.filter(
        (comment) =>
          comment.entityType === entityType &&
          comment.entityId === entityId &&
          comment.status === "approved"
      ),
      ...localItems.filter((comment) => comment.status === "approved")
    ]);
  }, [entityId, entityType, storageKey]);

  const approved = useMemo(() => items.filter((item) => item.status === "approved"), [items]);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!name.trim() || !message.trim()) return;
    const next: Comment = {
      id: `comment-${Date.now()}`,
      entityId,
      entityType,
      name,
      message,
      status: "pending",
      createdAt: new Date().toISOString()
    };
    const saved = window.localStorage.getItem(storageKey);
    const existing = saved ? (JSON.parse(saved) as Comment[]) : [];
    window.localStorage.setItem(storageKey, JSON.stringify([next, ...existing]));
    window.localStorage.setItem("comments:moderation", JSON.stringify([next, ...readModerationQueue()]));
    setName("");
    setMessage("");
    setNotice("Comment received. It will appear after approval.");
  }

  function readModerationQueue() {
    const saved = window.localStorage.getItem("comments:moderation");
    return saved ? (JSON.parse(saved) as Comment[]) : [];
  }

  return (
    <section className="mt-14 rounded-[8px] border border-navy/10 bg-white p-6 shadow-institutional">
      <div className="flex items-center gap-3">
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-surface text-royal">
          <MessageCircle className="h-5 w-5" />
        </span>
        <div>
          <h2 className="font-heading text-3xl text-navy">Comments</h2>
          <p className="text-sm text-slateText">Moderated reflection and discussion.</p>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        {approved.length ? (
          approved.map((comment) => (
            <article key={comment.id} className="rounded-[8px] bg-surface p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-bold text-navy">{comment.name}</p>
                <p className="text-xs uppercase tracking-[0.18em] text-slateText">
                  {formatDate(comment.createdAt)}
                </p>
              </div>
              <p className="mt-2 text-sm leading-6 text-slateText">{comment.message}</p>
            </article>
          ))
        ) : (
          <p className="rounded-[8px] bg-surface p-4 text-sm text-slateText">
            No approved comments yet. Begin the conversation with a thoughtful note.
          </p>
        )}
      </div>

      <form onSubmit={submit} className="mt-6 grid gap-3">
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Your name"
          className="min-h-12 rounded-[8px] border border-navy/10 px-4 outline-none focus:border-royal"
        />
        <textarea
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Write a thoughtful comment"
          rows={4}
          className="rounded-[8px] border border-navy/10 px-4 py-3 outline-none focus:border-royal"
        />
        <button
          type="submit"
          className="inline-flex min-h-12 w-fit items-center gap-2 rounded-full bg-royal px-5 text-sm font-bold text-white transition hover:-translate-y-0.5"
        >
          <Send className="h-4 w-4" /> Submit comment
        </button>
        {notice ? <p className="text-sm font-semibold text-royal">{notice}</p> : null}
      </form>
    </section>
  );
}

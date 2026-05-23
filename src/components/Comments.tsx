"use client";

import { MessageCircle, Send } from "lucide-react";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { getApprovedComments, submitComment } from "@/lib/comments-service";
import type { CommentData } from "@/lib/comments-service";
import { formatDate } from "@/lib/utils";

export function Comments({
  entityId,
  entityType
}: {
  entityId: string;
  entityType: "blog" | "event";
}) {
  const [items, setItems] = useState<CommentData[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [notice, setNotice] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Load approved comments from Firestore
  useEffect(() => {
    async function loadComments() {
      setIsLoading(true);
      const comments = await getApprovedComments(entityType, entityId);
      setItems(comments);
      setIsLoading(false);
    }

    loadComments();
  }, [entityId, entityType]);

  const approved = useMemo(() => items.filter((item) => item.status === "approved"), [items]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setNotice("");

    if (!name.trim() || !message.trim()) {
      setError("Name and message are required");
      return;
    }

    if (message.length < 5) {
      setError("Comment must be at least 5 characters");
      return;
    }

    if (message.length > 2000) {
      setError("Comment must be less than 2000 characters");
      return;
    }

    setIsSubmitting(true);

    const result = await submitComment(entityType, entityId, name, message);

    if (result.success) {
      setName("");
      setMessage("");
      setNotice("Comment submitted! It will appear after approval.");
    } else {
      setError(result.error || "Failed to submit comment");
    }

    setIsSubmitting(false);
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
        {isLoading ? (
          <p className="rounded-[8px] bg-surface p-4 text-sm text-slateText">Loading comments...</p>
        ) : approved.length ? (
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

      <form onSubmit={handleSubmit} className="mt-6 grid gap-3">
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Your name"
          className="min-h-12 rounded-[8px] border border-navy/10 px-4 outline-none focus:border-royal"
          disabled={isSubmitting}
        />
        <textarea
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Write a thoughtful comment"
          rows={4}
          className="rounded-[8px] border border-navy/10 px-4 py-3 outline-none focus:border-royal"
          disabled={isSubmitting}
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex min-h-12 w-fit items-center gap-2 rounded-full bg-royal px-5 text-sm font-bold text-white transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Send className="h-4 w-4" /> {isSubmitting ? "Submitting..." : "Submit comment"}
        </button>
        {error ? <p className="text-sm font-semibold text-red-600">{error}</p> : null}
        {notice ? <p className="text-sm font-semibold text-royal">{notice}</p> : null}
      </form>
    </section>
  );
}

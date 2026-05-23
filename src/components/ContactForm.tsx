"use client";

import { FormEvent, useState } from "react";
import { Mail, Send } from "lucide-react";

type Status = "idle" | "sending" | "sent" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setStatus("sending");

    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle validation errors
        if (data.errors && Array.isArray(data.errors)) {
          const errorMessages = data.errors.map((e: any) => `${e.field}: ${e.message}`).join(", ");
          setError(errorMessages);
        } else if (data.error) {
          setError(data.error);
        } else {
          setError("Failed to send request");
        }
        setStatus("error");
      } else {
        setStatus("sent");
        event.currentTarget.reset();
        setTimeout(() => setStatus("idle"), 3000);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Network error");
      setStatus("error");
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
      <div className="rounded-[8px] bg-royal p-7 text-white shadow-institutional">
        <Mail className="h-10 w-10 text-white" />
        <h2 className="mt-6 font-heading text-4xl">Professional inquiries</h2>
        <p className="mt-4 leading-8 text-white/72">
          Suitable for academic collaborations, consultation requests, PDC programs,
          leadership workshops, speaking invitations, and media inquiries.
        </p>
        <div className="mt-6 grid gap-3 text-sm text-white/70">
          <p>Email: hello@pdc.co.ke</p>
          <p>Affiliation: University of Nairobi Psychology Department</p>
          <p>Platform: PDC personal development and leadership</p>
        </div>
      </div>

      <form onSubmit={submit} className="rounded-[8px] bg-white p-6 text-navy shadow-institutional">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-2 text-sm font-bold">
            Name
            <input
              name="name"
              required
              disabled={status === "sending"}
              className="min-h-12 rounded-[8px] border border-navy/10 px-4 font-normal outline-none focus:border-royal disabled:bg-slate-100"
            />
          </label>
          <label className="grid gap-2 text-sm font-bold">
            Email
            <input
              name="email"
              type="email"
              required
              disabled={status === "sending"}
              className="min-h-12 rounded-[8px] border border-navy/10 px-4 font-normal outline-none focus:border-royal disabled:bg-slate-100"
            />
          </label>
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <label className="grid gap-2 text-sm font-bold">
            Inquiry type
            <select
              name="type"
              disabled={status === "sending"}
              className="min-h-12 rounded-[8px] border border-navy/10 px-4 font-normal outline-none focus:border-royal disabled:bg-slate-100"
            >
              <option>Consultation request</option>
              <option>Academic collaboration</option>
              <option>PDC program</option>
              <option>Speaking invitation</option>
              <option>Media inquiry</option>
            </select>
          </label>
          <label className="grid gap-2 text-sm font-bold">
            Phone
            <input
              name="phone"
              disabled={status === "sending"}
              className="min-h-12 rounded-[8px] border border-navy/10 px-4 font-normal outline-none focus:border-royal disabled:bg-slate-100"
            />
          </label>
        </div>
        <label className="mt-4 grid gap-2 text-sm font-bold">
          Message
          <textarea
            name="message"
            required
            rows={6}
            disabled={status === "sending"}
            className="rounded-[8px] border border-navy/10 px-4 py-3 font-normal outline-none focus:border-royal disabled:bg-slate-100"
          />
        </label>
        <button
          type="submit"
          disabled={status === "sending" || status === "sent"}
          className="mt-5 inline-flex min-h-12 items-center gap-2 rounded-full bg-royal px-5 text-sm font-bold text-white transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Send className="h-4 w-4" />{" "}
          {status === "sending" ? "Sending..." : status === "sent" ? "Sent!" : "Send request"}
        </button>
        {error ? <p className="mt-4 text-sm font-bold text-red-600">{error}</p> : null}
        {status === "sent" ? (
          <p className="mt-4 text-sm font-bold text-royal">Request received. Thank you.</p>
        ) : null}
      </form>
    </div>
  );
}

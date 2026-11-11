"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/alert";

/**
 * Contact form — UI only in Phase 1.
 * The server action / API route is wired up in Phase 3.
 */
export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Placeholder: server action is not yet connected (Phase 3)
    setStatus("loading");
    setTimeout(() => setStatus("idle"), 1500);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
      aria-label="Contact form"
      noValidate
    >
      <div className="space-y-1.5">
        <label htmlFor="contact-name" className="block text-sm font-medium">
          Name <span aria-hidden="true" className="text-destructive">*</span>
          <span className="sr-only">(required)</span>
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          required
          maxLength={100}
          disabled={status === "loading"}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          placeholder="Your name"
        />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="contact-email" className="block text-sm font-medium">
          Email <span aria-hidden="true" className="text-destructive">*</span>
          <span className="sr-only">(required)</span>
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          maxLength={254}
          disabled={status === "loading"}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          placeholder="you@example.com"
        />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="contact-message" className="block text-sm font-medium">
          Message <span aria-hidden="true" className="text-destructive">*</span>
          <span className="sr-only">(required)</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          maxLength={2000}
          rows={5}
          disabled={status === "loading"}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-y"
          placeholder="Write your message here…"
        />
      </div>

      {/* Status feedback */}
      {status === "success" && (
        <Alert className="border-green-600/20 bg-green-50 text-green-800 dark:bg-green-950/30 dark:text-green-400">
          Message sent! I&apos;ll get back to you soon.
        </Alert>
      )}
      {status === "error" && (
        <Alert className="border-destructive/20 bg-destructive/5 text-destructive">
          Something went wrong. Please try again or reach out directly by email.
        </Alert>
      )}

      <Button
        type="submit"
        className="w-full sm:w-auto"
        disabled={status === "loading"}
        aria-disabled={status === "loading"}
      >
        {status === "loading" ? "Sending…" : "Send Message"}
      </Button>

      <p className="text-xs text-muted-foreground">
        * Required fields. Email provider integration is coming soon.
      </p>
    </form>
  );
}

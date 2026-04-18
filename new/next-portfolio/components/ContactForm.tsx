"use client";

import { FormEvent, useState } from "react";
import { siteConfig } from "@/lib/site";

export function ContactForm() {
  const [status, setStatus] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const honeypot = String(formData.get("website") ?? "").trim();
    if (honeypot) {
      setStatus("Submission blocked.");
      return;
    }

    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();

    if (!name || !email || !message) {
      setStatus("Please complete all fields.");
      return;
    }

    const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);

    window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
    setStatus("Opening your email app...");
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <label>
        Name
        <input type="text" name="name" required placeholder="Your name" />
      </label>
      <label>
        Email
        <input type="email" name="email" required placeholder="you@example.com" />
      </label>
      <label>
        Message
        <textarea name="message" required placeholder="What are you building?" rows={5} />
      </label>

      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="honeypot"
        aria-hidden="true"
      />

      <button type="submit" className="accent-button">
        Send Message
      </button>
      {status ? <p className="form-status">{status}</p> : null}
    </form>
  );
}

"use client";

import { useActionState } from "react";
import { submitContactForm, type ContactFormState } from "@/app/actions";
import { Input, Textarea, Button, useToast } from "@/components/ui";
import { useEffect } from "react";

const initialState: ContactFormState = {};

export default function ContactForm() {
  const [state, formAction, isPending] = useActionState(
    submitContactForm,
    initialState
  );
  const { toast, showToast } = useToast();

  // Show toast on success / error
  useEffect(() => {
    if (state.success) showToast("Message sent successfully!", "success");
    if (state.error) showToast(state.error, "error");
  }, [state]);

  return (
    <>
      <form action={formAction} noValidate style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <Input
          label="Name"
          id="contact-name"
          name="name"
          required
          autoComplete="name"
          placeholder="Your name"
          error={state.fieldErrors?.name}
          disabled={isPending || state.success}
        />
        <Input
          label="Email"
          id="contact-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="your@email.com"
          error={state.fieldErrors?.email}
          disabled={isPending || state.success}
        />
        <Textarea
          label="Message"
          id="contact-message"
          name="message"
          required
          rows={5}
          placeholder="What would you like to discuss?"
          error={state.fieldErrors?.message}
          disabled={isPending || state.success}
        />

        {state.success ? (
          <p
            style={{
              fontFamily: "var(--font-eb-garamond), serif",
              fontSize: "15px",
              color: "var(--gold)",
              padding: "12px 0",
            }}
          >
            ✓ Your message has been sent. I&apos;ll get back to you soon.
          </p>
        ) : (
          <Button
            type="submit"
            id="contact-submit"
            isLoading={isPending}
            disabled={isPending}
          >
            {isPending ? "Sending..." : "Send Message"}
          </Button>
        )}
      </form>
      {toast}
    </>
  );
}

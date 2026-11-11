import type { Metadata } from "next";
import { MailIcon } from "lucide-react";
import { loadProfile } from "@/lib/content";
import { ContactForm } from "@/components/contact/ContactForm";
import { Separator } from "@/components/ui/separator";
import { GitHubIcon, LinkedInIcon } from "@/components/icons/BrandIcons";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Yazid Maulana Rizky for opportunities, collaborations, or just to say hello.",
};

export default function ContactPage() {
  const profile = loadProfile();

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6">
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Get in Touch
        </h1>
        <p className="mt-3 max-w-prose text-base text-muted-foreground">
          Whether you have an opportunity, a project idea, or just want to
          connect — I&apos;d love to hear from you.
        </p>
      </header>

      <div className="grid gap-12 lg:grid-cols-[1fr_2fr]">
        {/* Alternative contact channels */}
        <aside>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Other ways to reach me
          </h2>
          <ul className="space-y-4 list-none p-0" role="list">
            <li className="flex items-center gap-3">
              <MailIcon className="size-4 text-muted-foreground" aria-hidden="true" />
              <a
                href={`mailto:${profile.email}`}
                className="text-sm underline underline-offset-4 hover:text-foreground transition-colors"
              >
                {profile.email}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <GitHubIcon className="size-4 text-muted-foreground" />
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm underline underline-offset-4 hover:text-foreground transition-colors"
              >
                GitHub
              </a>
            </li>
            <li className="flex items-center gap-3">
              <LinkedInIcon className="size-4 text-muted-foreground" />
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm underline underline-offset-4 hover:text-foreground transition-colors"
              >
                LinkedIn
              </a>
            </li>
          </ul>

          <Separator className="my-6" />

          <p className="text-xs text-muted-foreground">
            I typically respond within 1–2 business days. You can also connect
            on LinkedIn for professional inquiries.
          </p>
        </aside>

        {/* Contact form */}
        <section aria-labelledby="form-heading">
          <h2 id="form-heading" className="mb-6 text-lg font-semibold">
            Send a message
          </h2>
          <ContactForm />
        </section>
      </div>
    </div>
  );
}

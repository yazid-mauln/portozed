import { LinkButton } from "@/components/ui/link-button";

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-24 text-center">
      <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
        404
      </p>
      <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
        Page not found
      </h1>
      <p className="mt-4 max-w-sm text-base text-muted-foreground">
        Sorry, I couldn&apos;t find the page you&apos;re looking for. It may
        have been moved or the URL might be wrong.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <LinkButton href="/">Go to Homepage</LinkButton>
        <LinkButton href="/projects" variant="outline">
          View Projects
        </LinkButton>
      </div>
    </div>
  );
}

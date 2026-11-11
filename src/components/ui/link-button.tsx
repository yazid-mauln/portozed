/**
 * LinkButton — renders a Next.js Link or anchor with Button styling.
 *
 * @base-ui/react's Button uses a `render` prop for polymorphism, not `asChild`.
 * This helper wraps that pattern so callers don't have to repeat it.
 */
import Link from "next/link";
import { Button, buttonVariants } from "./button";
import { cn } from "@/lib/utils";
import type { VariantProps } from "class-variance-authority";

type ButtonVariantProps = VariantProps<typeof buttonVariants>;

interface LinkButtonProps extends ButtonVariantProps {
  href: string;
  /** Use <a> with target=_blank for external links; Link for internal. */
  external?: boolean;
  className?: string;
  children: React.ReactNode;
  download?: string | boolean;
  "aria-label"?: string;
}

/**
 * Internal navigation link styled as a button.
 */
export function LinkButton({
  href,
  external = false,
  className,
  variant = "default",
  size = "default",
  children,
  download,
  "aria-label": ariaLabel,
}: LinkButtonProps) {
  const classes = cn(buttonVariants({ variant, size }), className);

  if (external || download) {
    return (
      <a
        href={href}
        className={classes}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        download={download}
        aria-label={ariaLabel}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} aria-label={ariaLabel}>
      {children}
    </Link>
  );
}

/**
 * Render-prop version for use within @base-ui Button.
 * For most cases, prefer LinkButton directly.
 */
export function ButtonAsLink({
  href,
  className,
  variant,
  size,
  children,
  ...props
}: LinkButtonProps & React.HTMLAttributes<HTMLElement>) {
  return (
    <Button
      className={className}
      variant={variant}
      size={size}
      render={<Link href={href} {...props} />}
    >
      {children}
    </Button>
  );
}

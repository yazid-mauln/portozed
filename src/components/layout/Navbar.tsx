"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuIcon, ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LinkButton } from "@/components/ui/link-button";
import { JakartaClock } from "@/components/ui/JakartaClock";

import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" },
] as const;

function isActive(href: string, currentPath: string): boolean {
  return href === "/"
    ? currentPath === "/"
    : currentPath.startsWith(href);
}

function NavLink({
  href,
  label,
  currentPath,
}: {
  href: string;
  label: string;
  currentPath: string;
}) {
  const active = isActive(href, currentPath);

  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "group relative block px-3 py-2 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5",
        active
          ? "text-foreground"
          : "text-muted-foreground hover:text-[#ff5a36]"
      )}
    >
      {label}

      <span
        className={cn(
          "absolute bottom-0 left-3 right-3 h-[2px] origin-left rounded-full bg-[#ff5a36] transition-transform duration-300",
          active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
        )}
      />
    </Link>
  );
}

function Logo() {
  return (
    <Link
      href="/"
      aria-label="zed home"
      className="group inline-flex items-center rounded-md py-1 outline-none focus-visible:ring-2 focus-visible:ring-ring ml-10 mb-2"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="160 230 680 540"
        className="h-7 w-auto fill-[#ff5a36] transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3"
        role="img"
        aria-hidden="true"
      >
        <polygon points="330,270 800,270 770,370 300,370" />
        <polygon points="577,386 747,386 423,614 253,614" />
        <polygon points="230,630 700,630 670,730 200,730" />
      </svg>
    </Link>
  );
}

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 w-full">
      <nav
        className="relative flex h-[72px] w-full items-center justify-between px-4 sm:px-6"
        aria-label="Main navigation"
      >
        {/* Left: Logo */}
        <div className="z-10 flex flex-1 items-center">
          <Logo />
        </div>

        {/* Center: Live Clock */}
        <div className="absolute left-1/2 -translate-x-1/2">
          <JakartaClock />
        </div>

        {/* Right: Desktop Navigation */}
        <div className="hidden flex-1 items-center justify-end gap-5 md:flex mr-5">
          <ul className="m-0 flex list-none items-center gap-2 p-0">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <NavLink
                  href={link.href}
                  label={link.label}
                  currentPath={pathname}
                />
              </li>
            ))}
          </ul>
        </div>

        {/* Right: Mobile Menu */}
        <div className="z-10 flex flex-1 justify-end md:hidden">
          <Sheet>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon-sm"
                  aria-label="Open navigation menu"
                >
                  <MenuIcon className="size-5" />
                </Button>
              }
            />

            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>Navigation</SheetTitle>
              </SheetHeader>

              <nav
                aria-label="Mobile navigation"
                className="flex flex-col gap-2 px-4 pt-4"
              >
                {NAV_LINKS.map((link) => (
                  <SheetClose
                    key={link.href}
                    render={
                      <NavLink
                        href={link.href}
                        label={link.label}
                        currentPath={pathname}
                      />
                    }
                  />
                ))}
              </nav>

              <div className="px-4 pt-6">
                <LinkButton
                  href="/contact"
                  className="w-full justify-center"
                >
                  Let's Talk
                  <ArrowUpRight className="ml-1 size-4" />
                </LinkButton>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}

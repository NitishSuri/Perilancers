import Link from "next/link";
import { Mail } from "lucide-react";
import { footer, nav, services, site } from "@/lib/content";
import { LinkedInIcon, WhatsAppIcon } from "./icons";
import { Logo } from "./Logo";
import { Container } from "./ui/Container";

const socials = [
  { label: "LinkedIn", href: site.linkedinUrl, icon: LinkedInIcon, external: true },
  { label: "WhatsApp", href: site.whatsappUrl, icon: WhatsAppIcon, external: true },
  { label: "Email", href: `mailto:${site.email}`, icon: Mail, external: false },
];

const heading = "text-xs font-semibold tracking-[0.18em] text-muted uppercase";
const link = "text-sm text-ink/75 transition-colors hover:text-orange-deep";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-paper-2 text-ink">
      <Container className="py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-sm text-muted">{footer.tagline}</p>
            <a
              href={`mailto:${site.email}`}
              className="mt-4 inline-block font-medium underline decoration-ink/25 underline-offset-4 hover:decoration-ink"
            >
              {site.email}
            </a>
          </div>

          <nav aria-label="Services">
            <h2 className={heading}>Services</h2>
            <ul className="mt-4 space-y-2.5">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className={link}>
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Footer">
            <h2 className={heading}>Explore</h2>
            <ul className="mt-4 space-y-2.5">
              {[...nav, { label: "Contact", href: "/#contact" }].map((item) => (
                <li key={item.href}>
                  <a href={item.href} className={link}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className={heading}>Connect</h2>
            <ul className="mt-4 flex gap-3">
              {socials.map(({ label, href, icon: Icon, external }) => (
                <li key={label}>
                  <a
                    href={href}
                    aria-label={external ? `${label} (opens in a new tab)` : label}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="flex size-10 items-center justify-center rounded-xl border border-line bg-surface text-ink/75 transition-colors hover:border-ink/30 hover:text-ink"
                  >
                    <Icon className="size-5" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-line pt-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Perilancers. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="transition-colors hover:text-ink">
              Privacy Policy
            </Link>
            <a href="/sitemap.xml" className="transition-colors hover:text-ink">
              Sitemap
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}

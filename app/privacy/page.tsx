import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { privacyLastUpdated, site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${site.name} collects, uses, and protects your information.`,
  alternates: { canonical: "/privacy" },
};

const sections: { title: string; body: React.ReactNode }[] = [
  {
    title: "Who we are",
    body: (
      <p>
        {site.name} (&ldquo;we&rdquo;, &ldquo;us&rdquo;) is a freelance tech studio. This policy explains what
        information we collect through {site.url.replace("https://", "")} and how we use it. If you have questions,
        email us at <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
    ),
  },
  {
    title: "Information we collect",
    body: (
      <>
        <p>We only collect information you choose to give us, plus basic technical data needed to run the site:</p>
        <ul>
          <li>
            <strong>Enquiries:</strong> your name, email address, and anything you include about your company and
            project when you email us.
          </li>
          <li>
            <strong>Direct messages:</strong> anything you send us by email or LinkedIn.
          </li>
          <li>
            <strong>Technical data:</strong> our hosting provider may process standard server logs (such as IP address,
            browser type, and pages requested) for security and performance.
          </li>
        </ul>
      </>
    ),
  },
  {
    title: "How we use your information",
    body: (
      <ul>
        <li>To reply to your enquiry and discuss a potential project.</li>
        <li>To prepare proposals and, if we work together, to deliver our services and send invoices.</li>
        <li>To keep the website secure and working properly.</li>
      </ul>
    ),
  },
  {
    title: "What we don't do",
    body: (
      <p>
        We don&apos;t sell your personal information, and we don&apos;t add you to marketing lists without your
        permission.
      </p>
    ),
  },
  {
    title: "Service providers",
    body: (
      <>
        <p>We use a small number of trusted providers to run this website:</p>
        <ul>
          <li>
            <strong>Vercel:</strong> website hosting.
          </li>
          <li>
            <strong>Google Analytics</strong> (if enabled): website usage statistics.
          </li>
        </ul>
        <p>These providers only process data as needed to provide their services to us.</p>
      </>
    ),
  },
  {
    title: "Cookies and analytics",
    body: (
      <>
        <p>
          We may use Google Analytics to understand how visitors use the site (for example, which pages are visited and
          how people found us). Google Analytics uses cookies and collects data such as approximate location, device,
          and browser. We do not use advertising cookies or sell this data.
        </p>
      </>
    ),
  },
  {
    title: "How long we keep data",
    body: (
      <p>
        We keep enquiry emails for as long as needed to respond and follow up, and project records for as long as
        required for business, legal, and accounting purposes. You can ask us to delete your information at any time.
      </p>
    ),
  },
  {
    title: "Your rights",
    body: (
      <p>
        Depending on where you live (for example, under the GDPR, UK GDPR, or CCPA), you may have the right to access,
        correct, delete, or restrict the use of your personal information. To make a request, email{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a> and we&apos;ll respond within 30 days.
      </p>
    ),
  },
  {
    title: "Changes to this policy",
    body: <p>We may update this policy from time to time. The date at the top shows when it last changed.</p>,
  },
];

export default function PrivacyPage() {
  return (
    <main id="main" tabIndex={-1} className="outline-none">
      <Container className="max-w-3xl py-20 sm:py-28">
        <p className="text-xs font-semibold tracking-[0.18em] text-forest uppercase">Legal</p>
        <h1 className="mt-3 text-5xl font-bold">Privacy Policy</h1>
        <p className="mt-4 text-muted">Last updated: {privacyLastUpdated}</p>

        <div className="mt-12 space-y-10 text-muted [&_a]:text-ink [&_a]:underline [&_a]:underline-offset-2 [&_a:hover]:text-forest [&_li]:mt-2 [&_p+p]:mt-3 [&_p+ul]:mt-3 [&_strong]:text-ink [&_ul]:list-disc [&_ul]:pl-5 [&_ul+p]:mt-3">
          {sections.map((s) => (
            <section key={s.title}>
              <h2 className="mb-3 text-xl font-bold text-ink">{s.title}</h2>
              {s.body}
            </section>
          ))}
        </div>
      </Container>
    </main>
  );
}

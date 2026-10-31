import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <main id="main" className="flex min-h-[70vh] items-center">
      <Container className="text-center">
        <p className="text-xs font-semibold tracking-[0.18em] text-orange-deep uppercase">Error 404</p>
        <h1 className="mt-4 text-5xl font-bold">Page not found</h1>
        <p className="mt-4 text-muted">The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
        <ButtonLink href="/" className="mt-8">
          Back to home
        </ButtonLink>
      </Container>
    </main>
  );
}

import { ImageResponse } from "next/og";
import { services, site } from "@/lib/content";
import { OgCard, ogSize } from "@/lib/og";

export const alt = `${site.name} services`;
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export default async function ServiceOgImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug) ?? services[0];
  return new ImageResponse(
    <OgCard eyebrow="Service" title={service.seoTitle} footer={service.description} />,
    size,
  );
}

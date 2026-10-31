import { ImageResponse } from "next/og";
import { hero, site } from "@/lib/content";
import { OgCard, ogSize } from "@/lib/og";

export const alt = `${site.name}: ${site.tagline}`;
export const size = ogSize;
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(<OgCard eyebrow="AI agents + full-stack studio" title={site.tagline} footer={hero.trustLine} />, size);
}

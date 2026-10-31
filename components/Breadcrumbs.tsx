import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function Breadcrumbs({ items }: { items: { name: string; path: string }[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted">
        {items.map((item, i) => (
          <li key={item.path} className="flex items-center gap-1.5">
            {i > 0 && <ChevronRight className="size-3.5" aria-hidden="true" />}
            {i === items.length - 1 ? (
              <span aria-current="page" className="text-ink">
                {item.name}
              </span>
            ) : (
              <Link href={item.path} className="underline-offset-2 hover:text-ink hover:underline">
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

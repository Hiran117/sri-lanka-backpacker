import Link from "next/link";

const BASE_URL = "https://sri-lanka-backpacker.vercel.app";

export default function Breadcrumbs({ items, className = "" }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.href ? `${BASE_URL}${item.href}` : undefined,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="Breadcrumb" className={`text-sm text-ink/50 ${className}`}>
        <ol className="flex flex-wrap items-center gap-1.5">
          {items.map((item, i) => {
            const last = i === items.length - 1;
            return (
              <li key={i} className="flex items-center gap-1.5">
                {item.href && !last ? (
                  <Link
                    href={item.href}
                    className="hover:text-jungle transition-colors"
                  >
                    {item.name}
                  </Link>
                ) : (
                  <span className={last ? "text-ink/70 font-medium" : ""}>
                    {item.name}
                  </span>
                )}
                {!last && <span className="text-ink/30">/</span>}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}

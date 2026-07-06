const items = [
  {
    label: "FREE UK DELIVERY",
    subtext: "On orders over £15",
    icon: "M3 7h11v8H3zM14 10h4l3 3v2h-7zM6.5 19a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM17.5 19a1.5 1.5 0 100-3 1.5 1.5 0 000 3z",
    tint: "text-brown",
  },
  {
    label: "QUALITY GUARANTEED",
    subtext: "100% authentic products",
    icon: "M9 12l2 2 4-4M12 22a10 10 0 100-20 10 10 0 000 20z",
    tint: "text-deep-green",
  },
  {
    label: "SECURE CHECKOUT",
    subtext: "Safe & trusted payments",
    icon: "M12 2l7 4v5c0 5-3.5 8-7 9-3.5-1-7-4-7-9V6z",
    tint: "text-brown",
  },
];

export default function TrustBadgeBand() {
  return (
    <section className="bg-ivory">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 py-8 sm:grid-cols-3 md:px-6">
        {items.map((item) => (
          <div key={item.label} className="flex items-center justify-center gap-3 text-center sm:justify-start sm:text-left">
            <svg
              viewBox="0 0 24 24"
              className={`h-8 w-8 shrink-0 ${item.tint}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d={item.icon} />
            </svg>
            <div className="flex flex-col">
              <span className="text-sm font-bold tracking-wide text-ink">{item.label}</span>
              <span className="text-xs text-brown/80">{item.subtext}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

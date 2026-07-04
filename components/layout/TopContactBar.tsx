import { site } from "@/lib/site";

export default function TopContactBar() {
  return (
    <div className="hidden bg-deep-green text-cream md:block">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-2 md:px-6">
        <div className="flex items-center gap-5 text-xs">
          <a
            href={site.phoneLink}
            className="flex items-center gap-1.5 rounded hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-deep-green"
          >
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M4 4h4l2 5-2.5 1.5a11 11 0 005 5L14 13l5 2v4a2 2 0 01-2 2A16 16 0 014 6a2 2 0 012-2z" />
            </svg>
            {site.phoneNumber}
          </a>
          <a
            href={site.whatsappLink}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 rounded hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-deep-green"
          >
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 shrink-0" fill="currentColor" aria-hidden="true">
              <path d="M12 2a10 10 0 00-8.6 15.1L2 22l5.1-1.3A10 10 0 1012 2zm0 18.2a8.1 8.1 0 01-4.2-1.1l-.3-.2-3.1.8.8-3-.2-.3A8.2 8.2 0 1112 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1s-.7.8-.9 1c-.2.2-.3.2-.5.1a6.6 6.6 0 01-2-1.2 7.4 7.4 0 01-1.4-1.7c-.1-.2 0-.4.1-.5l.4-.4c.1-.2.2-.3.3-.5a.5.5 0 000-.5c-.1-.1-.6-1.5-.9-2-.2-.5-.4-.4-.6-.4h-.5a1 1 0 00-.7.3 3 3 0 00-.9 2.2c0 1.3.9 2.6 1.1 2.8.1.2 2 3 4.7 4.2.7.3 1.2.5 1.6.6a3.9 3.9 0 001.8.1c.5-.1 1.5-.6 1.8-1.2.2-.6.2-1.1.1-1.2-.1-.1-.3-.2-.5-.3z" />
            </svg>
            {site.whatsappNumber}
          </a>
          <a
            href={`mailto:${site.contactEmail}`}
            className="flex items-center gap-1.5 rounded hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-deep-green"
          >
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="M3 7l9 6 9-6" />
            </svg>
            {site.contactEmail}
          </a>
        </div>
        <div className="flex items-center gap-1.5 text-xs">
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M3 7h11v8H3zM14 10h4l3 3v2h-7z" />
            <circle cx="6.5" cy="19" r="1.5" fill="currentColor" stroke="none" />
            <circle cx="17.5" cy="19" r="1.5" fill="currentColor" stroke="none" />
          </svg>
          <span>Free UK delivery on orders over £15</span>
        </div>
      </div>
    </div>
  );
}

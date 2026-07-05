interface JsonLdProps {
  data: Record<string, unknown>;
}

export default function JsonLd({ data }: JsonLdProps) {
  // JSON.stringify doesn't escape "</script>", so a string field containing
  // it could break out of this tag. All current callers pass static data,
  // but this is cheap insurance against that ever changing.
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}

const STEP_ATTR = "data-fallback-step";

const STOPWORDS = new Set([
  "the",
  "a",
  "an",
  "and",
  "or",
  "for",
  "with",
  "from",
  "into",
  "that",
  "this",
  "our",
  "your",
  "their",
  "its",
  "photo",
  "image",
  "picture",
  "view",
  "shot",
  "close",
  "up",
  "at",
  "in",
  "on",
  "by",
  "to",
  "of",
]);

function keywordsFrom(alt: string | null): string {
  return (alt || "")
    .toLowerCase()
    .replace(/[^a-z0-9\s]+/g, " ")
    .split(/\s+/)
    .filter((word) => word.length > 2 && !STOPWORDS.has(word))
    .slice(0, 3)
    .join(",");
}

function sizeOf(img: HTMLImageElement): [number, number] {
  const width =
    parseInt(img.getAttribute("width") ?? "", 10) || img.clientWidth || 800;
  const height =
    parseInt(img.getAttribute("height") ?? "", 10) || img.clientHeight || 600;
  return [
    Math.min(Math.round(width), 2000),
    Math.min(Math.round(height), 2000),
  ];
}

function candidatesFor(img: HTMLImageElement): string[] {
  const chain: string[] = [];

  const backup = img.getAttribute("data-fallback-src");
  if (backup) chain.push(backup);

  const [width, height] = sizeOf(img);
  const words = keywordsFrom(img.getAttribute("alt"));
  if (words) {
    chain.push(
      `https://loremflickr.com/${width}/${height}/${encodeURIComponent(words)}`,
    );
  }
  chain.push(
    `https://picsum.photos/seed/${encodeURIComponent(words || "image")}/${width}/${height}`,
  );

  return chain;
}

function handleImageError(event: Event): void {
  const img = event.target as HTMLImageElement | null;
  if (!img || img.tagName !== "IMG") return;

  const chain = candidatesFor(img);
  const current = img.getAttribute("src");
  let step = Number(img.getAttribute(STEP_ATTR)) || 0;

  while (step < chain.length && chain[step] === current) step += 1;
  if (step >= chain.length) return;

  img.setAttribute(STEP_ATTR, String(step + 1));
  img.src = chain[step];
}

// Image error events do not bubble, so the listener must run in the capture phase.
if (typeof document !== "undefined") {
  document.addEventListener("error", handleImageError, true);
}
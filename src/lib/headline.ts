// Browsers treat the hyphen in "GPT-6" as a valid line-break opportunity, so a
// narrow listing card can end a line with "GPT-" and start the next with
// "6 Astra". Keep short alphanumeric hyphen compounds together while leaving
// long compounds breakable. Titles are escaped first so the returned markup is
// safe to pass to `set:html`; metadata, RSS and sitemap keep the raw string.
//
// The lookarounds make the whole compound match: without them the engine can
// start inside a long name such as "Qwen3.8-Flash-Next" and wrap only
// "8-Flash-Next", leaving "Qwen3." free to break.
const NO_BREAK_TOKEN =
  /(?<![\w.-])[A-Za-z0-9]+(?:[.-][A-Za-z0-9]+)*-[A-Za-z0-9]+(?:[.-][A-Za-z0-9]+)*(?![\w.-])/g;
const MAX_NO_BREAK_LENGTH = 20;
// Compounds at or above this length can be wider than the 320 px article
// column at the mobile H1 size (AIN-1020). They still get a no-break span so
// desktop keeps them whole, but carry a modifier class that a <=600 px media
// query switches back to normal wrapping so they break at their hyphens.
const LONG_NO_BREAK_MIN_LENGTH = 15;

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function formatHeadline(value: string): string {
  return escapeHtml(value).replace(NO_BREAK_TOKEN, (token) => {
    if (token.length > MAX_NO_BREAK_LENGTH) return token;
    const modifier = token.length >= LONG_NO_BREAK_MIN_LENGTH ? ' no-break-long' : '';
    return `<span class="no-break${modifier}">${token}</span>`;
  });
}

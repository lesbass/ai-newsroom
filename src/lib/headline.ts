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

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function formatHeadline(value: string): string {
  return escapeHtml(value).replace(NO_BREAK_TOKEN, (token) =>
    token.length <= MAX_NO_BREAK_LENGTH
      ? `<span class="no-break">${token}</span>`
      : token,
  );
}

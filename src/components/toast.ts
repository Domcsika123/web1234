let wrap: HTMLDivElement | null = null;

export function initToast() {
  if (wrap) return;
  wrap = document.createElement("div");
  wrap.className = "toast-wrap";
  document.body.appendChild(wrap);
}

export function toast(title: string, body?: string) {
  if (!wrap) initToast();

  const el = document.createElement("div");
  el.className = "toast";
  el.innerHTML = `
    <div class="t-title">${escapeHtml(title)}</div>
    ${body ? `<div class="t-body">${escapeHtml(body)}</div>` : ""}
  `;
  wrap!.appendChild(el);

  window.setTimeout(() => el.remove(), 4200);
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[c] as string));
}

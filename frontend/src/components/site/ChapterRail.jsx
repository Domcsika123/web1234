// Editor-gutter style chapter index on wide screens: shows where you are in
// the seven chapters and jumps to any of them. Hidden while the hero is in view.
export function ChapterRail({ chapters, active, label }) {
  const visible = chapters.some((c) => c.id === active);
  return (
    <nav aria-label={label} className="chapter-rail" data-visible={visible}>
      <ol className="flex flex-col gap-2">
        {chapters.map((c) => {
          const on = c.id === active;
          return (
            <li key={c.id}>
              <a href={`#${c.id}`} className="rail-link" data-active={on} aria-current={on ? 'true' : undefined}>
                <span className="rail-index" aria-hidden="true">{c.index}</span>
                <span className="rail-tick" aria-hidden="true" />
                <span className="rail-label">{c.label}</span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

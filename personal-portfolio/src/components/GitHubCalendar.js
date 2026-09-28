import { useState, useEffect, useMemo } from 'react';

const MONTH_LABELS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const DAY_LABELS   = ['', 'Mon', '', 'Wed', '', 'Fri', ''];
const API_URL = 'https://github-contributions-api.jogruber.de/v4';

export default function GitHubCalendar({ username = 'Vedantpoman12' }) {
  const [data, setData]     = useState(null);
  const [error, setError]   = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setError(false);
    fetch(`${API_URL}/${username}?y=last`)
      .then(r => { if (!r.ok) throw new Error(); return r.json(); })
      .then(json => { setData(json); setLoading(false); })
      .catch(() => { setError(true); setLoading(false); });
  }, [username]);

  const { weeks, monthPositions, total } = useMemo(() => {
    if (!data) return { weeks: [], monthPositions: [], total: 0 };

    const days = data.contributions; // [{ date, count, level }]
    const firstDate = new Date(days[0].date);
    const firstDow  = firstDate.getDay(); // 0=Sun

    // Pad so first day lands on its week column
    const padded = [...Array(firstDow).fill(null), ...days];
    const wks = [];
    for (let i = 0; i < padded.length; i += 7) wks.push(padded.slice(i, i + 7));

    const seen = new Set();
    const mpos = [];
    wks.forEach((week, wi) => {
      const first = week.find(d => d !== null);
      if (first) {
        const m = new Date(first.date).getMonth();
        if (!seen.has(m)) { seen.add(m); mpos.push({ label: MONTH_LABELS[m], col: wi }); }
      }
    });

    return {
      weeks: wks,
      monthPositions: mpos,
      total: data.total?.lastYear ?? days.reduce((s, d) => s + d.count, 0),
    };
  }, [data]);

  /* ── Loading skeleton ── */
  if (loading) {
    return (
      <section className="gh-calendar-section">
        <div className="gh-calendar-inner">
          <div className="gh-calendar-header">
            <span className="gh-calendar-title">
              <span className="gh-calendar-dot">◎</span> CONTRIBUTION GRAPH
            </span>
            <a href={`https://github.com/${username}`} target="_blank" rel="noreferrer"
               className="gh-calendar-link">@{username} ↗</a>
          </div>
          <div className="gh-skeleton-bar" />
          <div className="gh-skeleton-grid">
            {Array.from({ length: 53 * 7 }).map((_, i) => (
              <div key={i} className="gh-skeleton-cell" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="gh-calendar-section">
        <div className="gh-calendar-inner">
          <div className="gh-calendar-header">
            <span className="gh-calendar-title">
              <span className="gh-calendar-dot">◎</span> CONTRIBUTION GRAPH
            </span>
            <a href={`https://github.com/${username}`} target="_blank" rel="noreferrer"
               className="gh-calendar-link">@{username} ↗</a>
          </div>
          <p className="gh-error">Could not load contributions — <a href={`https://github.com/${username}`}
             target="_blank" rel="noreferrer" className="gh-calendar-link">view on GitHub ↗</a></p>
        </div>
      </section>
    );
  }

  return (
    <section className="gh-calendar-section">
      <div className="gh-calendar-inner">
        {/* Header */}
        <div className="gh-calendar-header">
          <span className="gh-calendar-title">
            <span className="gh-calendar-dot">◎</span> CONTRIBUTION GRAPH
          </span>
          <a href={`https://github.com/${username}`} target="_blank" rel="noreferrer"
             className="gh-calendar-link">@{username} ↗</a>
        </div>

        <div className="gh-calendar-subheader">
          <span className="gh-total">{total.toLocaleString()} contributions in the last year</span>
        </div>

        {/* Grid */}
        <div className="gh-grid-wrapper">
          {/* Day-of-week labels */}
          <div className="gh-day-labels">
            {DAY_LABELS.map((l, i) => (
              <span key={i} className="gh-day-label">{l}</span>
            ))}
          </div>

          <div className="gh-grid-scroll">
            {/* Month labels */}
            <div className="gh-month-row"
                 style={{ gridTemplateColumns: `repeat(${weeks.length}, 13px)` }}>
              {weeks.map((_, wi) => {
                const pos = monthPositions.find(p => p.col === wi);
                return <span key={wi} className="gh-month-label">{pos ? pos.label : ''}</span>;
              })}
            </div>

            {/* Cells */}
            <div className="gh-grid"
                 style={{ gridTemplateColumns: `repeat(${weeks.length}, 13px)` }}>
              {weeks.map((week, wi) =>
                week.map((day, di) => {
                  if (!day) return <div key={`${wi}-${di}`} className="gh-cell gh-cell-empty" />;
                  const label = `${day.date}: ${day.count} contribution${day.count !== 1 ? 's' : ''}`;
                  return (
                    <div
                      key={`${wi}-${di}`}
                      className={`gh-cell gh-cell-l${day.level}`}
                      title={label}
                      aria-label={label}
                    />
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="gh-legend">
          <span className="gh-legend-label">Less</span>
          {[0, 1, 2, 3, 4].map(l => (
            <div key={l} className={`gh-legend-cell gh-cell-l${l}`} />
          ))}
          <span className="gh-legend-label">More</span>
        </div>
      </div>
    </section>
  );
}

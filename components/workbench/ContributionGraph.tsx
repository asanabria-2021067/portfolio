"use client";

import { useEffect, useState } from "react";
import type { ContributionDay, ContributionsPayload } from "@/lib/contributions";

const cache = new Map<string, Promise<ContributionsPayload>>();

function fetchContributions(year?: number) {
  const key = String(year ?? "current");
  if (!cache.has(key)) {
    const url = year ? `/api/github/contributions?year=${year}` : "/api/github/contributions";
    cache.set(
      key,
      fetch(url)
        .then((response) => response.json() as Promise<ContributionsPayload>)
        .catch(() => ({ status: "error", message: "Network error" }) as ContributionsPayload)
    );
  }
  return cache.get(key)!;
}

export function useContributions(year?: number) {
  const [state, setState] = useState<{ key: string; data: ContributionsPayload | null }>({ key: "", data: null });
  const key = String(year ?? "current");

  useEffect(() => {
    let alive = true;
    fetchContributions(year).then((data) => alive && setState({ key, data }));
    return () => {
      alive = false;
    };
  }, [year, key]);

  return state.key === key ? state.data : null;
}

const MONTHS_EN = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const MONTHS_ES = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

export function formatDay(date: string, locale: "en" | "es") {
  const [y, m, d] = date.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString(locale === "en" ? "en-US" : "es-GT", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

export default function ContributionGraph({
  weeks,
  locale,
  cell = 11,
  gap = 3,
  showLabels = true,
}: {
  weeks: ContributionDay[][];
  locale: "en" | "es";
  cell?: number;
  gap?: number;
  showLabels?: boolean;
}) {
  const [hover, setHover] = useState<ContributionDay | null>(null);
  const months = locale === "en" ? MONTHS_EN : MONTHS_ES;
  const step = cell + gap;
  const labelWidth = showLabels ? 26 : 0;
  const top = showLabels ? 16 : 0;
  const width = labelWidth + weeks.length * step;
  const height = top + 7 * step;

  const monthLabels: { x: number; label: string }[] = [];
  weeks.forEach((week, index) => {
    if (!week[0]) return;
    const month = Number(week[0].date.slice(5, 7)) - 1;
    const previous = index > 0 ? Number(weeks[index - 1][0]?.date.slice(5, 7)) - 1 : -1;
    if (month !== previous && index < weeks.length - 1) monthLabels.push({ x: labelWidth + index * step, label: months[month] });
  });

  const dayLabels = locale === "en" ? ["Mon", "Wed", "Fri"] : ["Lun", "Mié", "Vie"];

  return (
    <div className="cg">
      <div className="cg-scroll">
        <svg width={width} height={height} role="img" aria-label="Contribution graph" className="cg-svg">
          {showLabels &&
            monthLabels.map((month) => (
              <text key={`${month.x}`} x={month.x} y={10} className="cg-label">
                {month.label}
              </text>
            ))}
          {showLabels &&
            [1, 3, 5].map((row, i) => (
              <text key={row} x={0} y={top + row * step + cell - 2} className="cg-label">
                {dayLabels[i]}
              </text>
            ))}
          {weeks.map((week, x) =>
            week.map((day) => {
              const y = new Date(`${day.date}T00:00:00Z`).getUTCDay();
              return (
                <rect
                  key={day.date}
                  x={labelWidth + x * step}
                  y={top + y * step}
                  width={cell}
                  height={cell}
                  rx={2}
                  className={`cg-cell cg-l${day.level}`}
                  onMouseEnter={() => setHover(day)}
                  onMouseLeave={() => setHover(null)}
                >
                  <title>{`${day.count} ${locale === "en" ? "contributions" : "contribuciones"} · ${formatDay(day.date, locale)}`}</title>
                </rect>
              );
            })
          )}
        </svg>
      </div>
      <div className="cg-footer">
        <span className="cg-hover">
          {hover
            ? `${hover.count} ${locale === "en" ? "contributions on" : "contribuciones el"} ${formatDay(hover.date, locale)}`
            : " "}
        </span>
        <span className="cg-legend">
          {locale === "en" ? "Less" : "Menos"}
          {[0, 1, 2, 3, 4].map((level) => (
            <i key={level} className={`cg-cell cg-l${level}`} />
          ))}
          {locale === "en" ? "More" : "Más"}
        </span>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useId, useMemo, useState } from "react";
import { Globe2, X } from "lucide-react";
import { summarizeRegions } from "@/lib/regions";

export function RegionSummary({
  regions,
  title = "支持地区",
  visibleCount = 5,
  className = "",
}: {
  regions: string[];
  title?: string;
  visibleCount?: number;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const titleId = useId();
  const summary = useMemo(() => summarizeRegions(regions, visibleCount), [regions, visibleCount]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  if (summary.all.length === 0) {
    return <span className="text-slate-500">以官方页面为准</span>;
  }

  return (
    <>
      <div className={`flex flex-wrap items-center gap-2 ${className}`}>
        {summary.visible.map((region) => (
          <span key={region.key} className="region-chip">
            {region.flag ? <span aria-hidden="true">{region.flag}</span> : null}
            <span>{region.label}</span>
          </span>
        ))}
        {summary.hasMore ? (
          <button type="button" onClick={() => setOpen(true)} className="region-more-button">
            显示全部 {summary.all.length} 个
          </button>
        ) : null}
      </div>

      {open ? (
        <div className="fixed inset-0 z-[80] flex items-end justify-center p-0 sm:items-center sm:p-5">
          <button
            type="button"
            aria-label="关闭地区列表"
            className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="region-dialog-panel relative max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-t-3xl shadow-2xl shadow-slate-950/45 sm:rounded-3xl"
          >
            <div className="region-dialog-header sticky top-0 z-10 flex items-start justify-between gap-4 px-5 py-5 sm:px-7">
              <div>
                <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-blue-500">
                  <Globe2 className="h-4 w-4" />
                  Region Coverage
                </p>
                <h2 id={titleId} className="mt-2 text-xl font-semibold sm:text-2xl">
                  {title}
                </h2>
                <p className="mt-2 text-sm leading-6 opacity-70">
                  以下地区来自公开资料整理；实际可申请资格仍需以官方页面和账户内显示为准。
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="关闭"
                className="region-close-button"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="max-h-[64vh] overflow-y-auto px-5 py-5 sm:px-7 sm:py-6">
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {summary.all.map((region) => (
                  <div key={region.key} className="region-country-card">
                    <span className="text-xl" aria-hidden="true">
                      {region.flag ?? "🌐"}
                    </span>
                    <span className="min-w-0 truncate text-sm font-semibold">{region.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      ) : null}
    </>
  );
}

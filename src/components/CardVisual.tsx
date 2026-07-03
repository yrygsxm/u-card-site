import type { CryptoCard } from "@/lib/cards";
import type { CSSProperties } from "react";
import Image from "next/image";
import { BrandMark } from "@/components/BrandMark";

export function CardVisual({
  card,
  compact = false,
  interactive = true,
  frameless = false,
}: {
  card: Pick<CryptoCard, "cardName" | "shortName" | "brandLogo" | "brandColor" | "cardNetwork" | "officialWebsite" | "coverImage" | "coverImagePosition">;
  compact?: boolean;
  interactive?: boolean;
  frameless?: boolean;
}) {
  const hasCoverImage = Boolean(card.coverImage);
  const transparentImageSurface = hasCoverImage || frameless;
  const coverImagePosition = card.coverImagePosition ?? "center";
  const coverImageMaskStyle =
    card.coverImage && transparentImageSurface
      ? ({
          WebkitMaskImage: `url(${card.coverImage})`,
          maskImage: `url(${card.coverImage})`,
          WebkitMaskPosition: coverImagePosition,
          maskPosition: coverImagePosition,
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskSize: "contain",
          maskSize: "contain",
        } satisfies CSSProperties)
      : undefined;

  return (
    <div
      role="img"
      className={`group relative isolate aspect-[1.58/1] w-full transition-[transform,box-shadow] duration-150 ease-out ${
        transparentImageSurface ? "overflow-visible rounded-none border-0 bg-transparent shadow-none" : "overflow-hidden rounded-2xl border border-white/20 bg-slate-900 shadow-lg shadow-slate-950/20"
      } ${
        interactive
          ? transparentImageSurface
            ? "hover:-translate-y-0.5 hover:scale-[1.015] hover:rotate-[0.6deg] motion-reduce:transform-none"
            : "hover:scale-[1.015] hover:rotate-[0.6deg] hover:shadow-2xl hover:shadow-slate-950/35 motion-reduce:transform-none"
          : ""
      } ${
        compact ? "min-w-0" : "min-w-44"
      }`}
      style={transparentImageSurface ? undefined : {
        background: `linear-gradient(135deg, ${card.brandColor} 0%, #162033 62%, #0b1020 100%)`,
      }}
      aria-label={`${card.cardName} card visual`}
    >
      {card.coverImage ? (
        <>
          <Image
            src={card.coverImage}
            alt=""
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
            className={`object-contain transition-transform duration-500 ease-out ${
              interactive ? "group-hover:-translate-y-1 group-hover:scale-[1.025] motion-reduce:transform-none" : ""
            }`}
            style={{ objectPosition: coverImagePosition }}
          />
          {transparentImageSurface ? (
            <div
              className={`pointer-events-none absolute inset-0 overflow-hidden motion-reduce:hidden ${interactive ? "" : "hidden"}`}
              style={coverImageMaskStyle}
              aria-hidden="true"
            >
              <div className="absolute inset-y-0 -left-[70%] w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-[380%]" />
            </div>
          ) : (
            <div className="pointer-events-none absolute inset-y-0 -left-[70%] w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-[380%] motion-reduce:hidden" />
          )}
        </>
      ) : (
        <>
          <div className={`absolute -right-12 -top-16 h-40 w-40 rounded-full bg-white/25 blur-3xl transition duration-700 ${interactive ? "group-hover:scale-125 group-hover:opacity-80" : ""}`} />
          <div className={`absolute -bottom-16 -left-10 h-44 w-44 rounded-full border border-white/15 transition duration-700 ${interactive ? "group-hover:translate-x-8 group-hover:-translate-y-4" : ""}`} />
          <div className={`pointer-events-none absolute inset-y-0 -left-[70%] w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/35 to-transparent transition-transform duration-700 motion-reduce:hidden ${interactive ? "group-hover:translate-x-[380%]" : ""}`} />
          <div className="relative flex h-full flex-col justify-between p-4 text-white sm:p-5">
            <div className="flex items-start justify-between gap-4">
              <BrandMark cardName={card.cardName} brandLogo={card.brandLogo} officialWebsite={card.officialWebsite} />
              <span className="text-sm font-semibold uppercase tracking-[0.08em] text-white/90">{card.cardNetwork[0]}</span>
            </div>
            <div className={`flex items-end justify-between gap-4 transition duration-500 ${interactive ? "group-hover:-translate-y-1" : ""}`}>
              <div>
                <div className="mb-3 h-7 w-11 rounded-md border border-white/30 bg-gradient-to-br from-amber-100 to-amber-400 shadow-inner shadow-amber-950/30" />
                <div className="text-base font-semibold tracking-tight text-white sm:text-lg">{card.shortName}</div>
                <div className="mt-1 font-mono text-[10px] tracking-[0.16em] text-white/70 sm:text-xs">•••• 2048</div>
              </div>
              <div className="text-right">
                <div className="text-[10px] font-medium uppercase tracking-[0.12em] text-white/60">Crypto card</div>
                <div className="mt-1 h-1.5 w-12 rounded-full bg-emerald-300 shadow-[0_0_16px_rgba(110,231,183,0.9)]" />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

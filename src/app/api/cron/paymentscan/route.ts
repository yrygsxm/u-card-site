import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { paymentscanTrackedCardSlugs, refreshPaymentscanMetrics } from "@/lib/paymentscan";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: Request) {
  if (!isAuthorizedCronRequest(request)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const startedAt = new Date().toISOString();

  const refreshResult = await refreshPaymentscanMetrics();

  for (const cardSlug of paymentscanTrackedCardSlugs) {
    revalidatePath(`/cards/${cardSlug}`);
  }

  revalidatePath("/");
  revalidatePath("/cards");

  return NextResponse.json(
    {
      ok: true,
      startedAt,
      ...refreshResult,
    },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
}

function isAuthorizedCronRequest(request: Request) {
  const cronSecret = process.env.CRON_SECRET;
  const authorization = request.headers.get("authorization");

  if (cronSecret) {
    return authorization === `Bearer ${cronSecret}`;
  }

  if (process.env.NODE_ENV !== "production") {
    return true;
  }

  return request.headers.get("user-agent")?.toLowerCase().includes("vercel-cron") ?? false;
}

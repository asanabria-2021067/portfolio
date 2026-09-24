import { getContributions } from "@/lib/contributions";

const CACHE_HEADER = {
  "Cache-Control": "s-maxage=3600, stale-while-revalidate=86400",
};

export async function GET(request: Request) {
  const rawYear = new URL(request.url).searchParams.get("year");
  const year = rawYear ? Number(rawYear) : undefined;

  try {
    const payload = await getContributions(Number.isFinite(year) ? year : undefined);
    return Response.json(payload, {
      status: payload.status === "error" ? 502 : 200,
      headers: CACHE_HEADER,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown GitHub API error.";
    return Response.json({ status: "error", message }, { status: 502, headers: CACHE_HEADER });
  }
}

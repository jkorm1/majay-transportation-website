import { NextResponse } from "next/server";
import { getAvailability } from "@/lib/availability";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  const available = await getAvailability();
  return NextResponse.json(
    { available },
    { headers: { "Cache-Control": "no-store" } }
  );
}
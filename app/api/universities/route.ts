// // //
import { getUniversities } from "@/_server/data/data";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Convert searchParams to a plain object
    const params = Object.fromEntries(searchParams.entries());

    // Fetch data using the shared logic in actions.ts
    const result = await getUniversities(params);

    if (result.error) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      count: result.count,
      data: result.data,
    });
  } catch (error) {
    console.error("API Route Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

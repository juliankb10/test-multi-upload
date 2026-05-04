import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.title) {
      return NextResponse.json(
        {
          error: "Title is required",
        },
        {
          status: 400,
        },
      );
    }

    if (!body.files) {
      return NextResponse.json(
        {
          error: "Title is required",
        },
        {
          status: 400,
        },
      );
    }

    return NextResponse.json(
      {
        ok: true,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Internal server error",
      },
      {
        status: 500,
      },
    );
  }
}

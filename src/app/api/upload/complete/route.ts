import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { files } = body;

    if (!Array.isArray(files)) {
      return NextResponse.json(
        {
          error: "Invalid files payload",
        },
        {
          status: 400,
        },
      );
    }

    await new Promise((resolve) => {
      setTimeout(resolve, 500);
    });

    return NextResponse.json(
      {
        ok: true,
        uploaded: files.length,
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

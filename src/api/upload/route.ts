import { NextResponse } from "next/server";

function wait(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json(
        {
          error: "Invalid file",
        },
        {
          status: 400,
        },
      );
    }

    // Simulate network delay
    await wait(1000 + Math.random() * 2000);

    // Simulate random failures (20%)
    if (Math.random() < 0.2) {
      return NextResponse.json(
        {
          error: "Random upload failure",
        },
        {
          status: 500,
        },
      );
    }

    const uploadedFile = {
      id: crypto.randomUUID(),
      url: `https://mock-storage.com/uploads/${crypto.randomUUID()}-${file.name}`,
    };

    return NextResponse.json(uploadedFile, {
      status: 200,
    });
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

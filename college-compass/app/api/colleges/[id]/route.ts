import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export const runtime = "nodejs";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const collegeId = Number(id);

    // Validate ID
    if (Number.isNaN(collegeId)) {
      return NextResponse.json(
        {
          message: "Invalid college ID",
        },
        {
          status: 400,
        }
      );
    }

    // Find college
    const college = await prisma.colleges.findUnique({
      where: {
        id: collegeId,
      },
    });

    // College not found
    if (!college) {
      return NextResponse.json(
        {
          message: "College not found",
        },
        {
          status: 404,
        }
      );
    }

    // Return college details
    return NextResponse.json(college);
  } catch (error) {
    console.error("Error fetching college:", error);

    return NextResponse.json(
      {
        message: "Error fetching college details",
      },
      {
        status: 500,
      }
    );
  }
}
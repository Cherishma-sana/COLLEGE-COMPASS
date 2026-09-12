import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { prisma } from "../../../../lib/prisma";

export const runtime = "nodejs";

const JWT_SECRET =
  process.env.JWT_SECRET || "college-compass-secret";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ collegeId: string }> }
) {
  try {
    const authHeader = request.headers.get("authorization");

    if (!authHeader) {
      return NextResponse.json(
        {
          message: "Authorization token required",
        },
        {
          status: 401,
        }
      );
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return NextResponse.json(
        {
          message: "Invalid authorization format",
        },
        {
          status: 401,
        }
      );
    }

    let decoded: {
      userId: number;
      email: string;
    };

    try {
      decoded = jwt.verify(token, JWT_SECRET) as {
        userId: number;
        email: string;
      };
    } catch {
      return NextResponse.json(
        {
          message: "Invalid or expired token",
        },
        {
          status: 401,
        }
      );
    }

    const { collegeId } = await params;

    const id = Number(collegeId);

    if (Number.isNaN(id)) {
      return NextResponse.json(
        {
          message: "Invalid college ID",
        },
        {
          status: 400,
        }
      );
    }

    const savedCollege = await prisma.savedCollege.findUnique({
      where: {
        userId_collegeId: {
          userId: decoded.userId,
          collegeId: id,
        },
      },
    });

    if (!savedCollege) {
      return NextResponse.json(
        {
          message: "Saved college not found",
        },
        {
          status: 404,
        }
      );
    }

    await prisma.savedCollege.delete({
      where: {
        userId_collegeId: {
          userId: decoded.userId,
          collegeId: id,
        },
      },
    });

    return NextResponse.json({
      message: "College removed from saved colleges",
    });
  } catch (error) {
    console.error("Delete saved college error:", error);

    return NextResponse.json(
      {
        message: "Error removing college",
      },
      {
        status: 500,
      }
    );
  }
}
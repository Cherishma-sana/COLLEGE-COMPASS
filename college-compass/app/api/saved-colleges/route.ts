import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { prisma } from "../../../lib/prisma";

export const runtime = "nodejs";

const JWT_SECRET =
  process.env.JWT_SECRET || "college-compass-secret";

function authenticateToken(request: NextRequest) {
  const authHeader = request.headers.get("authorization");

  if (!authHeader) {
    return {
      error: NextResponse.json(
        {
          message: "Authorization token required",
        },
        {
          status: 401,
        }
      ),
    };
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return {
      error: NextResponse.json(
        {
          message: "Invalid authorization format",
        },
        {
          status: 401,
        }
      ),
    };
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as {
      userId: number;
      email: string;
    };

    return {
      user: decoded,
    };
  } catch {
    return {
      error: NextResponse.json(
        {
          message: "Invalid or expired token",
        },
        {
          status: 401,
        }
      ),
    };
  }
}

// GET SAVED COLLEGES
export async function GET(request: NextRequest) {
  try {
    const auth = authenticateToken(request);

    if (auth.error) {
      return auth.error;
    }

    const userId = auth.user!.userId;

    const savedColleges = await prisma.savedCollege.findMany({
      where: {
        userId,
      },
      include: {
        college: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(savedColleges);
  } catch (error) {
    console.error("Get saved colleges error:", error);

    return NextResponse.json(
      {
        message: "Error fetching saved colleges",
      },
      {
        status: 500,
      }
    );
  }
}

// SAVE COLLEGE
export async function POST(request: NextRequest) {
  try {
    const auth = authenticateToken(request);

    if (auth.error) {
      return auth.error;
    }

    const userId = auth.user!.userId;

    const body = await request.json();

    const collegeId = Number(body.collegeId);

    if (!collegeId || Number.isNaN(collegeId)) {
      return NextResponse.json(
        {
          message: "Valid collegeId is required",
        },
        {
          status: 400,
        }
      );
    }

    // Check college exists
    const college = await prisma.colleges.findUnique({
      where: {
        id: collegeId,
      },
    });

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

    // Check if already saved
    const existing = await prisma.savedCollege.findUnique({
      where: {
        userId_collegeId: {
          userId,
          collegeId,
        },
      },
    });

    if (existing) {
      return NextResponse.json(
        {
          message: "College already saved",
        },
        {
          status: 409,
        }
      );
    }

    // Save college
    const savedCollege = await prisma.savedCollege.create({
      data: {
        userId,
        collegeId,
      },
    });

    return NextResponse.json(
      {
        message: "College saved successfully",
        savedCollege,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("Save college error:", error);

    return NextResponse.json(
      {
        message: "Error saving college",
      },
      {
        status: 500,
      }
    );
  }
}
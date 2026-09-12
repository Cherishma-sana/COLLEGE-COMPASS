import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const search = searchParams.get("search");
    const state = searchParams.get("state");
    const location = searchParams.get("location");
    const course = searchParams.get("course");

    const page = Math.max(
      Number(searchParams.get("page") || "1"),
      1
    );

    const limit = Math.min(
      Math.max(Number(searchParams.get("limit") || "10"), 1),
      50
    );

    const where = {
      ...(search
        ? {
            OR: [
              {
                name: {
                  contains: search,
                  mode: "insensitive" as const,
                },
              },
              {
                location: {
                  contains: search,
                  mode: "insensitive" as const,
                },
              },
            ],
          }
        : {}),
      ...(state ? { state } : {}),
      ...(location ? { location } : {}),
      ...(course
        ? {
            courses: {
              has: course,
            },
          }
        : {}),
    };

    const [colleges, total] = await Promise.all([
      prisma.colleges.findMany({
        where,
        orderBy: {
          rating: "desc",
        },
        skip: (page - 1) * limit,
        take: limit,
      }),

      prisma.colleges.count({
        where,
      }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({
      data: colleges,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
    });
  } catch (error) {
    console.error("Error fetching colleges:", error);

    return NextResponse.json(
      {
        message: "Error fetching colleges",
      },
      {
        status: 500,
      }
    );
  }
}
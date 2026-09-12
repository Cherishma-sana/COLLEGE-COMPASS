import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../../../../lib/prisma";

export const runtime = "nodejs";

const JWT_SECRET =
  process.env.JWT_SECRET || "college-compass-secret";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { email, password } = body;

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json(
        {
          message: "Email and password are required",
        },
        {
          status: 400,
        }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Find user
    const user = await prisma.user.findUnique({
      where: {
        email: normalizedEmail,
      },
    });

    // User not found
    if (!user) {
      return NextResponse.json(
        {
          message: "Invalid email or password",
        },
        {
          status: 401,
        }
      );
    }

    // Check password
    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatch) {
      return NextResponse.json(
        {
          message: "Invalid email or password",
        },
        {
          status: 401,
        }
      );
    }

    // Generate JWT
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
      },
      JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    return NextResponse.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    return NextResponse.json(
      {
        message: "Error logging in",
      },
      {
        status: 500,
      }
    );
  }
}
import { connectDB } from "@/db/db";
import { getDataFromToken } from "@/helpers/grtDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/model/userModel";

connectDB();

export async function GET(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);

    if (!userId) {
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 }
      );
    }
    const user = await User.findOne({ _id: userId }).select("-password");

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "User's data retrieved successfully",
      data: user,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Error while retrieving user data" },
      { status: 500 }
    );
  }
}

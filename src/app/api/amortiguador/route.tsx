import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("AutoDB");
    const collection = await db
      .collection("shocks")
      .find()
      .limit(20)
      .toArray();
    return NextResponse.json({ collection }, { status: 200 });
  } catch (e) {
    console.error(e);
  }
}

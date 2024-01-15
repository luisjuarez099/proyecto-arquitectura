import clientPromise from "@/lib/mongodb"; // Importamos la conexión a la base de datos
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("AutoDB"); // Conectamos a la base de datos
    const items = await db
      .collection("shocks") // Seleccionamos la colección de la base de datos
      .find({})
      // .sort({ metacritic: -1 })
      .limit(150)
      .toArray();
    return NextResponse.json({ items }, { status: 200 });
  } catch (e) {
    console.error(e);
  }
}

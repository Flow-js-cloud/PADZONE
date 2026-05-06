import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";

const ALLOWED = ["image/jpeg", "image/png", "image/webp", "image/gif"];

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const token = process.env.BLOB_READ_WRITE_TOKEN;
    if (!token) {
      return NextResponse.json(
        { error: "BLOB_READ_WRITE_TOKEN manquant — configure Vercel Blob dans le dashboard." },
        { status: 503 }
      );
    }

    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    if (!file) return NextResponse.json({ error: "Aucun fichier" }, { status: 400 });

    if (!ALLOWED.includes(file.type)) {
      return NextResponse.json({ error: "Format non supporté (JPG, PNG, WEBP, GIF)" }, { status: 400 });
    }

    const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
    const safeName = `product-${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

    const blob = await put(`products/${safeName}`, file, {
      access: "public",
      token,
    });

    return NextResponse.json({ url: blob.url });

  } catch (err) {
    const message = err instanceof Error ? err.message : "Erreur upload";
    console.error("[upload] error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

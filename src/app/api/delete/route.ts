import { deletePerson } from "@/utils/database";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { name, slug }: PersonDelete = await request.json();

  const deletion = deletePerson(slug, name);

  if (!deletion) {
    return new Response(`couldn't find person with name ${name}`, { status: 404 })
  }

  return NextResponse.json({ success: true });
}

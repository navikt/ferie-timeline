import { NextResponse } from "next/server";
import { deletePerson } from "../route";

export async function POST(request: Request) {
  const { name }: PersonDelete = await request.json();

  const deletion = deletePerson(name);

  if (!deletion) {
    return new Response(`couldn't find person with name ${name}`, { status: 404 })
  }

  return NextResponse.json({ success: true });
}

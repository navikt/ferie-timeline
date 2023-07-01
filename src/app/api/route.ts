import { getPeople } from "@/utils/database"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const { slug } = await request.json()
  return NextResponse.json(getPeople(slug))
}
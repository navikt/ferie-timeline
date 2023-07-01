import { addPerson } from "@/utils/database"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const { start, end, name, slug }: PersonPost = await request.json()

  const newPerson: PersonSerialized = {
    name,
    icon: "PersonIcon",
    periods: [
      {
        start,
        end,
        status: "success",
        icon: "ParasolBeachIcon",
      },
    ],
  }

  addPerson(slug, newPerson)
  return NextResponse.json({ success: true })
}

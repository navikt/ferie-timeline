import { get } from 'http';
import { NextResponse } from 'next/server'

// "database"

let people: PersonSerialized[] = [];

export const getPeople = () => {
  return people
}
export const addPerson = (person: PersonSerialized) => {
  people.push(person)
}
export const deletePerson = (name: string): boolean => {

  const index = people.findIndex((person) => person.name === name);
  if (index === -1) {
    return false;
  }
  people = people.filter((person) => person.name !== name);

  return true;
}

// routes
 
export async function GET(request: Request) {
  return NextResponse.json(getPeople())
}

export async function POST(request: Request) {
  const { start, end, name }: PersonPost = await request.json()

  const newPerson: PersonSerialized = {
      name,
      icon: "PersonIcon",
      periods: [
        {
          start,
          end,
          status: "success",
          icon: "ParasolBeachIcon",
        }
      ]
  }

  people.push(newPerson)
 
  return NextResponse.json({ success: true})
}


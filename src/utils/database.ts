// "database"

let SlugData: SlugData = {}

export const getPeople = (slug: string): PersonSerialized[] => {
  return SlugData[slug] ?? []
}
export const addPerson = (slug: string, person: PersonSerialized) => {
  if (!SlugData[slug]) {
    SlugData[slug] = [person]
  } else {
      SlugData[slug].push(person)
  }
}
export const deletePerson = (slug: string, name: string): boolean => {
  const people = SlugData[slug]

  const index = people.findIndex((person) => person.name === name)
  if (index === -1) {
    return false
  }
  people.splice(index, 1)
  return true
}

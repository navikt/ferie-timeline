"use client"

import { prettyDayMonth } from "@/utils/date"
import { ParasolBeachIcon, PersonIcon } from "@navikt/aksel-icons"
import {
  BodyLong,
  Button,
  DatePicker,
  ExpansionCard,
  TextField,
  Timeline,
  useRangeDatepicker,
} from "@navikt/ds-react"
import { FormEvent, useEffect, useState } from "react"
import { DateRange } from "react-day-picker"

export default function Home({
  params: { slug },
}: {
  params: { slug: string }
}) {
  const { datepickerProps, toInputProps, fromInputProps, selectedRange } =
    useRangeDatepicker({})

  let [personName, setPersonName] = useState<string>("")
  let [people, setPeople] = useState<Person[]>([])

  useEffect(() => {
    getPerson(slug)
      .then((data) => data.json())
      .then((data) => {
        const people = data.map((person: PersonSerialized) =>
          deserializePerson(person)
        )
        setPeople(people)
      })
  }, [slug])

  return (
    <main className="min-w-[800px] h-[100%]">
      <h1>Ferie! 🏖️</h1>
      <BodyLong size="small" spacing>
        Del URLen til denne siden for å se og redigere samme ferieplan
      </BodyLong>
      {people.length > 0 && (
        <Timeline className="p-10 border border-black rounded-lg border-opacity-40">
          {people.map((person, idx) => (
            <Timeline.Row key={idx} label={person.name} icon={person.icon}>
              {person.periods.map((period, idx) => (
                <Timeline.Period key={idx} {...period}>
                  {prettyDayMonth(period.start)} ➡️ {prettyDayMonth(period.end)}
                </Timeline.Period>
              ))}
            </Timeline.Row>
          ))}
        </Timeline>
      )}
      <div className="flex flex-col justify-between h-[100%]">
        <ExpansionCard
          className="mt-8 flex-initial"
          aria-label="legg til person"
        >
          <ExpansionCard.Header>
            <ExpansionCard.Title>Legg til ferie</ExpansionCard.Title>
          </ExpansionCard.Header>
          <ExpansionCard.Content>
            <form
              onSubmit={(e) =>
                handleSubmit(
                  e,
                  selectedRange,
                  personName,
                  people,
                  setPeople,
                  slug
                )
              }
            >
              <TextField
                label="Navn"
                onChange={(e) => setPersonName(e.target.value)}
              />
              <DatePicker {...datepickerProps}>
                <div className="flex flex-wrap justify-center gap-4">
                  <DatePicker.Input
                    className="mt-3"
                    {...fromInputProps}
                    label="Fra"
                  />
                  <DatePicker.Input
                    className="mt-3"
                    {...toInputProps}
                    label="Til"
                  />
                </div>
              </DatePicker>
              <Button className="mt-5">Legg til</Button>
            </form>
          </ExpansionCard.Content>
        </ExpansionCard>
        <ExpansionCard
          className="mt-8 flex-initial"
          aria-label="legg til person"
        >
          <ExpansionCard.Header>
            <ExpansionCard.Title>
              Fjern ferie / legg til på nytt
            </ExpansionCard.Title>
          </ExpansionCard.Header>
          <ExpansionCard.Content>
            <form
              onSubmit={(e) =>
                handleDelete(e, personName, people, setPeople, slug)
              }
            >
              <TextField
                label="Navn"
                description="Dette navnet må være likt som det du skrev inn når du la til ferien"
                onChange={(e) => setPersonName(e.target.value)}
              />
              <Button variant="danger" className="mt-5">
                Fjern
              </Button>
            </form>
          </ExpansionCard.Content>
        </ExpansionCard>
      </div>
    </main>
  )
}

const handleDelete = (
  event: FormEvent,
  name: string,
  people: Person[],
  setPeople: (newPerson: Person[]) => void,
  slug: string
) => {
  event.preventDefault()

  if (!name) {
    console.error(`error deleting person ${name}`)
    return
  }

  const newPeople = people.filter((person) => person.name !== name)
  setPeople(newPeople) // local
  // server
  deletePerson({
    slug,
    name,
  })
}

const handleSubmit = (
  event: FormEvent,
  selectedRange: DateRange | undefined,
  name: string,
  people: Person[],
  setPeople: (newPerson: Person[]) => void,
  slug: string
) => {
  event.preventDefault()

  if (!selectedRange || !selectedRange.from || !selectedRange.to || !name) {
    console.error(
      `error inserting person ${name} with range ${selectedRange?.from} - ${selectedRange?.to}`
    )
    return
  }

  const newPerson = {
    name,
    icon: <PersonIcon aria-hidden />,
    periods: [
      {
        start: selectedRange?.from,
        end: selectedRange?.to,
        status: "success" as "success",
        icon: <ParasolBeachIcon aria-hidden />,
      },
    ],
  }

  setPeople([...people, newPerson]) // local
  // server
  postPerson({
    name,
    start: selectedRange?.from.toISOString(),
    end: selectedRange?.to.toISOString(),
    slug,
  })
}

const getPerson = (slug: string) => {
  return fetch("/api", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ slug }),
  })
}

const postPerson = (person: PersonPost) => {
  return fetch("/api/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(person),
  })
}

const deletePerson = (person: PersonDelete) => {
  return fetch("/api/delete", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(person),
  })
}

const deserializePerson = (person: PersonSerialized): Person => {
  return {
    ...person,
    icon: <PersonIcon aria-hidden />,
    periods: person.periods.map((period) => ({
      ...period,
      icon: <ParasolBeachIcon aria-hidden />,
      start: new Date(period.start),
      end: new Date(period.end),
    })),
  }
}

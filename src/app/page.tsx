"use client"

import { Button, TextField } from "@navikt/ds-react"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context"
import { useRouter } from "next/navigation"
import { KeyboardEvent, useState } from "react"

const handleKeyDown = (
  e: KeyboardEvent<HTMLInputElement>,
  router: AppRouterInstance,
  slug: string
) => {
  if (e.key === "Enter") {
    goToPage(router, slug)
  }
}

const goToPage = (router: AppRouterInstance, slug: string) => {
  router.push(`/${slug}`)
}

const validateSlug = (slug: string) => {
  if (!slug.match(/^[a-z0-9-]*$/)) {
    return "Sidenavn kan bare inneholde små bokstaver, tall og bindestrek"
  }
  return false
}

const Page = () => {
  const [slug, setSlug] = useState<string>("")
  const router = useRouter()

  return (
    <main className="min-w-[800px] h-[100%] flex flex-col">
      <h1 className="flex-initial">Ferie? 🏖️</h1>
      <div className="h-[55%] flex flex-col justify-around">
        <div className="p-10 border-black border rounded-lg">
          <TextField
            label="Sidenavn"
            placeholder="min-unike-ferieside-2022"
            description="Skriv inn et unikt navn for å lage en ny ferieplanleggingsside."
            onChange={(e) => setSlug(e.target.value)}
            onKeyDown={(e) =>
              !validateSlug(slug) && handleKeyDown(e, router, slug)
            }
            error={validateSlug(slug)}
            autoFocus={true}
          />
          <Button
            variant="primary"
            className="mt-5"
            onClick={() => goToPage(router, slug)}
            disabled={!!validateSlug(slug)}
          >
            Start ferieplanlegging!
          </Button>
        </div>
      </div>
    </main>
  )
}

export default Page

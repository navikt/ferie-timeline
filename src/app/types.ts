type Person = {
  name: string
  icon: JSX.Element
  periods: {
    start: Date
    end: Date
    status: "success"
    icon: JSX.Element
  }[]
}

type PersonSerialized = {
  name: string
  icon: "PersonIcon"
  periods: {
    start: string
    end: string
    status: "success"
    icon: "ParasolBeachIcon"
  }[]
}

type SlugData = {
  [slug: string]: PersonSerialized[]
}

type PersonPost = {
  name: string
  start: string
  end: string
  slug: string
}

type PersonDelete = { name: string; slug: string }

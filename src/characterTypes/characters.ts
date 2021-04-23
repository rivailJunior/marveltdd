export type CharacterDataContainer = {
    offset: number
    limit: number
    total: number
    count: number
    results: [Character]
}

export type Character = {
    id: number
    name: string
    description: string
    modified: Date
    resourceURI: String
    urls?: string[] | null
    thumbnail?: Image
    comics?: ComicList[] | any
    stories?: StoryList[] | any
    events?: EventList[] | any
    series?: SeriesList[] | any
}

export type Image = {
    path: string
    extension: string
}

export type ComicList = {
    available: number
    returned: number
    collectionURI: string
    items: [ComicSummary]
}
export type ComicSummary = {
    resourceURI: string
    name: string
}

export type StoryList = {
    available: number
    returned: number
    collectionURI: string
    items: [StorySummary]
}

export type StorySummary = {
    resourceURI: string
    name: string
    type: string
}

export type EventList = {
    items?: EventSummary[] | null
    available: number
    returned: number
    collectionURI: string
}

export type EventSummary = {
    resourceURI: string
    name: string
}

export type SeriesList = {
    items?: SeriesSummary[] | null
    available: number
    returned: number
    collectionURI: string
}

export type SeriesSummary = {
    resourceURI: string
    name: string
}
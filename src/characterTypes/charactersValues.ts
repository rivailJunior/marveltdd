
import { Character, CharacterDataContainer, ComicSummary, ComicList, StorySummary, StoryList, EventSummary, EventList, SeriesSummary, SeriesList, Image } from './characters';

export const ComicSummaryValue: ComicSummary = {
    resourceURI: "",
    name: ""
}

export const ImageValue: Image = {
    path: '',
    extension: ''
}

export const ComicListValue: ComicList = {
    available: 0,
    returned: 0,
    collectionURI: "",
    items: [ComicSummaryValue]
}

export const StorySummaryValue: StorySummary = {
    resourceURI: "",
    name: "",
    type: "",
}

export const StoryListValue: StoryList = {
    available: 0,
    returned: 0,
    collectionURI: "",
    items: [StorySummaryValue]
}

export const EventSummaryValue: EventSummary = {
    resourceURI: "",
    name: "",
}

export const EventListValue: EventList = {
    items: [EventSummaryValue],
    available: 0,
    returned: 0,
    collectionURI: "",
}

export const SeriesSummaryValue: SeriesSummary = {
    resourceURI: "",
    name: ""
}

export const SeriesListValue: SeriesList = {
    items: [SeriesSummaryValue],
    available: 0,
    returned: 0,
    collectionURI: ""

}

export const CharacterValue: Character = {
    id: 0,
    name: '',
    description: '',
    modified: new Date(),
    resourceURI: '',
    urls: [''],
    thumbnail: ImageValue,
    comics: [ComicListValue],
    stories: [StoryListValue],
    events: [EventListValue],
    series: [SeriesListValue]
}


export const CharacterDataContainerValue: CharacterDataContainer = {
    offset: 0,
    limit: 0,
    total: 0,
    count: 0,
    results: [CharacterValue]
}


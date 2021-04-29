import { RootModel } from './index';
import { createModel } from '@rematch/core'
import { getCharacters, getCharacterByName } from '../provider/service'

import { Character } from './../characterTypes/characters';

type CharactersState = {
    characters: Character[],
    total: number,
    currentPage: number
}

export const charactersModel = createModel<RootModel>()({
    state: {
        characters: [],
        total: 0,
        currentPage: 0,
    } as CharactersState,
    reducers: {
        SET_CHARACTERS: (state: CharactersState, characters: Character[]) => {
            return {
                ...state,
                characters
            }
        },
        SET_TOTAL: (state: CharactersState, total: number) => {
            return {
                ...state,
                total
            }
        },
        SET_PAGINATION: (state: CharactersState, currentPage: number) => {
            return {
                ...state,
                currentPage
            }
        }
    }, effects: (dispatch) => ({
        async getAll(args: { offset: number, total: number, currentPage: number }, state): Promise<any> {
            const { offset, total, currentPage } = args
            const data = await getCharacters(total, offset);
            dispatch.charactersModel.SET_PAGINATION(currentPage)
            dispatch.charactersModel.SET_CHARACTERS(data.results);
            dispatch.charactersModel.SET_TOTAL(data.total)

        },
        async get(name: string, state): Promise<any> {
            const data = await getCharacterByName(name);
            dispatch.charactersModel.SET_CHARACTERS(data.results);
            dispatch.charactersModel.SET_TOTAL(data.total)
        }

    })
})
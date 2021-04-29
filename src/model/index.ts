import { charactersModel } from './characters';
import { Models } from '@rematch/core'

export interface RootModel extends Models<RootModel> {
    charactersModel: typeof charactersModel
}

export const models: RootModel = { charactersModel }

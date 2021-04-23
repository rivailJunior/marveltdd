import { Character, CharacterDataContainer } from './../characterTypes/characters';
import axios, { AxiosResponse } from 'axios'
const apikey = process.env.REACT_APP_PUBKEY
// const hash = process.env.REACT_APP_HASH
// const ts = 1;

const api = axios.create({
    baseURL: 'https://gateway.marvel.com/v1/public',
});

const getService = async (url: string, options: object): Promise<AxiosResponse> => {
    return await api.get(url, { params: { apikey, ...options } })
}

const getCharacters = async (total: number): Promise<CharacterDataContainer> => {
    const result = await getService('/characters', { offset: 0, limit: total })
    return result.data?.data
}

const getParticipation = async (id: number, type: string): Promise<any> => {
    const result = await getService(`/characters/${id}/${type}`, {})
    return result.data?.data
}

const getCharacter = async (id: number): Promise<Character> => {
    const result = await getService(`/characters/${id}`, {})
    return result.data?.data?.results
}

export { getCharacters, getCharacter, getParticipation as getParticipations };
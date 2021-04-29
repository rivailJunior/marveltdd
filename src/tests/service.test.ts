import { cleanup } from "@testing-library/react";
import { responseSeriesMock, responseValueMock } from '../characterTypes/requestValueMock';
import { getCharacter, getCharacterByName, getCharacters, getParticipation } from "../provider/service";
afterEach(cleanup);


describe('Services Request', () => {
    test('Request 10 characters to show in list', async () => {
        const result = await getCharacters(10);
        expect(result.results).toHaveLength(10)
    })

    test('Show err on Request 1 character to show in serach ', async () => {
        try {
            await getCharacter(1);
        } catch ({ response }) {
            expect(response.status).toBe(404)
        }
    })

    test('Show Success on Request 1 character to show in serach ', async () => {
        const character = await getCharacter(1011334);
        expect(character[0].id).toEqual(responseValueMock.data.results[0].id)
    })

    test("Get Character series participation", async () => {
        const series = await getParticipation(1011334, 'series');
        expect(series.count).toEqual(responseSeriesMock.data.count)
    })

    test("Get Character by user name", async () => {
        const character = await getCharacterByName('3-D Man');
        expect(character.results[0].name).toEqual('3-D Man')
    })

    test("Get ERR when dont pass Character id ", async () => {
        try {
            await getParticipation(null, 'series');

        } catch ({ response }) {

            expect(response.status).toBe(409)
        }

    })
})
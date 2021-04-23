import { cleanup } from "@testing-library/react";
import { responseSeriesMock, responseValueMock } from '../characterTypes/requestValueMock';
import { getCharacter, getCharacters, getParticipation } from "../provider/service";
afterEach(cleanup);


describe('Services Request', () => {
    test('Request 10 characters to show in list', async () => {
        const result = await getCharacters(10);
        expect(result.results).toHaveLength(10)
        expect(result).toEqual(responseValueMock.data)
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
        expect(character[0]).toEqual(responseValueMock.data.results[0])
    })

    test("Get Character series participation", async () => {
        const series = await getParticipation(1011334, 'series');
        expect(series).toEqual(responseSeriesMock.data)
    })

    test("Get ERR when dont pass Character id ", async () => {
        try {
            await getParticipation(null, 'series');

        } catch ({ response }) {

            expect(response.status).toBe(409)
        }

    })
})
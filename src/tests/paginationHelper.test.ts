import { helperPagination } from './../helper/helperPagination';
import { cleanup } from "@testing-library/react";
describe('Helper pagination factory', () => {

    test('Get current Page when pass no params', () => {
        const response = helperPagination();
        expect(response).toEqual({
            page: 0,
            offset: 0
        })
    })

    test('Get current Page when pass params', () => {
        const response = helperPagination(3);
        expect(response).toEqual({
            page: 2,
            offset: 20
        })
    })
})
import React from "react";
import {
    render,
    cleanup,
    fireEvent,
    getByTestId,
    getAllByTestId,
} from "@testing-library/react";
import renderer from "react-test-renderer";
import { act } from "react-dom/test-utils";
import { MemoryRouter } from "react-router-dom";
import { CarouselInfor } from "../components/carousel";
import { responseSeriesMock } from "../characterTypes/requestValueMock";

afterEach(cleanup);

describe("`<CarouselInfor>`", () => {
    test("Render correctly", () => {
        const container = renderer.create(
            <CarouselInfor data={[1, 2, 3]} type="Series" />
        );
        container.toJSON();
        expect(container).toMatchSnapshot();
    });

    test("Render with no item to be shown ", () => {
        const { getByText } = render(<CarouselInfor data={[]} type="Series" />);
        expect(
            getByText(/Ops. Nenhuma Series encontrado/i)
        ).toBeInTheDocument();
    });

    test("Render Series ", () => {
        const { getByText, getAllByTestId } = render(
            <CarouselInfor
                data={responseSeriesMock.data.results}
                type="Series"
            />
        );
        expect(getByText(/series/i)).toBeInTheDocument();
        expect(getAllByTestId("carouselItem")).toHaveLength(
            responseSeriesMock.data.results.length
        );
    });
});

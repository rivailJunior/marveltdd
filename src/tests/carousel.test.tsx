import React from "react";
import { render, cleanup } from "@testing-library/react";
import renderer from "react-test-renderer";
import { responseSeriesMock } from "../characterTypes/requestValueMock";
import { CarouselInfor } from "../components/carousel/carousel";

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

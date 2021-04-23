import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import renderer from "react-test-renderer";
import { MarvelPagination } from "../components/marvelPagination";

afterEach(cleanup);

describe("`<MarvelPagination>`", () => {
    test("Render correctly", () => {
        const container = renderer.create(<MarvelPagination total={100} />);
        container.toJSON();
        expect(container).toMatchSnapshot();
    });

    test("Hide pagination if total is less than 10", () => {
        const { getByTestId } = render(<MarvelPagination total={9} />);
        const pagination = getByTestId("paginationDiv");
        expect(pagination).toHaveClass("noPagination");
    });

    test("Show max 10 pagination itens if list is too higher", () => {
        const { getAllByTestId } = render(<MarvelPagination total={1000} />);
        const pagination = getAllByTestId("paginationItems");
        expect(pagination).toHaveLength(10);
    });

    test("Render with first item as active", () => {
        const { getAllByTestId } = render(
            <MarvelPagination total={1000} handleActive={() => {}} />
        );
        const paginationItem = getAllByTestId("paginationItems");
        expect(paginationItem[0].parentNode).toHaveClass("active");
    });

    test("Set new item as active", () => {
        const callback = jest.fn();
        const { getByText } = render(
            <MarvelPagination total={1000} handleActive={callback} />
        );
        fireEvent.click(getByText(/5/i));
        expect(callback).toBeCalledTimes(1);
        expect(callback).toBeCalledWith(5);
    });
});

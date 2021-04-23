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
        expect(callback).toBeCalledWith(4);
    });

    test("Set 1 when press first item", () => {
        const callback = jest.fn();
        const { getByText } = render(
            <MarvelPagination total={1000} handleActive={callback} />
        );
        fireEvent.click(getByText(/First/i));
        expect(callback).toBeCalledTimes(1);
        expect(callback).toBeCalledWith(0);
    });

    test("Get previous page when click previous button", () => {
        const callback = jest.fn();
        const { getByText } = render(
            <MarvelPagination total={1000} handleActive={callback} />
        );
        fireEvent.click(getByText(/5/i));
        expect(callback).toBeCalledTimes(1);
        expect(callback).toBeCalledWith(4);
        fireEvent.click(getByText(/Previous/i));
        expect(callback).toBeCalledWith(4);
    });

    test("Get last page when click last button", () => {
        const callback = jest.fn();
        const { getByText } = render(
            <MarvelPagination total={1000} handleActive={callback} />
        );
        const totalValues = Array(Math.ceil(1000 / 10)).fill(0);
        fireEvent.click(getByText(/Last/i));
        expect(callback).toBeCalledWith(totalValues.length);
    });

    test("Get next page when click next", () => {
        const callback = jest.fn();
        const { getByText } = render(
            <MarvelPagination total={1000} handleActive={callback} />
        );
        fireEvent.click(getByText(/5/i));
        fireEvent.click(getByText(/Next/i));
        expect(callback).toBeCalledWith(6);
    });
});

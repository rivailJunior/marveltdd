import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import renderer from "react-test-renderer";
import { MarvelPagination } from "../components/pagination/marvelPagination";
import { unmountComponentAtNode } from "react-dom";

let container: any = null;
beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

describe("`<MarvelPagination>`", () => {
    test("Render correctly", () => {
        const container = renderer.create(<MarvelPagination total={100} />);
        container.toJSON();
        expect(container).toMatchSnapshot();
    });

    test("Hide pagination if total is less than 10", () => {
        const { getByTestId } = render(<MarvelPagination total={9} />, container);
        const pagination = getByTestId("paginationDiv");
        expect(pagination).toHaveClass("noPagination");
    });

    test("Show max 10 pagination itens if list is too higher", () => {
        const { getAllByTestId } = render(<MarvelPagination total={1000} />, container);
        const pagination = getAllByTestId("paginationItems");
        expect(pagination).toHaveLength(10);
    });

    test("Render with first item as active", () => {
        const { getAllByTestId } = render(
            <MarvelPagination total={1000} handleActive={() => { }} />, container
        );
        const paginationItem = getAllByTestId("paginationItems");
        expect(paginationItem[0].parentNode).toHaveClass("active");
    });

    test("Set new item as active", () => {
        const callback = jest.fn();
        const { getByText } = render(
            <MarvelPagination total={1000} handleActive={callback} />, container
        );
        fireEvent.click(getByText(/5/i));
        expect(callback).toBeCalledTimes(1);
        expect(callback).toBeCalledWith(4);
    });

    test("Dont show previous button when index is 0", () => {
        const callback = jest.fn();
        const { getByText } = render(
            <MarvelPagination total={1000} handleActive={callback} />, container
        );
        expect(screen.queryByText(/Previous/i)).not.toBeInTheDocument()
    });

    test("Show previous button when index is bigger than 0", async () => {
        const callback = jest.fn();
        const { getByText } = render(
            <MarvelPagination total={1000} handleActive={callback} />, container
        );
        fireEvent.click(getByText(/5/i));
        const previous = await screen.findByText(/Previous/i)
        expect(previous).toBeInTheDocument()
    });

    test("Dont Show First button when index is less than 1", () => {
        const callback = jest.fn();
        render(
            <MarvelPagination total={1000} handleActive={callback} />, container
        );

        const previous = screen.queryByText(/First/i)
        expect(previous).not.toBeInTheDocument()

    });

    test("Show Last button only when index is bigger than 2 but not when be last", () => {
        const callback = jest.fn();
        render(
            <MarvelPagination total={1000} handleActive={callback} />, container
        );
        fireEvent.click(screen.getByText(/9/i));
        fireEvent.click(screen.getByText(/Last/i));
        const previous = screen.queryByText(/Last/i)
        expect(previous).not.toBeInTheDocument()

    });

    test("Show Last button and only Ten list items on list", async () => {
        const callback = jest.fn();
        render(
            <MarvelPagination total={1000} handleActive={callback} />, container
        );
        fireEvent.click(screen.getByText(/9/i));
        fireEvent.click(screen.getByText(/Last/i));
        const listItems = await screen.findAllByTestId('paginationItems');
        expect(listItems).toHaveLength(10)
        expect(callback).toHaveBeenCalledTimes(2)
    });

    test("Show Next Item when active is bigger than or equal 9", async () => {
        const callback = jest.fn();
        render(
            <MarvelPagination total={1000} handleActive={callback} />, container
        );
        fireEvent.click(screen.getByText(/10/i));
        const listItems = await screen.findAllByTestId('paginationItems');
        expect(callback).toHaveBeenCalledTimes(1)
        expect(listItems).toHaveLength(11)
        const nextItem = await screen.findByText(/11/i);
        expect(nextItem).toBeInTheDocument()
    });

    test("Show First button when index is bigger than 1", async () => {
        const callback = jest.fn();
        const { getByText } = render(
            <MarvelPagination total={1000} handleActive={callback} />, container
        );
        fireEvent.click(getByText(/3/i));
        const previous = await screen.findByText(/First/i)
        expect(previous).toBeInTheDocument()
    });

    test("Set button 1 as active when click first button", async () => {
        const callback = jest.fn();
        render(
            <MarvelPagination total={1000} handleActive={callback} />, container
        );
        fireEvent.click(screen.getByText(/9/i));
        const first = await screen.findByText(/First/i)
        fireEvent.click(first);
        expect(first.parentNode).toHaveClass('page-link')
    });

    test("Get previous page when click previous button", () => {
        const callback = jest.fn();
        const { getByText } = render(
            <MarvelPagination total={1000} handleActive={callback} />, container
        );
        fireEvent.click(getByText(/5/i));
        expect(callback).toBeCalledTimes(1);
        expect(callback).toBeCalledWith(4);
        fireEvent.click(getByText(/Previous/i));
        expect(callback).toBeCalledWith(4);
    });

    test("Get next page when click next", () => {
        const callback = jest.fn();
        const { getByText } = render(
            <MarvelPagination total={1000} handleActive={callback} />, container
        );
        fireEvent.click(getByText(/5/i));
        fireEvent.click(getByText(/Next/i));
        expect(callback).toBeCalledWith(5);
    });
});

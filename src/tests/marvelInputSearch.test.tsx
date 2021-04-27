import { render, cleanup, fireEvent } from "@testing-library/react";
import renderer from "react-test-renderer";
import { MarvelInputSearch } from "../components/input/marvelInputSearch";

afterEach(cleanup);

describe("`<MarvelInputSearch>`", () => {
    test("Render correctly", () => {
        const container = renderer.create(
            <MarvelInputSearch handleChangeName={() => { }} />
        );
        container.toJSON();
        expect(container).toMatchSnapshot();
    });

    test("Show clear button when type", async () => {
        const { getByTestId } = render(
            <MarvelInputSearch handleChangeName={() => { }} />
        );
        const input = getByTestId("inputSearch");
        fireEvent.change(input, {
            target: {
                value: "Capitao america",
            },
        });
        const clearButton = getByTestId("btnClear");
        expect(clearButton).toHaveClass("showClear");
    });

    test("Clear input when click at clear button and hide clear button", () => {
        const { getByTestId } = render(
            <MarvelInputSearch handleChangeName={() => { }} />
        );
        const input = getByTestId("inputSearch");
        fireEvent.change(input, {
            target: {
                value: "Capitao america",
            },
        });
        const clearButton = getByTestId("btnClear");
        expect(clearButton).toHaveClass("showClear");
        fireEvent.click(clearButton);
        expect(input.value).toBe("");
        expect(clearButton).toHaveClass("hideClear");
    });

    test("Fire callback to get current input name typed", () => {
        const getName = jest.fn();
        const { getByTestId } = render(
            <MarvelInputSearch handleChangeName={getName} />
        );
        const input = getByTestId("inputSearch");
        fireEvent.change(input, {
            target: {
                value: "Capitao america",
            },
        });
        const searchBtn = getByTestId("btnSearch");
        fireEvent.click(searchBtn);
        expect(getName).toBeCalledTimes(1);
        expect(getName).toBeCalledWith("Capitao america");
    });
});

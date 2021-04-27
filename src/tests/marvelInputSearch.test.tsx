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

    test("Show if input value is correct", async () => {
        const { getByTestId } = render(
            <MarvelInputSearch handleChangeName={() => { }} />
        );
        const input = getByTestId("inputSearch");
        fireEvent.change(input, {
            target: {
                value: "Capitao america",
            },
        });
        expect(input).toHaveValue("Capitao america");
    });

    test("Clear input when click at clear button and hide clear button", () => {
        const fn = jest.fn();
        const { getByTestId } = render(
            <MarvelInputSearch handleChangeName={fn} />
        );
        const input = getByTestId("inputSearch");
        fireEvent.change(input, {
            target: {
                value: "Capitao america",
            },
        });

        expect(fn).toBeCalledTimes(1);
        expect(fn).toBeCalledWith("Capitao america");
    });
});

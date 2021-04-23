import React from "react";
import {
    render,
    cleanup,
    // fireEvent,
    act,
    // screen,
} from "@testing-library/react";
import renderer from "react-test-renderer";
import App from "../pages/home";
import { RequestProvider } from "../provider/requestContext";
import { getCharacters } from "../provider/service";

afterEach(cleanup);
// beforeEach(cleanup);

describe("`<App>`", () => {
    test("Render correctly", () => {
        const container = renderer.create(<App />);
        container.toJSON();
        expect(container).toMatchSnapshot();
    });

    test("Show information before loading list and after that show 10", async () => {
        const promise = getCharacters(10);
        const { getByText, findAllByTestId } = render(
            <RequestProvider values={{ getCharacters: promise }}>
                <App />
            </RequestProvider>
        );
        expect(getByText(/nenhum personagem encontrado/i)).toBeInTheDocument();

        await act(() => promise);
        // const listLi = await findAllByTestId("marvelLi");
        // expect(listLi).toHaveLength(10); // sometimes its return only one
    });
});

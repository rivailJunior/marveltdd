import React from "react";
import {
    cleanup,
    fireEvent,
    screen,
    render,
    act,
} from "@testing-library/react";
import renderer from "react-test-renderer";
import App from "../pages/home";
import { RequestProvider } from "../provider/requestContext";
import {
    getCharacter,
    getCharacters,
    getParticipation,
} from "../provider/service";
// afterEach(cleanup);

describe("`<App>`", () => {
    test("Render correctly", () => {
        const container = renderer.create(
            <RequestProvider>
                <App />
            </RequestProvider>
        );
        container.toJSON();
        expect(container).toMatchSnapshot();
    });

    test("Render all components correctly", async () => {
        const promise = Promise.resolve(() => setTimeout(() => {}, 1000));
        render(
            <RequestProvider>
                <App />
            </RequestProvider>
        );
        expect(
            screen.getByText(/Nenhum personagem encontrado/i)
        ).toBeInTheDocument();
        expect(screen.getByText(/Busca de personagens/i)).toBeInTheDocument();
        const btnSearch = screen.getByTestId("btnSearch");
        const inputSearch = screen.getByTestId("inputSearch");
        expect(btnSearch).toBeInTheDocument();
        expect(inputSearch).toBeInTheDocument();
        // await act(async () => {
        //     fireEvent.change(inputSearch, {
        //         target: {
        //             value: 1011334,
        //         },
        //     });
        //     fireEvent.click(btnSearch);
        //     await promise;
        // });
        // await expect(inputSearch.value).toBe("1011334");
        // const marvelLi = await screen.findAllByTestId("marvelLi");
        // expect(marvelLi).toHaveLength(1);
    });
});

import React from "react";
import { render, cleanup, fireEvent, screen } from "@testing-library/react";
import renderer from "react-test-renderer";
import { getCharacters } from "../provider/service";
import { MarvelList } from "../components/marvelList";
import { CharacterValue } from "../characterTypes/charactersValues";
import { act } from "react-dom/test-utils";
import { MemoryRouter, Router, BrowserRouter } from "react-router-dom";
import { responseValueMock } from "../characterTypes/requestValueMock";

afterEach(cleanup);

const renderWithRouter = (ui: any, { route = "/" } = {}) => {
    window.history.pushState({}, "Test page", route);

    return render(ui, { wrapper: BrowserRouter });
};

describe("`<MarvelList>`", () => {
    test("Render correctly", () => {
        const container = renderer.create(
            <MarvelList data={[CharacterValue]} errInfor={false} />
        );
        container.toJSON();
        expect(container).toMatchSnapshot();
    });

    test("Render with no character list", () => {
        const { getByText } = render(<MarvelList data={[]} errInfor={true} />);
        expect(getByText(/nenhum personagem encontrado/i)).toBeInTheDocument();
    });

    test("Render with 10 characters in list", async () => {
        try {
            const { findAllByTestId } = render(
                <MarvelList
                    data={responseValueMock.data.results}
                    errInfor={false}
                />
            );
            const list = await findAllByTestId("marvelLi");
            expect(list).toHaveLength(10);
        } catch (err) {
            expect(
                screen.getByText(/nenhum personagem encontrado/i)
            ).toBeInTheDocument();
        }
    });

    // test("Call another page when click on list item", () => {
    //     const { getAllByTestId } = renderWithRouter(
    //         <MarvelList
    //             data={responseValueMock.data.results}
    //             errInfor={false}
    //         />
    //     );

    //     const btnShowDescription = getAllByTestId("marvelLi");
    //     const leftClick = { button: 0 };
    //     fireEvent.click(btnShowDescription[0], leftClick);
    //     // const newPage = getByText(/Descricao do personagem/i);
    //     // expect(newPage).toBeInTheDocument();
    // });
});

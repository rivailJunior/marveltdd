import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import renderer from "react-test-renderer";
import { getCharacters } from "../provider/service";
import { MarvelList } from "../components/marvelList";
import { CharacterValue } from "../characterTypes/charactersValues";
import { act } from "react-dom/test-utils";
import { MemoryRouter } from "react-router-dom";

afterEach(cleanup);

describe("`<MarvelList>`", () => {
    test("Render correctly", () => {
        const container = renderer.create(
            <MarvelList data={[CharacterValue]} />
        );
        container.toJSON();
        expect(container).toMatchSnapshot();
    });

    test("Render with no character list", () => {
        const { getByText } = render(<MarvelList data={[]} />);
        expect(getByText(/nenhum personagem encontrado/i)).toBeInTheDocument();
    });

    // test("Render with 10 characters in list", async () => {
    //     const result = await getCharacters(10);
    //     const { findAllByTestId } = render(
    //         <MarvelList data={result.results} />
    //     );
    //     const list = await findAllByTestId("marvelLi");
    //     expect(list).toHaveLength(10);
    // });

    // test("Call another page when click on list item", async () => {
    //     const result = await getCharacters(10);
    //     const { getAllByTestId, getByTestId } = render(
    //         <MemoryRouter initialEntries={["/my/initial/route"]}>
    //             <MarvelList data={result.results} />
    //         </MemoryRouter>
    //     );

    //     const btnShowDescription = getAllByTestId("marvelLi");
    //     fireEvent.click(btnShowDescription[0]);
    // });
});

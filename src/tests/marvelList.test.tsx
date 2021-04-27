import React from "react";
import { render, cleanup, fireEvent, screen } from "@testing-library/react";
import renderer from "react-test-renderer";
import { getCharacters } from "../provider/service";
import { MarvelList } from "../components/list/marvelList";
import { CharacterValue } from "../characterTypes/charactersValues";
import { act } from "react-dom/test-utils";
import { MemoryRouter, Router, BrowserRouter } from "react-router-dom";
import { responseValueMock } from "../characterTypes/requestValueMock";

afterEach(cleanup);

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
});

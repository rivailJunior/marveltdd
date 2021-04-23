import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import renderer from "react-test-renderer";
import { act } from "react-dom/test-utils";
import { MemoryRouter } from "react-router-dom";
import { CarouselInfor } from "../components/carousel";

afterEach(cleanup);

describe("`<CarouselInfor>`", () => {
    test("Render correctly", () => {
        const container = renderer.create(
            <CarouselInfor data={[1, 2, 3]} type="Series" />
        );
        container.toJSON();
        expect(container).toMatchSnapshot();
    });

    test("Render with no item to be shown ", () => {
        const { getByText } = render(<CarouselInfor data={[]} type="Series" />);
        expect(
            getByText(/Ops. Nenhuma Series encontrado/i)
        ).toBeInTheDocument();
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

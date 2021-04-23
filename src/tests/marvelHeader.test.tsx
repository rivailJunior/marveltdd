import React from "react";
import { render, cleanup } from "@testing-library/react";
import renderer from "react-test-renderer";
import { MarvelHeader } from "../components/marvelHeader";

afterEach(cleanup);

describe("`<MarvelHeader>`", () => {
    test("Render correctly", () => {
        const container = renderer.create(
            <MarvelHeader
                leftLabel="Objective"
                userName="Rivail"
                descriptionRight="Teste front-end"
            />
        );
        container.toJSON();
        expect(container).toMatchSnapshot();
    });

    test("Render only with 1 props ", () => {
        const { getAllByTestId, getByText } = render(
            <MarvelHeader userName="Rivail" />
        );
        expect(getByText(/Rivail/i)).toBeInTheDocument();
        expect(getAllByTestId("informationProps")).toHaveLength(2);
    });

    test("Render with no props", () => {
        const { getAllByTestId } = render(<MarvelHeader />);
        expect(getAllByTestId("informationProps")).toHaveLength(3);
    });
});

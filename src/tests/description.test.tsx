import React from "react";
import {
    cleanup,
    fireEvent,
    screen,
    render,
    act,
} from "@testing-library/react";
import renderer from "react-test-renderer";
import Description from "../pages/description";
import { RequestProvider } from "../provider/requestContext";
import { Router, Route } from "react-router-dom";
import { createMemoryHistory } from "history";
import { responseValueMock } from "../characterTypes/requestValueMock";

afterEach(cleanup);

const renderWithRouter = (history: any, component: any) => {
    return <Router history={history}>{component}</Router>;
};

const stateItem = responseValueMock.data.results[0];

describe("`<Description>`", () => {
    test("Render correctly", () => {
        const history = createMemoryHistory();
        history.push("/description", { ...stateItem });
        const container = renderer.create(
            renderWithRouter(history, <Description />)
        );
        container.toJSON();
        expect(container).toMatchSnapshot();
    });

    test("Show character information", () => {
        const history = createMemoryHistory();
        history.push("/description", { ...stateItem });
        act(() => {
            const { getByText, findByTestId } = render(
                renderWithRouter(history, <Description />)
            );
            expect(getByText(/Descricao do personagem/i)).toBeInTheDocument();
            expect(getByText(/Aparições/i)).toBeInTheDocument();
            // const carousel = await findByTestId("carouselItem");
            // expect(carousel.length).toBeGreaterThan(1);
        });
    });
});


import {
    screen,
    render,
} from "@testing-library/react";
import renderer from "react-test-renderer";
import App from "../App";
import { RequestProvider } from "../provider/requestContext";
import { unmountComponentAtNode } from "react-dom";

import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { Provider } from 'react-redux'
import { store } from "../model/storeConfig";

const renderWithRouter = (history: any, component: any) => {
    return <Provider store={store}><Router history={history}>{component}</Router></Provider>;
};

let container: any = null;
beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);

});

afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

beforeAll(() => {
    jest.mock("../provider/requestContext", () => ({
        __esModule: true,
        default: jest.fn()
    }));
})

jest.mock('../components/input/marvelInputSearch', () => {
    return function MarvelInputSearch() {
        return <input onChange={() => jest.fn()} type="text" value="Capitao america" data-testid="inputSearch" />
    }
})


describe("`<App>`", () => {
    test("Render correctly", () => {
        const history = createMemoryHistory();
        history.push("/1");
        const container = renderer.create(renderWithRouter(history, <RequestProvider><App /></RequestProvider>));
        container.toJSON();
        expect(container).toMatchSnapshot();
    });

    test("Render all components correctly", () => {
        const history = createMemoryHistory();
        history.push("/1");
        render(renderWithRouter(history, <RequestProvider><App /></RequestProvider>))
        expect(screen.getByText(/Busca de personagens/i)).toBeInTheDocument();
        const inputSearch = screen.getByTestId("inputSearch");
        expect(inputSearch).toBeInTheDocument();
        expect(screen.queryByText(/Nenhum personagem encontrado/)).toBeInTheDocument()
        expect(inputSearch.value).toBe("Capitao america");
    });

});

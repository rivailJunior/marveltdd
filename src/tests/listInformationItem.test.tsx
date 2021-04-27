import React from "react";
import { render, cleanup } from "@testing-library/react";
import renderer from "react-test-renderer";
import { ListInformationItem } from "../components/list/listInformationItem";
import { responseValueMock } from "../characterTypes/requestValueMock";

afterEach(cleanup);

describe("`<ParticipationListItem>`", () => {
    test("Render correctly", () => {
        const container = renderer.create(
            <ListInformationItem
                list={[]}
                tagName="name"
                information="Eventos"
            />
        );
        container.toJSON();
        expect(container).toMatchSnapshot();
    });

    test("Render with no item", () => {
        const { getByText } = render(
            <ListInformationItem
                list={[]}
                tagName="name"
                information="Eventos"
            />
        );
        expect(getByText(/Ops. Eventos não encontrados!/i)).toBeInTheDocument();
    });

    test("Render max 3 itens on list", async () => {
        const { findAllByTestId, debug } = render(
            <ListInformationItem
                list={responseValueMock.data.results[0].events?.items}
                tagName="name"
                information="Eventos"
            />
        );
        const list = await findAllByTestId("informationLi");
        expect(list.length).toBeLessThan(4);
    });
});

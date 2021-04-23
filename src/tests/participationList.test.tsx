import React from "react";
import { render, cleanup } from "@testing-library/react";
import renderer from "react-test-renderer";
import { getCharacter } from "../provider/service";
import { ListInformationItem } from "../components/listInformationItem";

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
        const response = await getCharacter(1009148);
        const { findAllByTestId } = render(
            <ListInformationItem
                list={response[0]?.events?.items}
                tagName="name"
                information="Eventos"
            />
        );
        const list = await findAllByTestId("informationLi");
        expect(list.length).toBeLessThan(4);
    });
});

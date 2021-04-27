import { createContext, useContext } from "react";
import {
    Character,
    CharacterDataContainer,
} from "../characterTypes/characters";
import {
    getCharacters,
    getCharacter,
    getParticipation,
    getCharacterByName,
} from "./service";

type RequestContextType = {
    getCharacters(
        total: number,
        offset?: number
    ): Promise<CharacterDataContainer>;
    getCharacter(id: number): Promise<[Character]>;
    getCharacterByName(name: string): Promise<[Character]>;
    getParticipation(id: number, type: string): Promise<any>;
};

const RequestContext = createContext({
    getCharacter,
    getCharacters,
    getParticipation,
    getCharacterByName,
});

export const useRequestContext = () => {
    const context = (useContext(
        RequestContext
    ) as unknown) as RequestContextType;
    return context;
};

export const RequestProvider = (props: any) => {
    return (
        <RequestContext.Provider
            value={{
                getParticipation,
                getCharacter,
                getCharacters,
                getCharacterByName,
            }}
            {...props}
        />
    );
};

export default RequestContext;

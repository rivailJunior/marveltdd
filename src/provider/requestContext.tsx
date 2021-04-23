import React, { createContext, useContext, useState, useMemo } from "react";
import {
    Character,
    CharacterDataContainer,
} from "../characterTypes/characters";
import { getCharacters, getCharacter, getParticipations } from "./service";

type RequestContextType = {
    getCharacters(total: number): Promise<CharacterDataContainer>;
    getCharacter(id: number): Promise<[Character]>;
    getParticipation(id: number): Promise<any>;
};

const RequestContext = createContext({});

export const useRequestContext = () => {
    const context = useContext(RequestContext) as RequestContextType;
    return context;
};

export const RequestProvider = (props: any) => {
    // const getRequest = useMemo(() => {
    //     return { getCharacters, getCharacter };
    // }, []);
    // const {
    //     getParticipation,
    //     getCharacter,
    //     getCharacters,
    // } = useRequestContext();
    return (
        <RequestContext.Provider
            value={{ getParticipations, getCharacter, getCharacters }}
            {...props}
        />
    );
};

export default RequestContext;

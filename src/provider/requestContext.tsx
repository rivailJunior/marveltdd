import { createContext, useContext, useMemo } from "react";

import {
    getParticipation,
} from "./service";

type RequestContextType = {
    getParticipation(id: number, type: string): Promise<any>;
};

const RequestContext = createContext({
    getParticipation,
});

export const useRequestContext = () => {
    const context = (useContext(
        RequestContext
    ) as unknown) as RequestContextType;
    return context;
};

export const RequestProvider = (props: any) => {
    const { getParticipation } = useRequestContext();
    const value = useMemo(() => {
        return { getParticipation }
    }, [])
    return (
        <RequestContext.Provider
            value={value}
            {...props}
        />
    );
};

export default RequestContext;

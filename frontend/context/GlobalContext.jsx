import { createContext, useState } from "react";

const GlobalContext = createContext();

export const GlobalStateProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const context = {
        user,
        setUser,
        error,
        setError,
        isLoading,
        setIsLoading
    }

    return (
        <GlobalContext.Provider value={context}>
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalContext;
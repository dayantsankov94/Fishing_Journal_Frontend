import { createContext, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const AuthContext = createContext();

export const AuthProvider = ({
    children
}) => {
    const [auth, setAuth] = useLocalStorage('user', {});

    const userLogin = (result) => {
        setAuth(result);
    }
    const userLogout = () => {
        setAuth({});
        localStorage.clear();
    };
    return (
        <AuthContext.Provider value=
            {{
                user: auth,
                userLogin,
                userLogout,
                isAuthenticated: !!auth.token
            }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => {
    const context = useContext(AuthContext);

    return context;
}
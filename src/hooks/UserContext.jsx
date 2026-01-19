import { createContext, useContext, useState, useEffect } from "react";



const userContext = createContext({});

export const UserProvider = ({ children }) => {
    // Em vez de começar com null, tentamos ler o localStorage na hora da criação
    const [userInfo, setUserInfo] = useState(() => {
        const userInfoLocalStorage = localStorage.getItem('devburguer:userData');

        if (userInfoLocalStorage) {
            return JSON.parse(userInfoLocalStorage);
        }
        return null;
    });

    const putUserData = (userInfo) => {
        setUserInfo(userInfo);
        localStorage.setItem('devburguer:userData', JSON.stringify(userInfo));
    };

    const logout = () => {
        setUserInfo(null);
        localStorage.removeItem('devburguer:userData');
    };

    // O useEffect aqui pode continuar para garantir sincronia, mas o useState acima já resolve o F5
    useEffect(() => {
        const userInfoLocalStorage = localStorage.getItem('devburguer:userData');
        if (userInfoLocalStorage) {
            setUserInfo(JSON.parse(userInfoLocalStorage));
        }
    }, []);

    return (
        <userContext.Provider value={{ userInfo, putUserData, logout }}>
            {children}
        </userContext.Provider>
    );
};



export const useUser = () => {
    const context = useContext(userContext);

    if (!context) {
        throw new Error('useUser must be a valid context');
    }
    return context;
};
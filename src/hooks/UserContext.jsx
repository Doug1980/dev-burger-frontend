import { createContext, useContext, useState, useEffect } from "react";



const userContext = createContext({});

export const UserProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState({ id: 1, name: 'Rodolfo' });

    const putUserData = (userInfo) => {
        setUserInfo(userInfo)

        localStorage.setItem('devburguer:userData', JSON.stringify(userInfo));
    };

    const logout = () => {
        setUserInfo({});
        localStorage.removeItem('devburguer:userData');
    };

    useEffect(() => {
        const userInfoLocalStorage = localStorage.getItem('devburguer:userData')

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
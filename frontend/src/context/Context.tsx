import axios from 'axios';
import { useEffect } from 'react';
import { createContext, useContext } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export interface UserType {
    _id: string;
    name: string;
    email: string;
    picture: string;
}

interface ContextValue {
    user: UserType;
    setUser: (value: UserType) => void;
}

const Context = createContext<ContextValue>({} as ContextValue);

function Provider({ children }: { children: JSX.Element }) {
    const navigate = useNavigate();
    const [user, setUser] = useState<UserType>({} as UserType);

    const getUser = async () => {
        try {
            await axios.get('/api/user/me');
        } catch (error) {
            localStorage.removeItem('userInfo');
        }
    };
    const deleteSession = async () => {
        try {
            await axios.delete('/api/session');
        } catch (error: any) {
            throw new Error(error);
        }
    };

    useEffect(() => {
        getUser();
        const userInfo = JSON.parse(localStorage.getItem('userInfo') as string);
        setUser(userInfo);

        if (!userInfo) {
            deleteSession();
            navigate('/');
        }
    }, [navigate]);

    return <Context.Provider value={{ user, setUser }}>{children}</Context.Provider>;
}

export const State = () => {
    return useContext(Context);
};

export default Provider;

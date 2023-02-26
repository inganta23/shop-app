import axios from 'axios';
import { useEffect } from 'react';
import { createContext, useContext } from 'react';
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

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
    const [searchParams, setSearchParams] = useSearchParams();
    const notify = (message: string) =>
        toast(message, {
            position: 'top-center',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light'
        });
    const navigate = useNavigate();
    const [user, setUser] = useState<UserType>({} as UserType);

    const getUser = async () => {
        try {
            const { data } = await axios.get('/api/user/me');
            setUser(data);
        } catch (error) {
            if (!searchParams.get('menu')) {
                notify('Please Log In');
                deleteSession();
            }
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
    }, [navigate]);

    return (
        <Context.Provider value={{ user, setUser }}>
            <>
                <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
                {children}
            </>
        </Context.Provider>
    );
}

export const State = () => {
    return useContext(Context);
};

export default Provider;

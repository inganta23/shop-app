import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { UserType } from '../context/Context';

const History = () => {
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
    const [history, setHistory] = useState([]);
    const getUserSession = async () => {
        try {
            const { data } = await axios.get('/api/session/');
            console.log(data);
            setHistory(data);
        } catch (error: any) {
            notify(error.message);
        }
    };

    useEffect(() => {
        getUserSession();
    }, []);
    return (
        <>
            <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
            <div>
                History
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                No
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Login Time
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {history.map((data: any, index) => (
                            <tr className=" border-b bg-gray-800 border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-white whitespace-nowrap ">
                                    {index + 1}
                                </th>
                                <th scope="row" className="px-6 py-4 font-medium text-white  whitespace-nowrap ">
                                    {new Date(data.createdAt).toString()}
                                </th>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {history?.map((data) => (
                    <></>
                ))}
            </div>
        </>
    );
};

export default History;

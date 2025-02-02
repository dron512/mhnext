'use client';

import React, {ReactNode, useEffect, useState} from 'react';

type todo = {
    id: number;
    createdAt: string;
    todo: string,
    author: string;
    state: string;
}

const Page = () => {
    const [data, setData] = useState<todo[] | null>(null);
    const [change, setChange] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/todo`);

            if (!response.ok) {
                console.log("error");
            }
            const data = await response.json();
            setData(data);
        }
        fetchData();
    }, [change])

    const updateData = (id: number) => {
        const fetchData = async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/todo/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({state: 'COMPLETED'}), // 업데이트할 데이터
            });
            if(res.ok) {
                setChange(!change);
            }
        }
        fetchData();
    }

    const deleteData = (id: number) => {
        const fetchData = async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/todo/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if(res.ok) {
                setChange(!change);
            }
        }
        fetchData();
    }

    if (!data) return <div>Loading...</div>;

    return (
        <div
            className="flex flex-col items-center">
            <h1 className={`text-5xl`}>Main</h1>
            <div className={`bg-gray-100 shadow-md m-5 p-5 w-11/12`}>
                <h1>해야할일</h1>
                {
                    data.filter(item => {
                        return item.state === 'PENDING'
                    }).map((item: todo): ReactNode => {
                        return (
                            <ul className={`flex gap-3 m-3 h-8 items-center justify-evenly`} key={item.id}>
                                <li>id: {item.id}</li>
                                <li className={`flex-1`}>todo: {item.todo}</li>
                                <li>author: {item.author}</li>
                                <li>date: {new Date(item.createdAt).toLocaleDateString()}</li>
                                <li>state: {item.state}</li>
                                <li className={`w-24`}>
                                    <button
                                        onClick={() => {
                                            updateData(item.id);
                                        }}
                                        className={`bg-blue-200 w-full px-3 py-1 hover:bg-blue-300`}>완료하기
                                    </button>
                                </li>
                            </ul>)
                    })
                }
            </div>
            <hr/>
            <div className={`bg-gray-100 shadow-md m-5 p-5 w-11/12`}>
                <h1>완료한일</h1>
                {
                    data.filter(item => {
                        return item.state === 'COMPLETED'
                    }).map((item: todo): ReactNode => {
                        return (
                            <ul className={`flex gap-3 m-3 h-8 items-center justify-evenly`} key={item.id}>
                                <li>id: {item.id}</li>
                                <li className={`flex-1`}>todo: {item.todo}</li>
                                <li>author: {item.author}</li>
                                <li>date: {new Date(item.createdAt).toLocaleDateString()}</li>
                                <li>state: {item.state}</li>
                                <li className={`w-24`}>
                                    <button
                                        onClick={() => {
                                            deleteData(item.id);
                                        }}
                                        className={`bg-blue-200 w-full px-3 py-1 hover:bg-blue-300`}>삭제하기
                                    </button>
                                </li>
                            </ul>)
                    })
                }
            </div>
        </div>
    );
};

export default Page;
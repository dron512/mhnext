import React from 'react';
import {InferGetServerSidePropsType} from "next";
import {FETCH_BOOKS} from '@/lib/fetechBooks'
import Image from "next/image";

export const getServerSideProps = async () => {
    const bookData = await FETCH_BOOKS();
    if (bookData) {
        return {
            props: {
                data: '하이',
                bookData: bookData
            }
        }
    }
    return {
        props: {
            data: '하이'
        }
    }
}

const Todo = ({data, bookData}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    return (
        <div>
            <h1>Books Page</h1>
            <p>{data}</p>
            {
                bookData == null ? null : bookData.map(book =>
                    (<div key={book.id} className={`flex flex-col items-center justify-center bg-gray-200 mt-5`}>
                        <div className={`flex`}>
                            <img src={book.coverImgUrl} alt={`이미지없음`} width={300} height={80} />
                            <div className={`flex flex-col p-10 bg-gray-200`}>
                                <h1 className={`text-5xl mb-5`}>{book.title}</h1>
                                <p className={`text-2xl`}>{book.description}</p>
                            </div>
                        </div>
                    </div>)
                )
            }
        </div>
    );
};

export default Todo;
import React from 'react';
import {FETCH_TODO_ONE} from "@/lib/fetechOneTodo";
import {GetStaticPropsContext, InferGetStaticPropsType} from "next";
import Link from "next/link";

export const getStaticPaths = async () => {
    return {
        paths: [
            {params: {id: "1"}},
            {params: {id: "2"}},
            {params: {id: "3"}},
        ],
        fallback: true
        // false : 404 Notfound
        // blocking : SSR 방식
        // true : SRR 방식 + 데이터가 없는 폴백 상태의 페이지부터 반환
    };
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
    const id = context.params!.id;
    const todo = await FETCH_TODO_ONE(Number(id));

    return {
        props: {
            todo,
        },
    };
}

const Id = ({todo}:InferGetStaticPropsType<typeof getStaticProps>) => {
    console.log(todo);
    if( !todo ) return "문제가 발생했습니다";

    return (
        <div>
            <h1>id</h1>
            <h2>할일 = {todo.todo} author = {todo.author}</h2>
            <Link href="/todo" className={`bg-gray-500 text-amber-50 px-5 py-3 m-2 hover:bg-gray-50`}>Todo List</Link>
        </div>
    );
};

export default Id;
import React from 'react';
import {InferGetStaticPropsType} from "next";
import {FETECH_TODOS} from "@/lib/fetechTodos";
import {TodoData} from "@/types/myType";
import {useRouter} from "next/router";

export const getStaticProps = async () => {
    const todos = await FETECH_TODOS();

    return {
        props: {
            todos: todos,
        }
    }
}

const Todo = ({todos}: InferGetStaticPropsType<typeof getStaticProps>) => {
    const router = useRouter();

    if (!todos) return "문제가 생겼습니다.";

    const moveToTodo = (id: number) => {
        router.push(`/todo/${id}`);
    }

    return (
        <div>
            <h1>Todo Page</h1>
            <div>{todos.map((todo: TodoData) => {
                return (<h1
                    className={`cursor-pointer hover:underline`}
                    onClick={() => {
                    moveToTodo(todo.id);
                }}
                            key={todo.id}> 해야할일 = {todo.todo}
                </h1>)
            })}</div>
        </div>
    );
};

export default Todo;
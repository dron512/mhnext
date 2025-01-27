import {TodoData} from "@/types/myType";

export const FETECH_TODOS = async (): Promise<TodoData[] | null> => {
    try {
        const response = await fetch(`http://localhost:12345/todo`);
        if (!response.ok) throw new Error("조회실패");
        const books = await response.json();
        return await books;
    } catch (error) {
        console.log(error);
        return null;
    }
}
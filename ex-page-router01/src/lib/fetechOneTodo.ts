import type {TodoData} from '@/types/myType';

export const FETCH_TODO_ONE = async (id:number): Promise<TodoData | null> => {
    try {
        const response = await fetch(`http://localhost:12345/todo/${id}`);
        console.log(response);
        if (!response.ok) throw new Error("");
        const books = await response.json();
        return await books;
    } catch (error) {
        console.log(error);
        return null;
    }
}
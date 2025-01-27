import {BookData} from "@/types/myType";

export const FETCH_BOOKS = async (): Promise<BookData[] | null> => {
    try {
        const response = await fetch('http://localhost:12345/book');
        if (!response.ok) throw new Error("");
        const books = await response.json();
        return await books;
    } catch (error) {
        console.log(error);
        return null;
    }
}
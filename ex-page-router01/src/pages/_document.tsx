import {Html, Head, Main, NextScript} from "next/document";
import Link from "next/link";

export default function Document() {
    return (
        <Html lang="kr">
            <Head/>
            <body className="antialiased">
            <div className="w-[1120px] mx-auto">
                <div className={`flex w-full justify-center gap-10 mt-5`}>
                    <ul>
                        <li><Link href="/books" className="hover:underline">Books</Link></li>
                    </ul>
                    <ul>
                        <li><Link href="/todo" className="hover:underline">Todo</Link></li>
                    </ul>
                    <ul>
                        <li><Link href="/mypage" className="hover:underline">MyPage</Link></li>
                    </ul>
                </div>
                <div className={`flex flex-col items-center justify-center bg-gray-200 mt-5 min-h-52 shadow-amber-100 shadow`}>
                    <Main/>
                </div>
            </div>
            <NextScript/>
            </body>
        </Html>
    )
        ;
}

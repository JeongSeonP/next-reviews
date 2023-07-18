import type { ReactNode } from "react";
import NavBar from "../components/NavBar";
import "./globals.css";
import { exo2, orbitron } from "./fonts";

interface LayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en" className={`${orbitron.variable} ${exo2.variable}`}>
      <body className="flex flex-col px-4 py-2 min-h-screen bg-orange-50">
        <header>
          <NavBar />
        </header>
        <main className="grow py-3">{children}</main>
        <footer className="text-center text-xs border-t py-3 ">
          Game data and images courtesy of{" "}
          <a
            href="https://rawg.io/"
            target="_blank"
            className="text-orange-800 hover:underline"
          >
            RAWG
          </a>
        </footer>
      </body>
    </html>
  );
}

//Link
// prefetching했다가 보여주기 때문에 SPA처럼 동작 - client-side navigation 동작
//link대신 a태그사용시 full html문서를 받아와서 보여준다 (multi page application)
// (Link는 prefetch & RSC)
// link를 통해서가 아니고 직접적으로 해당 url로 접근할 경우에는 full html문서를 받아와서 보여준다
//즉, 최초 접근하는 메인페이지는 full html문서받고, 이후 link를 통해 접근하는 페이지는
// client-side navigation을 통해 빠르게 접근할 수 있다, 마치 SPA처럼.

//prefetch
//production 서버에서는 전체 페이지에 대해 메인 페이지가
//로드되고 나서 prefetching하여 실제 해당 페이지로 접근할때
//바로바로 해당 화면을 보여줄 수 있는데,
//이 설정을 false로 할 수 있다.
//prefetching은 RSC형태로 받아온다. (html문서 형식이 아닌)

// layout컴포넌트의 헤더, 푸터같은 공통 컴포넌트는, 페이지가 바뀔때 리렌더 되지 않는다

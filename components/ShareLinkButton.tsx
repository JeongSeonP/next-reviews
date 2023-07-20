"use client";

import { LinkIcon } from "@heroicons/react/20/solid";
import { useState } from "react";

//use client를 선언함으로써 client component로 사용될 것임을 지정한다 (client server functionality를 사용할것이라는)
//이게 없다면 아래 핸들클릭에서 에러가 난다
//정적인페이지가 아니라면 꼭 선언해야함
//선언된 컴포넌트 하위 컴포넌트들도 client component로 간주된다
//꼭 필요한 컴포넌트레벨에 선언하는게 좋다 ex) 리뷰페이지자체에 말고, 링크버튼컴포넌트에 선언.

//use client를 선언하고 클라이언트 컴포넌트가 만들어지면,
//처음 화면이 렌더링될때 서버에서 생성된 정적인 html문서가 사용되고, 이것과
//이벤트 핸들러가 포함된 자바스크립트코드가 딸린, client side에서 생성되는 요소와 merge되는것이
//hydrated이다

export default function ShareLinkButton() {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    navigator.clipboard.writeText(window.location.href);
    setClicked(true);
    setTimeout(() => setClicked(false), 1500);
  };

  console.log("share link button is rendering");
  return (
    <button
      onClick={handleClick}
      className="flex gap-1 items-center border px-2 py-1 rounded text-slate-500 text-sm hover:bg-orange-100 hover-text-slate-700"
    >
      <LinkIcon className="h-4 w-4" />
      {clicked ? "Link copied!" : "Share Link"}
    </button>
  );
}

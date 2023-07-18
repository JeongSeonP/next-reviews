import { readFile } from "node:fs/promises";
import { marked } from "marked";
import Heading from "@/components/Heading";

export default async function StardewValleyPage() {
  const text = await readFile("./content/reviews/stardew-valley.md", "utf8");
  const html = marked(text, { headerIds: false, mangle: false });
  return (
    <>
      <Heading>Stardew Valley</Heading>
      <img
        src="/images/stardew-valley.jpg"
        alt=""
        width="640"
        height="360"
        className="rounded mb-2"
      />
      <article dangerouslySetInnerHTML={{ __html: html }} />
    </>
  );
}

//RSC라서 서버에서 렌더되기때문에 md파일을 async await으로 읽어들여서 화면에 넣어줄 수 있다
//marked 라이브러리로 md파일을 html로 변환 해줌

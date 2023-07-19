import { readdir, readFile } from "node:fs/promises";
import matter from "gray-matter";
import { marked } from "marked";

export async function getReview(slug: string) {
  const text = await readFile(`./content/reviews/${slug}.md`, "utf8");
  const {
    content,
    data: { title, date, image },
  } = matter(text);
  const body = marked(content, { headerIds: false, mangle: false });
  return { slug, title, date, image, body };
}

//RSC라서 서버에서 렌더되기때문에 md파일을 async await으로 읽어들여서 화면에 넣어줄 수 있다
//marked 라이브러리로 md파일을 html로 변환 해줌
//tailwind prose classname으로 md에 적용된 글자스타일을 화면에 적용시켜줄 수 있다
//gray-matter로 md파일의 font-matter안의 정보를 data로, 본문을 content로 추출할 수 있다

export async function getReviews() {
  const files = await readdir("./content/reviews");
  const slugs = await getSlugs();

  const reviews = [];
  for (const slug of slugs) {
    const review = await getReview(slug);
    reviews.push(review);
  }
  reviews.sort((a, b) => b.date.localeCompare(a.date));
  return reviews;
}

export async function getFeaturedReview() {
  const reviews = await getReviews();
  return reviews[0];
}

export async function getSlugs() {
  const files = await readdir("./content/reviews");
  return files
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.slice(0, -".md".length));
}

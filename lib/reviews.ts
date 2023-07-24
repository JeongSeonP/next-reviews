import { readdir, readFile } from "node:fs/promises";
import matter from "gray-matter";
import { marked } from "marked";
import qs from "qs";

const CMS_URL = "http://localhost:1337";

export async function getReview(slug: string) {
  //$eq == equals
  //withCount 는 토탈갯수정보 수취여부. 필요없으니 false
  const { data } = await await fetchReviews({
    filters: { slug: { $eq: slug } },
    fields: ["slug", "title", "subtitle", "publishedAt", "body"],
    populate: { image: { fields: ["url"] } },
    pagination: { pageSize: 1, withCount: false },
  });
  if (data.length === 0) {
    return null;
  }
  const item = data[0];
  return {
    ...toReview(item),
    body: marked(item.attributes.body, { headerIds: false, mangle: false }),
  };

  //아래는 로컬파일 불러올때 사용한 함수
  // const text = await readFile(`./content/reviews/${slug}.md`, "utf8");
  // const {
  //   content,
  //   data: { title, date, image },
  // } = matter(text);
  // const body = marked(content, { headerIds: false, mangle: false });
  // return { slug, title, date, image, body };
}

//RSC라서 서버에서 렌더되기때문에 md파일을 async await으로 읽어들여서 화면에 넣어줄 수 있다
//marked 라이브러리로 md파일을 html로 변환 해줌
//tailwind prose classname으로 md에 적용된 글자스타일을 화면에 적용시켜줄 수 있다
//gray-matter로 md파일의 front-matter안의 정보를 data로, 본문을 content로 추출할 수 있다

export async function getReviews(pageSize: number) {
  const { data } = await fetchReviews({
    fields: ["slug", "title", "subtitle", "publishedAt"],
    populate: { image: { fields: ["url"] } },
    sort: ["publishedAt:desc"],
    pagination: { pageSize },
  });

  return data.map(toReview);
  //image에 대한 url에 strapi서버주소를 넣어줌으로서,
  //브라우저가 localhost:3000에서 찾지 않도록 절대경로를 지정해준것
  // ("url": "/uploads/hades_2018_bff8e28a82.jpg" attr안에 url이 이런형태기때문에)

  //아래는 로컬파일 불러올때 사용한 함수
  // const slugs = await getSlugs();
  // const reviews = [];
  // for (const slug of slugs) {
  //   const review = await getReview(slug);
  //   reviews.push(review);
  // }
  // reviews.sort((a, b) => b.date.localeCompare(a.date));
  // return reviews;
}

// export async function getFeaturedReview() {
//   const reviews = await getReviews();
//   return reviews[0];
// }

export async function getSlugs() {
  const { data } = await fetchReviews({
    fields: ["slug"],
    sort: ["publishedAt:desc"],
    pagination: { pageSize: 100 },
  });
  return data.map((item) => item.attributes.slug);

  // const files = await readdir("./content/reviews");
  // return files
  //   .filter((file) => file.endsWith(".md"))
  //   .map((file) => file.slice(0, -".md".length));
}
//readdir메서드로 해당 경로의 파일명을 가져올 수 있다.

//readdir, readFile과 같은 node:fs 의 메서드들은 서버사이드컴포넌트에서만 사용할 수 있다

async function fetchReviews(parameters) {
  const url =
    `${CMS_URL}/api/reviews?` +
    qs.stringify(parameters, { encodeValuesOnly: true });
  const response = await fetch(url, {
    // cache: "no-store",
    next: {
      revalidate: 60, //seconds
    },
  });
  if (!response.ok) {
    throw new Error(`CMS returned ${response.status} for ${url}`);
  }
  return await response.json();
}
//fetch 에 옵션설정하여 revalidate할 수 있다
//cache: 'no-store' -> response를 캐시에 저장하지 않는 설정(=dynamic page =forced dynamic과 마찬가지)
//next: {revalidate: 60, //seconds}, -> 페이지에서 revalidate선언한것과동일

function toReview(item) {
  const { attributes } = item;
  return {
    slug: attributes.slug,
    title: attributes.title,
    subtitle: attributes.subtitle,
    date: attributes.publishedAt.slice(0, "yyyy-mm-dd".length),
    image: CMS_URL + attributes.image.data.attributes.url,
  };
}

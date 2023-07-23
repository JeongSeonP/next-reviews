import { writeFileSync } from "node:fs";
import qs from "qs";

//기본값으로 이미지는 제외되기 때문에 populate=* 쿼리 추가하여 이미지도 받을수있음
// const url = "http://localhost:1337/api/reviews?populate=*";
const url =
  "http://localhost:1337/api/reviews" +
  "?" +
  qs.stringify(
    {
      fields: ["slug", "title", "subtitle", "publishedAt"],
      populate: { image: { fields: ["url"] } },
      sort: ["publishedAt:desc"],
      pagination: { pageSize: 6 },
    },
    { encodeValuesOnly: true }
  );

//qs.stringify로 원하는 response값만 받을 수 있도록 설정함 (url쿼리스트링을 설정해준다)
//encodeValuesOnly는 파라미터말고 value값만 encoding하겠다는 옵션임
// console.log(url);
//http://localhost:1337/api/reviews?fields[0]=slug&fields[1]=title&fields[2]=subtitle&fields[3]=publishedAt&populate[image][fields][0]=url&sort[0]=publishedAt%3Adesc&pagination[pageSize]=6

const response = await fetch(url);
const body = await response.json();

const formatted = JSON.stringify(body, null, 2);
const file = "scripts/strapi-response.json";
writeFileSync(file, formatted, "utf8");

//response를 file로 생성시켜주는 writeFileSync 메서드 사용

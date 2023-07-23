import Image from "next/image";
import Heading from "@/components/Heading";
import ShareLinkButton from "@/components/ShareLinkButton";
import { getReview, getSlugs } from "@/lib/reviews";

// dynamic route를 사용하지만 static page로서 사용하기위해
//(production server에서 새로고침해서 리렌더하지 않도록)
// next.js에게 해당 slug를 array안에 object형태로 알려주는 것이다
export async function generateStaticParams() {
  const slugs = await getSlugs();
  return slugs.map((slug) => ({ slug }));
}

//dynamic metadata
//param으로 받는 slug로 title받아서 metadata title로 지정
export async function generateMetadata({ params: { slug } }) {
  const { title } = await getReview(slug);
  return {
    title: title,
  };
}

export default async function ReviewPage({ params: { slug } }) {
  const { title, subtitle, date, image, body } = await getReview(slug);
  console.log("review page is rendering");
  return (
    <>
      <Heading>{title}</Heading>
      <p className="font-semibold pb-3">{subtitle}</p>
      <div className="flex gap-3 items-baseline">
        <p className="italic pb-2">{date}</p>
        <ShareLinkButton />
      </div>

      <Image
        src={image}
        priority
        alt=""
        width="640"
        height="360"
        className="rounded mb-2"
      />
      <article
        dangerouslySetInnerHTML={{ __html: body }}
        className="prose prose-slate max-w-screen-sm"
      />
    </>
  );
}

//dynamic route
//[slug]로 review/anypath 를 받게 되고 anypath를 [slug]하위 페이지의 컴포넌트에서 props의 params의 slug로 받을 수 있다

//next/image에서 가져오는 Image태그를 사용하면
//webp타입으로 변환되면서 이미지사이즈 줄여주고,
//img태그 사용할때는 strapi서버(1337)url그대로 였는데 Image로 사용할때는
//로컬서버(3000)의 주소로 변환된다(원래의 url에서 image를 받아서 webp로 변환하여 next.js서버 캐시에 저장)
//마치 프록시처럼 동작하게됨
//한번 캐시에 저장한 이후로 같은 url의 이미지 요청받으면 캐시에 저장한걸로 리턴
//위와같이 동작하기때문에 static page로서는 이 기능을 사용할 수 없다
//이를 사용하기위해 next.config.js에 관련 설정 필요(어디서가져오는image에 대해 변환할지)

//lazy Loading
//Image태그 사용함으로써 lazy loading도 가능하게된다
//그런데 페이지 상단에 한개의 이미지만 있는 경우, lazy loading이 적절하지 않을때
//priority prop을 주면 lazy loading하지 않고 fetchpriority="high" 가 된다

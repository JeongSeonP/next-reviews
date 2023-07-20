import Heading from "@/components/Heading";
import ShareLinkButton from "@/components/ShareLinkButton";
import { getReview } from "@/lib/reviews";

//dynamic metadata
//param으로 받는 slug로 title받아서 metadata title로 지정
export async function generateMetadata({ params: { slug } }) {
  const { title } = await getReview(slug);
  return {
    title: title,
  };
}

export default async function ReviewPage({ params: { slug } }) {
  const { title, date, image, body } = await getReview(slug);
  console.log("review page is rendering");
  return (
    <>
      <Heading>{title}</Heading>
      <div className="flex gap-3 items-baseline">
        <p className="italic pb-2">{date}</p>
        <ShareLinkButton />
      </div>

      <img
        src={image}
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

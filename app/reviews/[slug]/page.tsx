import Heading from "@/components/Heading";
import { getReview } from "@/lib/reviews";

export default async function ReviewPage({ params: { slug } }) {
  const { title, date, image, body } = await getReview(slug);

  return (
    <>
      <Heading>{title}</Heading>
      <p className="italic pb-2">{date}</p>
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

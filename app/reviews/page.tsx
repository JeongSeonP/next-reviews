import Link from "next/link";
import Heading from "@/components/Heading";
import { getReviews, getSlugs } from "@/lib/reviews";

// dynamic route를 사용하지만 static page로서 사용하기위해
//(production server에서 새로고침해서 리렌더하지 않도록)
// next.js에게 해당 slug를 array안에 object형태로 알려주는 것이다
export async function generateStaticParams() {
  const slugs = await getSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function ReviewsPage() {
  const reviews = await getReviews();
  return (
    <>
      <Heading>Reviews</Heading>
      <ul className="flex flex-row flex-wrap gap-3">
        {reviews.map((review) => (
          <li
            key={review.slug}
            className="bg-white border w-80 rounded shadow hover:shadow-xl"
          >
            <Link href={`/reviews/${review.slug}`}>
              <img
                src={review.image}
                alt=""
                width="320"
                height="180"
                className="rounded-t "
              />
              <h2 className="font-semibold font-orbitron text-center py-1">
                {review.title}
              </h2>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

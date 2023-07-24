import Image from "next/image";
import Link from "next/link";
import Heading from "@/components/Heading";
import { getReviews } from "@/lib/reviews";

//revalidate변수지정하여 data캐시타임(seconds기준) 지정
//아래와 같이 30이면 캐시된 데이터는 60초동안 유효한 것이다
//유효시간이 지난 뒤 요청시, revalidate은 백그라운드에서 진행되고 화면에 바로 렌더되진 않는다
//이후 두번째 요청을 했을때, 준비된 화면을 보여준다
//아래와 같이 선언하는 것 말고, fetch할때 하는 방법이 있다
//fetchReviews함수에서 해당 방법 해본다
// export const revalidate = 60;

export default async function ReviewsPage() {
  const reviews = await getReviews(6);
  return (
    <>
      <Heading>Reviews</Heading>
      <ul className="flex flex-row flex-wrap gap-3">
        {reviews.map((review, index) => (
          <li
            key={review.slug}
            className="bg-white border w-80 rounded shadow hover:shadow-xl"
          >
            <Link href={`/reviews/${review.slug}`}>
              <Image
                src={review.image}
                priority={index === 0}
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

// 이미지가 여러개일때, 제일 첫번째 이미지에만 lazy loading되지 않게 priority prop을 줬다

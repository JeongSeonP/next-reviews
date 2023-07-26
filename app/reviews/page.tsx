import Image from "next/image";
import Link from "next/link";
import Heading from "@/components/Heading";
import { getReviews } from "@/lib/reviews";
import PaginationBar from "@/components/PaginationBar";

export const metadata = {
  title: "reviews",
};

//revalidate변수지정하여 data캐시타임(seconds기준) 지정
//아래와 같이 30이면 캐시된 데이터는 60초동안 유효한 것이다
//유효시간이 지난 뒤 요청시, revalidate은 백그라운드에서 진행되고 화면에 바로 렌더되진 않는다
//이후 두번째 요청을 했을때, 준비된 화면을 보여준다
//아래와 같이 선언하는 것 말고, fetch할때 하는 방법이 있다
//fetchReviews함수에서 해당 방법 해본다
// export const revalidate = 60;

const PAGE_SIZE = 6;

export default async function ReviewsPage({ searchParams }) {
  const page = parsePageParam(searchParams.page);
  const { reviews, pageCount } = await getReviews(PAGE_SIZE, page);
  return (
    <>
      <Heading>Reviews</Heading>
      <PaginationBar page={page} pageCount={pageCount} />
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

function parsePageParam(paramValue: string) {
  if (paramValue) {
    const page = parseInt(paramValue);
    if (isFinite(page) && page > 0) {
      return page;
    }
  }
  return 1;
}

// 이미지가 여러개일때, 제일 첫번째 이미지에만 lazy loading되지 않게 priority prop을 줬다

//query string parameters
//Link로 http://localhost:3000/reviews?page=2 와 같이 url이 변경된다면
// 해당 컴포넌트의 props는 아래와 같이 업데이트 된다
// 즉 query string은 searchParams로 받을 수 있다
//{ params: {}, searchParams: { page: '2' } }

//serchParams는 값이 무엇일지 미리 알수 없는 dynamic API이기때문에
//이걸 사용하면 dynamic rendering을 하게 된다 (static page가 아닌)
//(dynamic 설정이 기본값인 auto이기때문에. 그리고 이 경우 처음엔 다이내믹으로
//렌더하지만 이후엔 캐시된 데이터 사용함. forced dynamic일 경우는매번 새로 요청)

// 만약 reviews/page/1 이런식의 url이라면 generateStaticParams에 가능한 페이지를 넘겨서
// static page로 만들수도 있긴하겠으나 이 경우 게임 장르등을 sort해서 pagination한다고 했을때
//가능한 모든 path에 대해 static param으로 넘기는 것은 현실적으로 적당하지않을것

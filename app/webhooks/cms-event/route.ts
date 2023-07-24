//API route
//app폴더 아래 페이지라우트 만들듯이 임의의 이름으로 폴더를 만들고
// 하위에 route.js(ts) 만들면 html이 아닌 json과 같은 데이터를 return하는 component가 된다

import { CACHE_TAG_REVIEWS } from "@/lib/reviews";
import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
//NextRequest, NextResponse는 standard fetch api인 Request, Response에서 extends됨

//http메서드를 활용할수있고, 해당 메서드를 대문자로 하여 함수 만든다
// export function GET() {
//   return NextResponse.json({ healty: true });
// }
//이렇게 만들고 http://localhost:3000/webhooks/cms-event로 접근하면 아래 응답이 반환됨
// {
//   "healty": true
// }

// strapi의 webhook이, 설정한 변동사항 발생시 http://localhost:3000/webhooks/cms-event로
//아래 함수를 호출하게 되는 것 - 따로 데이터리턴할 필욘 없어서 리턴값에 new Response instance만들고 body엔 null넣어줌
export async function POST(request) {
  const payload = await request.json();
  //strapi에서 호출한 변경된 항목이 review일경우에
  if (payload.model === "review") {
    revalidateTag(CACHE_TAG_REVIEWS);
    //revalidateTag메서드 사용하여 원하는 tag에 대한 데이터를 revalidate해줌
    //이후 해당 페이지에 대한 요청이 있을때, 실제 리렌더링이 발생된다
    //(시간을 기준으로한 revalidate과 동일한 방식)
  }

  console.log("payload:", payload);
  return new Response(null, { status: 204 }); //204 means no content
}

//여기서 반환되는 값은 일반 사용자를 위한게 아니라 관리자 등에게 활용되는것으로
//strapi의 경우 webhook을 사용하여 CMS에 변동사항이 있음을 우리에게 api route를 활용하여 알려줄수있는것

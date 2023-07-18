import Link from "next/link";
import Heading from "@/components/Heading";

export default function HomePage() {
  console.log("homepage is rendering");
  return (
    <>
      <Heading>Indie Gamer</Heading>
      <p className="pb-3">Only the best indie games, reviewed for you.</p>
      <div className="bg-white w-80 sm:w-full border rounded shadow hover:shadow-xl">
        <Link
          href={"/reviews/stardew-valley"}
          className="flex flex-col sm:flex-row"
        >
          <img
            src="/images/stardew-valley.jpg"
            alt=""
            width="320"
            height="180"
            className="rounded-t sm:rounded-l sm:rounded-r-none"
          />
          <h2 className="font-semibold font-orbitron text-center py-1 sm:px-2">
            Stardew Valley
          </h2>
        </Link>
      </div>
    </>
  );
}

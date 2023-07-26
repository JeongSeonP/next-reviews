import Link from "next/link";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

export default function PaginationBar({ page, pageCount }) {
  return (
    <div className="flex gap-2 pb-3">
      <PaginationLink href={`/reviews?page=${page - 1}`} enabled={page > 1}>
        <ChevronLeftIcon className="h-5 w-5" />
        <span className="sr-only">Previous Page</span>
      </PaginationLink>

      <span>
        Page {page} of {pageCount}
      </span>
      <PaginationLink
        href={`/reviews?page=${page + 1}`}
        enabled={page < pageCount}
      >
        <ChevronRightIcon className="h-5 w-5" />
        <span className="sr-only">Next Page</span>
      </PaginationLink>
    </div>
  );
}

function PaginationLink({ children, href, enabled }) {
  if (!enabled) {
    return (
      <span className="cursor-not-allowed border rounded text-slate-300 text-sm ">
        {children}
      </span>
    );
  }
  return (
    <Link
      href={href}
      className=" border rounded text-slate-500 text-sm hover:bg-orange-100 hover-text-slate-700"
    >
      {children}
    </Link>
  );
}

import { format } from "date-fns";
import { Link } from "react-router-dom";

export const BlogPreviewCard = ({
  bannerUrl,
  blogId,
  title,
  createdAt,
  draft,
  index,
  desc,
}: TBlogSnippet & { index: number }) => {
  const publishedDate = format(new Date(createdAt), "dd mmm yyyy, hh:mm aa.");
  return (
    <div className="flex gap-10 border-b mb-6 max-md:px-4 pb-6 items-center">
      {draft ? (
        <h1 className="text-4xl sm:text-7xl font-bold text-gray-300">
          {index < 10 ? "0" + index : index}
        </h1>
      ) : (
        <img
          //   src="/404.jpg"
          src={bannerUrl}
          alt="Blog Banner Image"
          className="max-md:hidden w-28 h-28 flex-none bg-gray-100 object-cover"
        />
      )}

      <div className="flex flex-col justify-between w-full min-w-[300px]">
        <div>
          <Link
            to={`${blogId}`}
            className="text-xl font-semibold text-gray-800 hover:underline transition-all line-clamp-3 mb-2"
          >
            {title}
          </Link>
          <p className="line-clamp-5 text-gray-600/80 text-sm">
            {draft ? desc : `Published: ${publishedDate}`}
          </p>
        </div>
        <div className="flex gap-6 mt-3">
          <Link
            to={`editor/${blogId}`}
            className="underline hover:opacity-90 hover:no-underline py-2 pr-4"
          >
            Edit
          </Link>
          <button
            onClick={() => {}}
            className="underline hover:opacity-90 hover:no-underline py-2 cursor-pointer text-red-500"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

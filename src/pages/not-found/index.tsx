import { Link } from "react-router-dom";

import notFoundImg from "../../assets/404.jpg";

export const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <img
        src={notFoundImg}
        alt="404-not-found"
        className="max-w-[400px] h-auto"
      />
      <p className="text-sm mt-4">
        The page you are looking for was not found. Try{" "}
        <Link
          to="/dashboard/blogs"
          className="font-semibold underline hover:text-sky-600"
        >
          the Home Page.
        </Link>
      </p>
    </div>
  );
};

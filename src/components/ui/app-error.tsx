export const AppError = ({ error }: { error?: string }) => {
  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold">
        Error:
        <span className="italic text-red-600 ml-3 font-normal">
          {error || "Something unexpected happened, please try again."}
        </span>
      </h3>
    </div>
  );
};

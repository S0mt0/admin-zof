import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onMouseEnter?: (page?: number) => void;
  maxVisiblePages?: number;
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  onMouseEnter,
  maxVisiblePages = 5,
}: PaginationProps) => {
  if (totalPages <= 1) return null;

  const getVisiblePages = () => {
    const half = Math.floor(maxVisiblePages / 2);
    let start = Math.max(1, currentPage - half);
    const end = Math.min(totalPages, start + maxVisiblePages - 1);

    // Adjust if we're at the end
    if (end - start + 1 < maxVisiblePages) {
      start = Math.max(1, end - maxVisiblePages + 1);
    }

    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="flex items-center justify-center gap-2.5 my-10">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={cn(
          "px-3 py-1 rounded disabled:opacity-20 hover:bg-green-700/10 transition disabled:hover:bg-transparent",
          currentPage === 1 ? "cursor-default" : "cursor-pointer"
        )}
        aria-label="Go to previous page"
      >
        &lt; Previous
      </button>

      {/* First Page */}
      {!visiblePages.includes(1) && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className={cn(
              "px-3 py-1 rounded cursor-pointer hover:bg-green-700/10 transition",
              currentPage === 1 && "bg-green-700 text-white hover:bg-green-700"
            )}
          >
            1
          </button>
          {visiblePages[0] > 2 && <span className="px-2">...</span>}
        </>
      )}

      {/* Visible Pages */}
      {visiblePages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          onMouseEnter={onMouseEnter ? () => onMouseEnter(page) : undefined}
          className={cn(
            "px-3 py-1 rounded cursor-pointer hover:bg-green-700/10 transition",
            currentPage === page && "bg-green-700 text-white hover:bg-green-700"
          )}
        >
          {page}
        </button>
      ))}

      {/* Last Page */}
      {!visiblePages.includes(totalPages) && (
        <>
          {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
            <span className="px-2">...</span>
          )}
          <button
            onClick={() => onPageChange(totalPages)}
            onMouseEnter={
              onMouseEnter ? () => onMouseEnter(totalPages) : undefined
            }
            className={cn(
              "px-3 py-1 rounded cursor-pointer hover:bg-green-700/10 transition",
              currentPage === totalPages &&
                "bg-green-700 text-white hover:bg-green-700"
            )}
          >
            {totalPages}
          </button>
        </>
      )}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        onMouseEnter={onMouseEnter ? () => onMouseEnter() : undefined}
        disabled={currentPage === totalPages}
        className={cn(
          "px-3 py-1 rounded disabled:opacity-20 cursor-pointer hover:bg-green-700/10 transition disabled:hover:bg-transparent",
          currentPage === totalPages && "cursor-default"
        )}
        aria-label="Go to next page"
      >
        Next &gt;
      </button>
    </div>
  );
};

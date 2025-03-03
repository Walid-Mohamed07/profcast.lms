import { FC, useCallback, useEffect, useState } from 'react';

interface Props {
  pageCount: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination: FC<Props> = ({
  pageCount,
  currentPage = 1,
  onPageChange,
}) => {
  const [pages, setPages] = useState<number[]>([]);
  const [activePage, setActivePage] = useState<number>(currentPage);

  const buildPages = useCallback(() => {
    let start = 1;
    let end = Math.min(pageCount, 5) + 1;

    if (pageCount > 5) {
      if (activePage > 3 && activePage < pageCount - 2) {
        start = activePage - 1;
        end = activePage + 2;
      } else if (activePage >= pageCount - 2) {
        start = pageCount - 4;
        end = pageCount + 1;
      }
    }

    const newPages = [];
    for (let i = start; i < end; i++) {
      newPages.push(i);
    }

    setPages(newPages);
  }, [activePage, pageCount]);

  const onChange = (page: number) => {
    setActivePage(page);
    onPageChange(page);
    window.scrollTo(0, 0);
  };

  const isActive = (page: number) =>
    activePage === page
      ? 'bg-[#6eb2f8] text-white font-bold'
      : 'bg-[#1b6dc1] hover:bg-gray-600';

  useEffect(() => {
    buildPages();
  }, [activePage, buildPages]);

  return (
    <ul className="flex-center gap-0.5">
      {pageCount > 5 && activePage > 3 && (
        <button
          onClick={() => onChange(1)}
          className="w-8 h-8 bg-[#1b6dc1] text-white text-xs ltr:rounded-l-md rtl:rounded-r-md hover:bg-gray-600"
        >
          1
        </button>
      )}
      {pageCount > 5 && activePage > 3 && (
        <span className="w-8 h-8 bg-[#0f7cec] text-white text-xs flex items-center justify-center">
          ...
        </span>
      )}
      {pages.map((page) => (
        <button
          className={`w-8 h-8 bg-[#1b6dc1] text-white text-xs ${isActive(page)} hover:bg-gray-600 duration-300`}
          onClick={() => onChange(page)}
          key={page}
        >
          {page}
        </button>
      ))}
      {pageCount > 5 && activePage < pageCount - 2 && (
        <span className="w-8 h-8 bg-[#0f7cec] text-white text-xs flex items-center justify-center">
          ...
        </span>
      )}
      {pageCount > 5 && activePage < pageCount - 2 && (
        <button
          className={`w-8 h-8 bg-[#1b6dc1] text-white text-xs ${isActive(pageCount)} ltr:rounded-r-md rtl:rounded-l-md hover:bg-gray-600`}
          onClick={() => onChange(pageCount)}
        >
          {pageCount}
        </button>
      )}
    </ul>
  );
};

export default Pagination;

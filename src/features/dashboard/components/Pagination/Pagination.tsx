'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import styles from './Pagination.module.css';

interface PaginationProps {
  count: number;
}

const Pagination = ({ count }: PaginationProps) => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const page = searchParams.get('page') || '1';

  const params = new URLSearchParams(searchParams);
  const ITEM_PER_PAGE = 2;

  const hasPrev = ITEM_PER_PAGE * (parseInt(page as string) - 1) > 0;
  const hasNext =
    ITEM_PER_PAGE * (parseInt(page as string) - 1) + ITEM_PER_PAGE < count;

  const handleChangePage = (type: 'prev' | 'next') => {
    if (type === 'prev') {
      params.set('page', (parseInt(page as string) - 1).toString());
    } else {
      params.set('page', (parseInt(page as string) + 1).toString());
    }
    replace(`${pathname}?${params}`);
  };

  return (
    <div className={styles.container}>
      <button
        className={styles.button}
        disabled={!hasPrev}
        onClick={() => handleChangePage('prev')}
      >
        Previous
      </button>
      <button
        className={styles.button}
        disabled={!hasNext}
        onClick={() => handleChangePage('next')}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;

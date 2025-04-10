/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { MdSearch } from 'react-icons/md';
import { useDebouncedCallback } from 'use-debounce';
import styles from './Search.module.css';

const Search = ({ placeholder }: any) => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const handleSearch = useDebouncedCallback((e) => {
    const params = new URLSearchParams(searchParams);

    params.set('page', '1');

    if (e.target.value) {
      if (e.target.value.length > 2) {
        params.set('q', e.target.value);
      }
    } else {
      params.delete('q');
    }
    replace(`${pathname}?${params}`);
  }, 300);

  return (
    <div className={styles.container}>
      <MdSearch />
      <input
        type="text"
        placeholder={placeholder}
        className={styles.input}
        onChange={handleSearch}
      />
    </div>
  );
};

export default Search;

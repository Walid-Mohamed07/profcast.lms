'use server';

import { cookies } from 'next/headers';

export const getLocalizedKeyServer = async <T>(
  key: keyof T,
): Promise<keyof T | `${string & keyof T}_ar`> => {
  const currentLanguage = (await cookies()).get('NEXT_LOCALE')?.value;

  if (currentLanguage === 'ar') {
    return `${String(key)}_ar` as `${string & keyof T}_ar`;
  }

  return key;
};

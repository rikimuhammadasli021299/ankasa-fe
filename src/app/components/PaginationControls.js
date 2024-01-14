'use client';

import { FC } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function PaginationControls({ hasNextPage, hasPrevPage, rows }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = searchParams.get('page') ?? '1';
  const per_page = searchParams.get('per_page') ?? '5';
  const passenger = searchParams.get('passenger') ?? '5';

  return (
    <div className='flex gap-2 self-center'>
      <button
        className={`${
          !hasPrevPage ? 'bg-slate-300 text-[#000]' : 'bg-blue text-white hover:bg-white hover:text-[#2395ff] border hover:border-[#2395ff] hover:shadow-[0px_8px_10px_0px_rgba(35,149,255,0.30)]'
        } text-[12px] font-medium p-2 rounded-md`}
        disabled={!hasPrevPage}
        onClick={() => {
          router.push(`/find-ticket?page=${Number(page) - 1}&per_page=${per_page}&passenger=${passenger}`);
        }}
      >
        prev page
      </button>

      <div>
        {page} / {Math.ceil(rows / Number(per_page))}
      </div>

      <button
        className={`${
          !hasNextPage ? 'bg-slate-300 text-[#000]' : 'bg-blue text-white hover:bg-white hover:text-[#2395ff] border hover:border-[#2395ff] hover:shadow-[0px_8px_10px_0px_rgba(35,149,255,0.30)]'
        } text-[12px] font-medium p-2 rounded-md`}
        disabled={!hasNextPage}
        onClick={() => {
          router.push(`/find-ticket?page=${Number(page) + 1}&per_page=${per_page}&passenger=${passenger}`);
        }}
      >
        next page
      </button>
    </div>
  );
}

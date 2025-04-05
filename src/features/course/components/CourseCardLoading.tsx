import { FC } from 'react';

interface CourseCardLoadingProps {
  count: number;
}

const CourseCardLoading: FC<CourseCardLoadingProps> = ({ count }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="w-full md:w-52 p-1 animate-pulse rounded shadow-xl border-[1px]"
        >
          <div className="bg-gray-800/20 rounded w-full h-28">
            <div className="rounded-[4px]"></div>
          </div>
          <section className="flex flex-col gap-3 p-4">
            <div>
              <div className="bg-gray-800/20 rounded h-8 w-full"></div>
            </div>
            <div>
              <div className="bg-gray-800/20 rounded h-8 w-[75%]"></div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="bg-gray-800/20 rounded h-4 w-[50%]"></div>
              <div className="bg-gray-800/20 rounded h-4 w-[50%]"></div>
            </div>
          </section>
        </div>
      ))}
    </>
  );
};

export default CourseCardLoading;

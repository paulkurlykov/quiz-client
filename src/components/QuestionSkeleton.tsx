import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function QuestionSkeleton() {
  return (
    <li className="grid cursor-pointer grid-cols-1 gap-4 rounded-middle bg-backgroundSecondary px-8 py-8 text-textDark shadow-dark transition-all hover:-translate-y-1 dark:text-textLight">
      <h1 className="border-b border-l-0 border-r-0 border-t-0 border-solid border-gray-500 text-secondary last:border-b-0">
        <Skeleton />
      </h1>

      <div className="flex flex-col border-b border-l-0 border-r-0 border-t-0 border-solid border-gray-500 last:border-b-0">
        <p className="text-[1rem]">
          <Skeleton count={4} style={{marginBottom: ".9rem"}} />
        </p>
      </div>

      <div className="grid grid-cols-[1fr,_auto] grid-rows-1 items-end justify-center justify-between border-b border-l-0 border-r-0 border-t-0 border-solid border-gray-500 last:border-b-0">
        <span className="font-secondary text-[1rem] uppercase">
          <Skeleton />
        </span>
      </div>
    </li>
  );
}

export default QuestionSkeleton;

type Props = {
    pagesNum: number;
    currentPage: number;
    previousPage: () => void;
    nextPage: () => void;
    goToPage: (page: number) => void;
}

function Pagination({ pagesNum, currentPage, previousPage, nextPage, goToPage }: Props) {
  return (
    <div className="flex gap-8">

    {/* back-button */}
      <button onClick={previousPage} className="border-1 flex rounded-mini border border-solid border-borderPrimary px-6 py-2">
        back
      </button>

   {/* number-buttons */}
      {Array.from({ length: pagesNum }, (_, i) => i + 1).map((num) => (
        <button
          key={num}
          className={`font-secondary self-center text-primary border-1 flex rounded-mini border border-solid px-6 py-3 ${currentPage === num ? "border-2 border-accent" : "border-borderPrimary"} hover:border-accent hover:border-2`}
          onClick={() => goToPage(num)}
        >
          {num}
        </button>
      ))}

   {/* next-button */}
      <button onClick={nextPage} className="border-1 flex rounded-mini border border-solid border-borderPrimary px-6 py-2">
        next
      </button>
    </div>
  );
}

export default Pagination;

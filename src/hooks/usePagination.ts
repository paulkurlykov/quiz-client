import { useSearchParams } from "react-router-dom";



type Props = {
    totalItems: number;
    itemsPerPage: number;
}

function usePagination(totalItems: number, itemsPerPage: number = 10) {
    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));
    const pagesNum = Math.ceil(totalItems / itemsPerPage);

    function nextPage() {
        const next = currentPage === pagesNum ? currentPage : currentPage + 1;
        searchParams.set("page", next.toString());
        setSearchParams(searchParams);
    }
    function previousPage() {
        const prev = currentPage === 1 ? currentPage : currentPage - 1;
        searchParams.set("page", prev.toString());
        setSearchParams(searchParams);
    }

    function goToPage(page: number) {
        searchParams.set("page", page.toString());
        setSearchParams(searchParams);
    }

    return {currentPage, pagesNum, nextPage, previousPage, goToPage};

}

export default usePagination;
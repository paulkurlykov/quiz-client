import { IoSearch } from "react-icons/io5";
import Spinner from "./Spinner";
import { IinitialState } from "@/context/context.types";
import { Dispatch, SetStateAction, ChangeEvent } from "react";



function SearchBar({status, query, setQuery}: {status: IinitialState['status'], query: string, setQuery: Dispatch<SetStateAction<string>>}) {
    return (
        <div 
        className="w-full relative flex" >
            <input 
        onChange={(e:ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
        value={query}
            className="w-full rounded-[2rem] border border-borderPrimary border-solid px-8 h-[6rem] bg-inputBackgroundSearchBar text-textColor transition-colors" type="text" />
            {status === "loading" ? <Spinner/> : <IoSearch className="absolute top-[25%] right-10 text-textColor text-[3rem] cursor-pointer hover:text-accentHover active:scale-95 transition-all" />}
        </div>
    )
}

export default SearchBar

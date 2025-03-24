import { Question } from "@/types/main.types";

  
  const useSearch = (arr: Question[], query: string) => {


    return arr.filter((q) => {
        for (const key of Object.keys(q) as (keyof Question)[]) {
          if (String(q[key]).includes(query)) return q;
        }
      });
  }

  export default useSearch;


  
  
  
  

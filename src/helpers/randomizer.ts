import { Question } from "@/types/main.types";

const randomizer = (arr: Question[]) => {
    const result: Question[] = [];
    do {
      const randomNumber = Math.floor(Math.random() * arr.length);
      if (result.includes(arr[randomNumber])) continue;
      result.push(arr[randomNumber]);
    
    } while (result.length < arr.length);
  
    return result;
  };

  export default randomizer;
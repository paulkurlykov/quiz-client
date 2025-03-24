import { useEffect, useState } from "react";
import { Question } from "@/types/main.types";

function useRandomizer(arr: Question[], isRandomized: boolean) {
  const [randomizedArr, setRandomizedArr] = useState<Question[]>(arr);

  useEffect(() => {
    const randomizer = (arr: Question[]) => {
      const result: Question[] = [];
      do {
        const randomNumber = Math.floor(Math.random() * arr.length);
        if (result.includes(arr[randomNumber])) continue;
        result.push(arr[randomNumber]);
      } while (result.length < arr.length);

      return result;
    };

    if (isRandomized) {
      setRandomizedArr(randomizer(arr));
    } else {
      setRandomizedArr(arr.sort((a, b) => +a._id - +b._id));
    }
  }, [arr, isRandomized]);

  return randomizedArr;
}

export default useRandomizer;

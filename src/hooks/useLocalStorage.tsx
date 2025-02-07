import {useState} from "react";

export function useLocalStorage<T extends object, K extends keyof T>(keyName: string, initialValue?: T) {


    // getting data
    const [storedValue, setStoredValue] = useState<T | undefined>(() => {
        try {
          const item = localStorage.getItem(keyName);
          return item ? (JSON.parse(item) as T) : undefined;
        } catch (error) {
          console.error("Ошибка при чтении из localStorage:", error);
          return initialValue;
        }
      });

      // setting data
      const setValue = (value: T) => {
        try {
          localStorage.setItem(keyName, JSON.stringify(value));
          setStoredValue(value);
        } catch (error) {
          console.error("Ошибка при записи в localStorage:", error);
        }
      };

      // getting property
      const getProperty = (property: K): T[K] | undefined => {
        return storedValue?.[property];
      };

    return {storedValue, setValue, getProperty};
}
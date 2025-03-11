import { createContext, ReactNode, useState, useContext, useEffect } from "react";


interface DarkModeContextState {
  isDark: boolean;
  toggleDarkMode: () => void;
}

const DarkModeContext = createContext<DarkModeContextState | undefined>(
  undefined,
);

export const DarkModeProvider = ({ children }: { children: ReactNode }) => {
  const [isDark, setIsDark] = useState<boolean>(false);

  useEffect(() => {
    if (isDark) {
        document.documentElement.classList.add("dark");
        document.documentElement.classList.remove("light");
    } else {
        document.documentElement.classList.add("light");
        document.documentElement.classList.remove("dark");
    }
}, [isDark]);

  const toggleDarkMode = () => {
    setIsDark((state) => !state);
  };

  return (
    <DarkModeContext.Provider
      value={{ isDark, toggleDarkMode }}
    >
        {children}
    </DarkModeContext.Provider>
  );
};

export const useDarkModeContext = () => {
    const context = useContext(DarkModeContext);
    if (!context) {
      throw new Error('useDarkModeContext must be used within a DarkModeProvider');
    }
    return context;
  };
import { useState, createContext, useEffect, ReactNode } from 'react';
import IThemeContext from '../interfaces/IThemeContext'

interface Props {
  children: ReactNode
}

function getTheme(): "dark-theme" | "light-theme" {
  
  const theme = localStorage.getItem("theme");
  
  if (!theme) {
    localStorage.setItem("theme", "dark-theme");
    return "dark-theme";
  } 
  else {
    return theme as "dark-theme" | "light-theme";
  }
}

export const ThemeContext = createContext<IThemeContext | string>("without Theme provider");

export function ThemeProvider ({children}: Props) {
  
  const [theme, setTheme] = useState<"dark-theme" | "light-theme">(getTheme())

  useEffect(() => {
    const refreshTheme = () => {
      localStorage.setItem("theme", theme);
    };
    refreshTheme();
  }, [theme]);
  
  function toggleTheme() {
    if (theme === "dark-theme") {
      setTheme("light-theme");
    } else {
      setTheme("dark-theme");
    }
  }

  return (
    <ThemeContext.Provider value={
      {
        theme,
        setTheme,
        toggleTheme,
      }
    }>
      {children}
    </ThemeContext.Provider>
  )
}
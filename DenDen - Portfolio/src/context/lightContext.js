import React, { createContext, useContext, useEffect, useState } from 'react'
import { setDocumentMode, toggleChange } from '../functions/lightModeFunctions'

const ThemeContext = createContext()
const SetThemeContext = createContext()

export function useTheme() {
    return useContext(ThemeContext)
}

export function useSetTheme() {
    return useContext(SetThemeContext)
}


export function ThemeProvider({children}) {

    const [lightMode, setlightMode] = useState(undefined)
    
    useEffect(() => {
        const islightMode = localStorage.getItem("lightMode");
        var root = document.querySelector(":root")
        if (islightMode === "true") {
          document.body.style.backgroundColor = `var(--light_base)`;
          root.style.setProperty("--scrollbar_color", 'var(--light_base)')
          document.body.classList.remove("dark_mode");
          localStorage.setItem("lightMode", true);
          setlightMode(true)
        } else if (islightMode === "false") {
          document.body.style.backgroundColor = `var(--dark_base)`;
          root.style.setProperty("--scrollbar_color", 'var(--dark_base)')
          document.body.classList.add("dark_mode");
          localStorage.setItem("lightMode", false);
          setlightMode(false)
        } else {
          document.body.style.backgroundColor = `var(--light_base)`;
          root.style.setProperty("--scrollbar_color", 'var(--light_base)')
          document.body.classList.remove("dark_mode");
          localStorage.setItem("lightMode", true);
          setlightMode(true)
        }
        // document.body.style.transition = 'backgroundColor 5s ease'
    }, [lightMode])

    return (
        <ThemeContext.Provider value={lightMode}>
            <SetThemeContext.Provider value={() => toggleChange(lightMode, setlightMode)}>
                {children}
            </SetThemeContext.Provider>
        </ThemeContext.Provider>
    )
}
import React, { createContext } from 'react'
import { isMobile, needRotation } from '../functions/mobileFunctions'

export function screenType() {
    var value = "window"
    
    if (isMobile()) {
        value = "mobile"
    } else if (needRotation()) {
        value = "rotate"
    }
    
    return value
}

export const screenTypeContext = createContext(screenType())
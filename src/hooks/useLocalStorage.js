import { useEffect, useState } from "react"

export const useLocalStorage =(key, initialValue) => {
    const [value, setValue]= useState(() => {
        const jsonValue = localStorage.getItem(key)
        if(jsonValue != null) return JSON.parse(jsonValue)
        
        if(typeof initialValue === "function"){
            return( initialValue())
        }
        else{
            return initialValue
        }
    })

    

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    },[value, setValue])

    return [value, setValue]
}

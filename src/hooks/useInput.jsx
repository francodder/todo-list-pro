import { useState, useEffect } from "react"

export const useInput = (defaultValue = '') => {

    const [inputValue, setInputValue] = useState(defaultValue)
    const [isInputValid, setIsInputValid] = useState(false)

    useEffect(() => {
        setIsInputValid(inputValue.length > 0)
    }, [inputValue])

    const handleInputChange = ({target}) => {
        setInputValue(target.value.trim())
    }

    const resetInput = (value = '') => {
        setInputValue(value)
    }


    return [ inputValue, isInputValid, handleInputChange, resetInput ]
}

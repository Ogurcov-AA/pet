import { useState, useEffect } from 'react'

export const useKeyboardControls = () => {
    const [keys, setKeys] = useState({
        KeyW: false,
        KeyS: false,
        KeyA: false,
        KeyD: false,
        Space: false,
        ShiftLeft: false
    })

    useEffect(() => {
        const handleKeyDown = (event) => {
            setKeys(prev => ({ ...prev, [event.code]: true }))
        }

        const handleKeyUp = (event) => {
            setKeys(prev => ({ ...prev, [event.code]: false }))
        }

        window.addEventListener('keydown', handleKeyDown)
        window.addEventListener('keyup', handleKeyUp)

        return () => {
            window.removeEventListener('keydown', handleKeyDown)
            window.removeEventListener('keyup', handleKeyUp)
        }
    }, [])

    return keys
}

export default useKeyboardControls
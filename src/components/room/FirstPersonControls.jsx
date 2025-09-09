import { useFrame, useThree } from '@react-three/fiber'
import { useKeyboardControls } from './useKeyboardControls' // ваш хук для управления

export function FirstPersonControls() {
    const { camera } = useThree()
    const keys = useKeyboardControls()

    useFrame((_, delta) => {
        const speed = 5 * delta

        if (keys['KeyW']) camera.translateZ(-speed)
        if (keys['KeyS']) camera.translateZ(speed)
        if (keys['KeyA']) camera.translateX(-speed)
        if (keys['KeyD']) camera.translateX(speed)
    })

    return null
}
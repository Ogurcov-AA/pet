import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three'
import { useFrame } from '@react-three/fiber'
import {useRef} from "react";
import floor from '../../assets/textures/floor.png'
import wall from '../../assets/textures/wall.png'
import window from '../../assets/textures/window.png'
import EditorScene from "./EditorScene";

function Room() {
    const controlsRef = useRef()

    // Загрузка текстур
    const floorTexture = useLoader(TextureLoader, floor)
    const wallTexture = useLoader(TextureLoader, wall)
    const windowTexture = useLoader(TextureLoader, window)

    useFrame(() => {
        // Логика перемещения и взаимодействия
    })

    return (
        <>
            {/* Пол */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
                <planeGeometry args={[40, 40]} />
                <meshStandardMaterial map={floorTexture} />
            </mesh>

            {/* Стены */}
            <mesh position={[-10, 2.5, -20]}>
                <boxGeometry args={[20, 5, 0.5]} />
                <meshStandardMaterial map={wallTexture} />
            </mesh>

            <mesh position={[10, 2.5, -20]}>
                <boxGeometry args={[20, 5, 0.5]} />
                <meshStandardMaterial map={windowTexture} />
            </mesh>

            <mesh position={[10, 2.5, -10, 90]}>
                <boxGeometry args={[10, 5, 1]} />
                <meshStandardMaterial map={wallTexture} />
            </mesh>
            {/*<mesh position={[0, 2.5, -10]}>*/}
            {/*    <boxGeometry args={[20, 5, 0.5]} />*/}
            {/*    <meshStandardMaterial map={wallTexture} />*/}
            {/*</mesh>*/}

            {/*<mesh position={[0, 2.5, -10]}>*/}
            {/*    <boxGeometry args={[20, 5, 0.5]} />*/}
            {/*    <meshStandardMaterial map={wallTexture} />*/}
            {/*</mesh>*/}

            {/* Дополнительные элементы комнаты */}
            {/*<mesh position={[3, 0.5, -3]}>*/}
            {/*    <boxGeometry args={[1, 1, 1]} />*/}
            {/*    <meshStandardMaterial color="#8B4513" />*/}
            {/*</mesh>*/}
        </>
    )
}
export default Room
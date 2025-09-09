import { useState, useRef, useCallback } from 'react'
import {Canvas, useFrame, useThree} from '@react-three/fiber'
import { OrbitControls, TransformControls, Text } from '@react-three/drei'
import * as THREE from 'three'

// Хук для управления элементами
const useSceneEditor = () => {
    const [objects, setObjects] = useState([])
    const [selectedObject, setSelectedObject] = useState(null)
    const [mode, setMode] = useState('translate') // 'translate', 'rotate', 'scale'

    const addObject = useCallback((type, position = [0, 0, 0]) => {
        const id = Date.now().toString()
        const newObject = {
            id,
            type,
            position,
            rotation: [0, 0, 0],
            scale: [1, 1, 1],
            color: `#${Math.floor(Math.random() * 16777215).toString(16)}`
        }

        setObjects(prev => [...prev, newObject])
        setSelectedObject(id)
        return newObject
    }, [])

    const removeObject = useCallback((id) => {
        setObjects(prev => prev.filter(obj => obj.id !== id))
        if (selectedObject === id) setSelectedObject(null)
    }, [selectedObject])

    const updateObject = useCallback((id, updates) => {
        setObjects(prev => prev.map(obj =>
            obj.id === id ? { ...obj, ...updates } : obj
        ))
    }, [])

    return {
        objects,
        selectedObject,
        mode,
        setMode,
        setSelectedObject,
        addObject,
        removeObject,
        updateObject
    }
}

// Компонент объекта
function SceneObject({ object, isSelected, onSelect }) {
    const meshRef = useRef()

    const getGeometry = () => {
        switch (object.type) {
            case 'cube': return <boxGeometry args={[1, 1, 1]} />
            case 'sphere': return <sphereGeometry args={[0.5, 32, 32]} />
            case 'cylinder': return <cylinderGeometry args={[0.5, 0.5, 1, 32]} />
            case 'plane': return <planeGeometry args={[2, 2]} />
            default: return <boxGeometry args={[1, 1, 1]} />
        }
    }

    return (
        <mesh
            ref={meshRef}
            position={object.position}
            rotation={object.rotation}
            scale={object.scale}
            onClick={(e) => {
                e.stopPropagation()
                onSelect(object.id)
            }}
        >
            {getGeometry()}
            <meshStandardMaterial
                color={object.color}
                transparent={true}
                opacity={isSelected ? 0.8 : 1}
            />
        </mesh>
    )
}

// Контроллер трансформации
function TransformController({ object, mode, onUpdate }) {
    const transformRef = useRef()
    const { camera, gl } = useThree()

    useFrame(() => {
        if (transformRef.current && transformRef.current.object) {
            const object = transformRef.current.object
            const position = new THREE.Vector3()
            const rotation = new THREE.Euler()
            const scale = new THREE.Vector3()

            object.getWorldPosition(position)
            object.getWorldRotation(rotation)
            object.getWorldScale(scale)

            onUpdate({
                position: [position.x, position.y, position.z],
                rotation: [rotation.x, rotation.y, rotation.z],
                scale: [scale.x, scale.y, scale.z]
            })
        }
    })

    if (!object) return null

    return (
        <TransformControls
            ref={transformRef}
            mode={mode}
            object={gl.domElement}
            camera={camera}
        >
            <mesh
                position={object.position}
                rotation={object.rotation}
                scale={object.scale}
                visible={false}
            >
                <boxGeometry args={[1, 1, 1]} />
            </mesh>
        </TransformControls>
    )
}

// Основной компонент сцены
function EditorScene() {
    const {
        objects,
        selectedObject,
        mode,
        setMode,
        setSelectedObject,
        addObject,
        updateObject
    } = useSceneEditor()

    const handleCanvasClick = (e) => {
        if (e.delta === 0) { // Клик без перетаскивания
            setSelectedObject(null)
        }
    }

    return (
        <>
            <Canvas camera={{ position: [5, 5, 5], fov: 75 }} onClick={handleCanvasClick}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />

                {/* Сетка для ориентира */}
                <gridHelper args={[20, 20]} />

                {/* Объекты сцены */}
                {objects.map(object => (
                    <SceneObject
                        key={object.id}
                        object={object}
                        isSelected={selectedObject === object.id}
                        onSelect={setSelectedObject}
                    />
                ))}

                {/* Контроллер трансформации для выбранного объекта */}
                {selectedObject && (
                    <TransformController
                        object={objects.find(obj => obj.id === selectedObject)}
                        mode={mode}
                        onUpdate={(updates) => updateObject(selectedObject, updates)}
                    />
                )}

                <OrbitControls makeDefault />
            </Canvas>

            {/* Панель управления */}
            <div style={{
                position: 'absolute',
                top: 10,
                left: 10,
                background: 'rgba(0,0,0,0.8)',
                padding: '10px',
                borderRadius: '5px',
                color: 'white'
            }}>
                <h3>Редактор сцены</h3>

                <div style={{ marginBottom: '10px' }}>
                    <button onClick={() => addObject('cube', [0, 0.5, 0])}>Добавить куб</button>
                    <button onClick={() => addObject('sphere', [0, 0.5, 0])}>Добавить сферу</button>
                    <button onClick={() => addObject('cylinder', [0, 0.5, 0])}>Добавить цилиндр</button>
                </div>

                <div style={{ marginBottom: '10px' }}>
                    <label>Режим: </label>
                    <select value={mode} onChange={(e) => setMode(e.target.value)}>
                        <option value="translate">Перемещение</option>
                        <option value="rotate">Вращение</option>
                        <option value="scale">Масштаб</option>
                    </select>
                </div>

                {selectedObject && (
                    <div>
                        <p>Выбран: {selectedObject}</p>
                        <button onClick={() => setSelectedObject(null)}>Снять выделение</button>
                    </div>
                )}

                <div>
                    <p>Объектов: {objects.length}</p>
                </div>
            </div>
        </>
    )
}

export default EditorScene
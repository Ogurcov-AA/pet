import { Canvas } from '@react-three/fiber'
import { PointerLockControls, Sky } from '@react-three/drei'
import { Physics } from '@react-three/cannon'
import Room from './components/room/Room'
import {FirstPersonControls} from './components/room/FirstPersonControls'
import EditorScene from "./components/room/EditorScene";

function App() {
    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            {/*<EditorScene/>*/}
            <Canvas>
                <Sky sunPosition={[100, 100, 20]} />
                <ambientLight intensity={0.3} />
                <pointLight position={[10, 10, 10]} />

                <Physics>
                    <PointerLockControls />
                    <FirstPersonControls />
                    <Room />
                </Physics>
            </Canvas>
        </div>
    )
}

export default App;

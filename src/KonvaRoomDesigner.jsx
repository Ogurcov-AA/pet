import React, { useState } from 'react';
import { Stage, Layer, Rect, Circle, Text } from 'react-konva';
import './konvaStyle.css'


const KonvaRoomDesigner = () => {
    const [objects, setObjects] = useState([]);
    const [selectedId, setSelectedId] = useState(null);

    const addTable = (x, y) => {
        const newTable = {
            id: Date.now(),
            type: 'table',
            x: x - 50,
            y: y - 50,
            width: 100,
            height: 100,
            color: '#8B4513',
            rotation: 0
        };
        setObjects([...objects, newTable]);
    };

    const addChair = (x, y) => {
        const newChair = {
            id: Date.now(),
            type: 'chair',
            x: x - 25,
            y: y - 25,
            width: 50,
            height: 50,
            color: '#CD853F',
            rotation: 0
        };
        setObjects([...objects, newChair]);
    };

    return (
        <div>
            <Stage
                width={800}
                height={600}
                onMouseDown={(e) => {
                    if (e.target === e.target.getStage()) {
                        setSelectedId(null);
                        return;
                    }
                    setSelectedId(e.target.id());
                }}
            >
                <Layer>
                    {/* Комната */}
                    <Rect
                        x={50}
                        y={50}
                        width={700}
                        height={500}
                        fill="#f0f0f0"
                        stroke="#333"
                        strokeWidth={2}
                    />

                    {/* Объекты */}
                    {objects.map(obj => (
                        obj.type === 'table' ? (
                            <Rect
                                key={obj.id}
                                id={obj.id.toString()}
                                x={obj.x}
                                y={obj.y}
                                width={obj.width}
                                height={obj.height}
                                fill={obj.color}
                                stroke={selectedId === obj.id.toString() ? 'blue' : 'black'}
                                strokeWidth={selectedId === obj.id.toString() ? 4 : 2}
                                cornerRadius={10}
                                draggable
                            />
                        ) : (
                            <Circle
                                key={obj.id}
                                id={obj.id.toString()}
                                x={obj.x + obj.width/2}
                                y={obj.y + obj.height/2}
                                radius={obj.width/2}
                                fill={obj.color}
                                stroke={selectedId === obj.id.toString() ? 'blue' : 'black'}
                                strokeWidth={selectedId === obj.id.toString() ? 4 : 2}
                                draggable
                            />
                        )
                    ))}
                </Layer>
            </Stage>

            <div className="controls">
                <button onClick={() => addTable(200, 200)}>Добавить стол</button>
                <button onClick={() => addChair(300, 300)}>Добавить стул</button>
            </div>
        </div>
    );
};

export default KonvaRoomDesigner;
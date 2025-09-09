// RoomShapeEditor.jsx
import React, { useState, useRef, useCallback } from 'react';

const RoomShapeEditor = ({ onShapeChange }) => {
    const [walls, setWalls] = useState([
        { id: 1, points: [{ x: 100, y: 100 }, { x: 400, y: 100 }] },
        { id: 2, points: [{ x: 400, y: 100 }, { x: 400, y: 300 }] },
        { id: 3, points: [{ x: 400, y: 300 }, { x: 100, y: 300 }] },
        { id: 4, points: [{ x: 100, y: 300 }, { x: 100, y: 100 }] }
    ]);

    const [isDrawing, setIsDrawing] = useState(false);
    const [currentWall, setCurrentWall] = useState(null);
    const [selectedPoint, setSelectedPoint] = useState(null);
    const [selectedWall, setSelectedWall] = useState(null);
    const svgRef = useRef();

    // Добавление новой стены
    const startDrawing = useCallback((e) => {
        if (selectedPoint || selectedWall) return;

        const rect = svgRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        setIsDrawing(true);
        setCurrentWall({
            id: Date.now(),
            points: [{ x, y }, { x, y }]
        });
    }, [selectedPoint, selectedWall]);

    const updateDrawing = useCallback((e) => {
        if (!isDrawing || !currentWall) return;

        const rect = svgRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        setCurrentWall(prev => ({
            ...prev,
            points: [prev.points[0], { x, y }]
        }));
    }, [isDrawing, currentWall]);

    const finishDrawing = useCallback(() => {
        if (!isDrawing || !currentWall) return;

        // Проверяем, что стена имеет достаточную длину
        const start = currentWall.points[0];
        const end = currentWall.points[1];
        const distance = Math.sqrt(Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2));

        if (distance > 20) {
            setWalls(prev => [...prev, currentWall]);
            onShapeChange?.([...walls, currentWall]);
        }

        setIsDrawing(false);
        setCurrentWall(null);
    }, [isDrawing, currentWall, walls, onShapeChange]);

    // Редактирование точек
    const handlePointMouseDown = useCallback((e, wallId, pointIndex) => {
        e.stopPropagation();
        setSelectedPoint({ wallId, pointIndex });
        setSelectedWall(null);
    }, []);

    const handlePointMouseMove = useCallback((e) => {
        if (!selectedPoint) return;

        const rect = svgRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        setWalls(prev => prev.map(wall => {
            if (wall.id === selectedPoint.wallId) {
                const newPoints = [...wall.points];
                newPoints[selectedPoint.pointIndex] = { x, y };
                return { ...wall, points: newPoints };
            }
            return wall;
        }));
    }, [selectedPoint]);

    const handlePointMouseUp = useCallback(() => {
        setSelectedPoint(null);
        onShapeChange?.(walls);
    }, [walls, onShapeChange]);

    // Удаление стены
    const deleteWall = useCallback((wallId) => {
        const newWalls = walls.filter(wall => wall.id !== wallId);
        setWalls(newWalls);
        onShapeChange?.(newWalls);
        setSelectedWall(null);
    }, [walls, onShapeChange]);

    // Добавление точки в стену
    const addPointToWall = useCallback((e, wall) => {
        e.stopPropagation();

        const rect = svgRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Находим ближайший сегмент для вставки точки
        let minDistance = Infinity;
        let insertIndex = -1;

        for (let i = 0; i < wall.points.length - 1; i++) {
            const p1 = wall.points[i];
            const p2 = wall.points[i + 1];

            const distance = pointToLineDistance({ x, y }, p1, p2);
            if (distance < minDistance && distance < 20) {
                minDistance = distance;
                insertIndex = i + 1;
            }
        }

        if (insertIndex !== -1) {
            const newPoints = [...wall.points];
            newPoints.splice(insertIndex, 0, { x, y });

            setWalls(prev => prev.map(w =>
                w.id === wall.id ? { ...w, points: newPoints } : w
            ));
            onShapeChange?.(walls.map(w =>
                w.id === wall.id ? { ...w, points: newPoints } : w
            ));
        }
    }, [walls, onShapeChange]);

    // Вспомогательная функция: расстояние от точки до линии
    const pointToLineDistance = (point, lineStart, lineEnd) => {
        const A = point.x - lineStart.x;
        const B = point.y - lineStart.y;
        const C = lineEnd.x - lineStart.x;
        const D = lineEnd.y - lineStart.y;

        const dot = A * C + B * D;
        const len_sq = C * C + D * D;
        let param = -1;

        if (len_sq !== 0) param = dot / len_sq;

        let xx, yy;

        if (param < 0) {
            xx = lineStart.x;
            yy = lineStart.y;
        } else if (param > 1) {
            xx = lineEnd.x;
            yy = lineEnd.y;
        } else {
            xx = lineStart.x + param * C;
            yy = lineStart.y + param * D;
        }

        const dx = point.x - xx;
        const dy = point.y - yy;
        return Math.sqrt(dx * dx + dy * dy);
    };

    return (
        <div className="room-shape-editor">
            <div className="editor-controls">
                <h3>🏗️ Форма помещения</h3>
                <div className="control-buttons">
                    <button
                        onClick={() => setIsDrawing(!isDrawing)}
                        className={isDrawing ? 'active' : ''}
                    >
                        {isDrawing ? '✏️ Рисование...' : '📐 Нарисовать стену'}
                    </button>
                    <button onClick={() => setWalls([])}>
                        🧹 Очистить
                    </button>
                </div>
            </div>

            <div className="editor-canvas">
                <svg
                    ref={svgRef}
                    width="100%"
                    height="500"
                    onMouseDown={startDrawing}
                    onMouseMove={(e) => {
                        updateDrawing(e);
                        handlePointMouseMove(e);
                    }}
                    onMouseUp={() => {
                        finishDrawing();
                        handlePointMouseUp();
                    }}
                    onMouseLeave={() => {
                        if (isDrawing) finishDrawing();
                        if (selectedPoint) handlePointMouseUp();
                    }}
                    style={{
                        border: '2px dashed #ccc',
                        background: '#f8f9fa',
                        cursor: isDrawing ? 'crosshair' : selectedPoint ? 'grabbing' : 'default'
                    }}
                >
                    {/* Сетка */}
                    <defs>
                        <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#e0e0e0" strokeWidth="1"/>
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />

                    {/* Стены */}
                    {walls.map((wall) => (
                        <g key={wall.id}>
                            {/* Линия стены */}
                            <polyline
                                points={wall.points.map(p => `${p.x},${p.y}`).join(' ')}
                                fill="none"
                                stroke={selectedWall?.id === wall.id ? "#007bff" : "#495057"}
                                strokeWidth="4"
                                strokeLinecap="round"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedWall(wall);
                                    setSelectedPoint(null);
                                }}
                                onDoubleClick={(e) => addPointToWall(e, wall)}
                                style={{ cursor: 'pointer' }}
                            />

                            {/* Точки стены */}
                            {wall.points.map((point, index) => (
                                <circle
                                    key={index}
                                    cx={point.x}
                                    cy={point.y}
                                    r={selectedPoint?.wallId === wall.id && selectedPoint.pointIndex === index ? 8 : 6}
                                    fill={selectedPoint?.wallId === wall.id && selectedPoint.pointIndex === index ? "#007bff" : "#28a745"}
                                    stroke="#fff"
                                    strokeWidth="2"
                                    style={{ cursor: 'move' }}
                                    onMouseDown={(e) => handlePointMouseDown(e, wall.id, index)}
                                />
                            ))}
                        </g>
                    ))}

                    {/* Текущая рисуемая стена */}
                    {currentWall && (
                        <polyline
                            points={currentWall.points.map(p => `${p.x},${p.y}`).join(' ')}
                            fill="none"
                            stroke="#dc3545"
                            strokeWidth="3"
                            strokeDasharray="5,5"
                        />
                    )}

                    {/* Вспомогательные линии */}
                    {selectedPoint && (
                        <g>
                            <line
                                x1={walls.find(w => w.id === selectedPoint.wallId)?.points[selectedPoint.pointIndex]?.x || 0}
                                y1={0}
                                x2={walls.find(w => w.id === selectedPoint.wallId)?.points[selectedPoint.pointIndex]?.x || 0}
                                y2="100%"
                                stroke="rgba(0, 123, 255, 0.3)"
                                strokeWidth="1"
                                strokeDasharray="2,2"
                            />
                            <line
                                x1={0}
                                y1={walls.find(w => w.id === selectedPoint.wallId)?.points[selectedPoint.pointIndex]?.y || 0}
                                x2="100%"
                                y2={walls.find(w => w.id === selectedPoint.wallId)?.points[selectedPoint.pointIndex]?.y || 0}
                                stroke="rgba(0, 123, 255, 0.3)"
                                strokeWidth="1"
                                strokeDasharray="2,2"
                            />
                        </g>
                    )}
                </svg>
            </div>

            {/* Панель управления выбранной стеной */}
            {selectedWall && (
                <div className="wall-properties">
                    <h4>Стена #{selectedWall.id}</h4>
                    <p>Точек: {selectedWall.points.length}</p>
                    <p>Длина: {Math.sqrt(
                        Math.pow(selectedWall.points[1].x - selectedWall.points[0].x, 2) +
                        Math.pow(selectedWall.points[1].y - selectedWall.points[0].y, 2)
                    ).toFixed(1)}px</p>
                    <button
                        onClick={() => deleteWall(selectedWall.id)}
                        className="btn-danger"
                    >
                        🗑️ Удалить стену
                    </button>
                </div>
            )}

            <div className="editor-help">
                <h4>ℹ️ Инструкция:</h4>
                <ul>
                    <li>📐 <strong>Клик</strong> - начать рисовать стену</li>
                    <li>🖱️ <strong>Перетащите точку</strong> - изменить положение</li>
                    <li>⚡ <strong>Двойной клик</strong> на стену - добавить точку</li>
                    <li>🎯 <strong>Клик</strong> на стену - выбрать для редактирования</li>
                </ul>
            </div>
        </div>
    );
};

export default RoomShapeEditor;
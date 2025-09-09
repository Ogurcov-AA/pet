// AdvancedRoomDesigner.jsx
import React, { useState, useRef } from 'react';
import RoomShapeEditor from './room/RoomShapeEditor';
import {
    RealisticRoundTable,
    RealisticChair,
    RealisticSofa,
    RealisticBarCounter,
    RealisticArmchair
} from '../components/object/RealisticRoundTable';
import './AdvancedRoomDesigner.css';

const AdvancedRoomDesigner = () => {
    const [furniture, setFurniture] = useState([]);
    const [walls, setWalls] = useState([]);
    const [selectedTool, setSelectedTool] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);
    const [activeTab, setActiveTab] = useState('furniture');
    const roomRef = useRef();

    const furnitureTypes = [
        {
            id: 'round-table',
            name: 'Дубовый стол',
            component: RealisticRoundTable,
            width: 140,
            height: 140,
            category: 'столы'
        },
        {
            id: 'chair',
            name: 'Кожаный стул',
            component: RealisticChair,
            width: 70,
            height: 90,
            category: 'стулья'
        },
        {
            id: 'sofa',
            name: 'Кожаный диван',
            component: RealisticSofa,
            width: 220,
            height: 100,
            category: 'диваны'
        },
        {
            id: 'bar-counter',
            name: 'Барная стойка',
            component: RealisticBarCounter,
            width: 200,
            height: 80,
            category: 'бар'
        },
        {
            id: 'armchair',
            name: 'Бархатное кресло',
            component: RealisticArmchair,
            width: 100,
            height: 100,
            category: 'кресла'
        }
    ];

    const addFurniture = (type, x, y) => {
        const furnitureType = furnitureTypes.find(f => f.id === type);
        if (!furnitureType) return;

        // Проверяем, находится ли точка внутри помещения
        if (!isPointInRoom(x, y)) {
            alert('Мебель можно размещать только внутри помещения!');
            return;
        }

        const newItem = {
            id: Date.now(),
            type: furnitureType.id,
            x: x - furnitureType.width / 2,
            y: y - furnitureType.height / 2,
            width: furnitureType.width,
            height: furnitureType.height,
            rotation: 0
        };

        setFurniture(prev => [...prev, newItem]);
    };

    // Проверка точки на нахождение внутри помещения
    const isPointInRoom = (x, y) => {
        if (walls.length < 3) return true; // Если стены не заданы, разрешаем размещение

        let inside = false;
        for (let i = 0, j = walls.length - 1; i < walls.length; j = i++) {
            const xi = walls[i].points[0].x, yi = walls[i].points[0].y;
            const xj = walls[j].points[0].x, yj = walls[j].points[0].y;

            const intersect = ((yi > y) !== (yj > y)) &&
                (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
            if (intersect) inside = !inside;
        }

        return inside;
    };

    const handleRoomClick = (e) => {
        if (activeTab !== 'furniture' || !selectedTool) return;

        const rect = roomRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        addFurniture(selectedTool, x, y);
    };

    const handleItemClick = (item, e) => {
        e.stopPropagation();
        setSelectedItem(item.id);
    };

    const deleteSelectedItem = () => {
        if (selectedItem) {
            setFurniture(prev => prev.filter(item => item.id !== selectedItem));
            setSelectedItem(null);
        }
    };

    const rotateItem = (degrees = 90) => {
        if (selectedItem) {
            setFurniture(prev => prev.map(item =>
                item.id === selectedItem
                    ? { ...item, rotation: (item.rotation + degrees) % 360 }
                    : item
            ));
        }
    };

    const renderFurnitureItem = (item) => {
        const furnitureType = furnitureTypes.find(f => f.id === item.type);
        if (!furnitureType) return null;

        const Component = furnitureType.component;
        const isSelected = selectedItem === item.id;

        return (
            <div
                key={item.id}
                className="furniture-item"
                style={{
                    left: item.x,
                    top: item.y,
                    width: item.width,
                    height: item.height,
                    transform: `rotate(${item.rotation}deg)`,
                    zIndex: isSelected ? 100 : 1
                }}
                onClick={(e) => handleItemClick(item, e)}
            >
                <Component
                    width={item.width}
                    height={item.height}
                    selected={isSelected}
                />
            </div>
        );
    };

    const categories = [...new Set(furnitureTypes.map(item => item.category))];

    return (
        <div className="advanced-room-designer">
            <div className="designer-header">
                <div className="header-content">
                    <h2>🏛️ Профессиональный конструктор помещений</h2>
                    <div className="stats">
                        <span>📐 Стен: {walls.length}</span>
                        <span>🪑 Мебель: {furniture.length}</span>
                        <span>👥 Места: {furniture.filter(f => f.type === 'chair').length}</span>
                    </div>
                </div>
            </div>

            <div className="tabs">
                <button
                    className={activeTab === 'furniture' ? 'active' : ''}
                    onClick={() => setActiveTab('furniture')}
                >
                    🪑 Мебель
                </button>
                <button
                    className={activeTab === 'shape' ? 'active' : ''}
                    onClick={() => setActiveTab('shape')}
                >
                    📐 Форма помещения
                </button>
            </div>

            <div className="designer-layout">
                {/* Панель инструментов */}
                <div className="tools-panel">
                    {activeTab === 'furniture' ? (
                        <>
                            <h3>🎯 Коллекция мебели</h3>
                            {categories.map(category => (
                                <div key={category} className="category-section">
                                    <h4>{category.toUpperCase()}</h4>
                                    <div className="tools-grid">
                                        {furnitureTypes
                                            .filter(item => item.category === category)
                                            .map(tool => (
                                                <div
                                                    key={tool.id}
                                                    className={`tool-item ${selectedTool === tool.id ? 'selected' : ''}`}
                                                    onClick={() => setSelectedTool(tool.id)}
                                                >
                                                    <div className="tool-preview">
                                                        <tool.component width={50} height={50} />
                                                    </div>
                                                    <span>{tool.name}</span>
                                                </div>
                                            ))}
                                    </div>
                                </div>
                            ))}

                            <div className="action-buttons">
                                <button
                                    onClick={deleteSelectedItem}
                                    disabled={!selectedItem}
                                    className="btn btn-danger"
                                >
                                    🗑️ Удалить
                                </button>
                                <button
                                    onClick={() => rotateItem(90)}
                                    disabled={!selectedItem}
                                    className="btn btn-secondary"
                                >
                                    🔄 Повернуть
                                </button>
                                <button
                                    onClick={() => setFurniture([])}
                                    className="btn btn-warning"
                                >
                                    🧹 Очистить
                                </button>
                            </div>
                        </>
                    ) : (
                        <RoomShapeEditor onShapeChange={setWalls} />
                    )}
                </div>

                {/* Область комнаты */}
                <div
                    ref={roomRef}
                    className="room-area"
                    onClick={handleRoomClick}
                    style={{ cursor: activeTab === 'furniture' && selectedTool ? 'crosshair' : 'default' }}
                >
                    <div className="room-background">
                        {/* Отображение стен */}
                        {walls.length > 0 && (
                            <div className="walls-overlay">
                                <svg width="100%" height="100%">
                                    {walls.map((wall) => (
                                        <polyline
                                            key={wall.id}
                                            points={wall.points.map(p => `${p.x},${p.y}`).join(' ')}
                                            fill="none"
                                            stroke="rgba(73, 80, 87, 0.6)"
                                            strokeWidth="8"
                                            strokeLinecap="round"
                                        />
                                    ))}
                                </svg>
                            </div>
                        )}

                        <div className="perspective-grid"></div>
                        <div className="room-lighting"></div>

                        {/* Мебель в комнате */}
                        {furniture.map(renderFurnitureItem)}
                    </div>
                </div>

                {/* Панель свойств */}
                <div className="properties-panel">
                    <h3>⚙️ Управление</h3>
                    {activeTab === 'furniture' && selectedItem ? (
                        <div className="property-list">
                            <div className="property-item">
                                <label>Объект:</label>
                                <span>{furnitureTypes.find(f => f.id === furniture.find(item => item.id === selectedItem)?.type)?.name}</span>
                            </div>
                            <div className="property-item">
                                <label>Позиция:</label>
                                <span>X: {furniture.find(item => item.id === selectedItem)?.x}, Y: {furniture.find(item => item.id === selectedItem)?.y}</span>
                            </div>
                            <div className="property-item">
                                <label>Поворот:</label>
                                <span>{furniture.find(item => item.id === selectedItem)?.rotation}°</span>
                            </div>
                            <div className="rotation-controls">
                                <button onClick={() => rotateItem(-15)}>↺ -15°</button>
                                <button onClick={() => rotateItem(15)}>↻ +15°</button>
                            </div>
                        </div>
                    ) : activeTab === 'shape' ? (
                        <div className="shape-properties">
                            <h4>Свойства помещения</h4>
                            <p>Количество стен: {walls.length}</p>
                            <p>Общая длина: {walls.reduce((total, wall) => {
                                const length = Math.sqrt(
                                    Math.pow(wall.points[1].x - wall.points[0].x, 2) +
                                    Math.pow(wall.points[1].y - wall.points[0].y, 2)
                                );
                                return total + length;
                            }, 0).toFixed(1)}px</p>
                            <div className="preset-shapes">
                                <h5>📐 Готовые формы:</h5>
                                <button onClick={() => setWalls([
                                    { id: 1, points: [{ x: 100, y: 100 }, { x: 400, y: 100 }] },
                                    { id: 2, points: [{ x: 400, y: 100 }, { x: 400, y: 300 }] },
                                    { id: 3, points: [{ x: 400, y: 300 }, { x: 100, y: 300 }] },
                                    { id: 4, points: [{ x: 100, y: 300 }, { x: 100, y: 100 }] }
                                ])}>
                                    🟦 Прямоугольник
                                </button>
                                <button onClick={() => setWalls([
                                    { id: 1, points: [{ x: 200, y: 100 }, { x: 400, y: 200 }] },
                                    { id: 2, points: [{ x: 400, y: 200 }, { x: 300, y: 400 }] },
                                    { id: 3, points: [{ x: 300, y: 400 }, { x: 100, y: 300 }] },
                                    { id: 4, points: [{ x: 100, y: 300 }, { x: 200, y: 100 }] }
                                ])}>
                                    🔷 Ромб
                                </button>
                                <button onClick={() => setWalls([
                                    { id: 1, points: [{ x: 150, y: 100 }, { x: 350, y: 100 }] },
                                    { id: 2, points: [{ x: 350, y: 100 }, { x: 450, y: 200 }] },
                                    { id: 3, points: [{ x: 450, y: 200 }, { x: 350, y: 300 }] },
                                    { id: 4, points: [{ x: 350, y: 300 }, { x: 150, y: 300 }] },
                                    { id: 5, points: [{ x: 150, y: 300 }, { x: 50, y: 200 }] },
                                    { id: 6, points: [{ x: 50, y: 200 }, { x: 150, y: 100 }] }
                                ])}>
                                    ⬡ Шестиугольник
                                </button>
                            </div>
                        </div>
                    ) : (
                        <p className="no-selection">Выберите объект для редактирования</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdvancedRoomDesigner;
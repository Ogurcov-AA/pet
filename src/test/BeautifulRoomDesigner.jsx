// BeautifulRoomDesigner.jsx
import React, { useState, useRef } from 'react';
import { RoundTable, RectangleTable, Chair, Sofa, BarCounter, Plant } from '../components/object/Funriture';
import './BeautifulRoomDesigner.css';

const BeautifulRoomDesigner = () => {
    const [furniture, setFurniture] = useState([]);
    const [selectedTool, setSelectedTool] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);
    const roomRef = useRef();

    const furnitureTypes = [
        {
            id: 'round-table',
            name: 'Круглый стол',
            component: RoundTable,
            width: 120,
            height: 120,
            color: '#8B4513'
        },
        {
            id: 'rectangle-table',
            name: 'Прямоугольный стол',
            component: RectangleTable,
            width: 160,
            height: 80,
            color: '#A0522D'
        },
        {
            id: 'chair',
            name: 'Стул',
            component: Chair,
            width: 60,
            height: 60,
            color: '#5D4037'
        },
        {
            id: 'sofa',
            name: 'Диван',
            component: Sofa,
            width: 200,
            height: 80,
            color: '#6B8E23'
        },
        {
            id: 'bar-counter',
            name: 'Барная стойка',
            component: BarCounter,
            width: 180,
            height: 60,
            color: '#2F4F4F'
        },
        {
            id: 'plant',
            name: 'Растение',
            component: Plant,
            width: 50,
            height: 70,
            color: '#2E8B57'
        }
    ];

    const addFurniture = (type, x, y) => {
        const furnitureType = furnitureTypes.find(f => f.id === type);
        if (!furnitureType) return;

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

    const handleRoomClick = (e) => {
        if (!selectedTool) return;

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

    const rotateItem = () => {
        if (selectedItem) {
            setFurniture(prev => prev.map(item =>
                item.id === selectedItem
                    ? { ...item, rotation: (item.rotation + 90) % 360 }
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

    return (
        <div className="beautiful-room-designer">
            <div className="designer-header">
                <h2>🎨 Конструктор банкетного зала</h2>
                <div className="stats">
                    Столов: {furniture.filter(f => f.type.includes('table')).length} |
                    Стульев: {furniture.filter(f => f.type === 'chair').length} |
                    Места: {furniture.reduce((acc, item) => acc + (item.type === 'chair' ? 1 : 0), 0)}
                </div>
            </div>

            <div className="designer-layout">
                {/* Панель инструментов */}
                <div className="tools-panel">
                    <h3>🗂️ Коллекция мебели</h3>
                    <div className="tools-grid">
                        {furnitureTypes.map(tool => (
                            <div
                                key={tool.id}
                                className={`tool-item ${selectedTool === tool.id ? 'selected' : ''}`}
                                onClick={() => setSelectedTool(tool.id)}
                                style={{ borderColor: tool.color }}
                            >
                                <div className="tool-preview">
                                    <tool.component width={40} height={40} />
                                </div>
                                <span>{tool.name}</span>
                            </div>
                        ))}
                    </div>

                    <div className="action-buttons">
                        <button
                            onClick={deleteSelectedItem}
                            disabled={!selectedItem}
                            className="btn-danger"
                        >
                            🗑️ Удалить
                        </button>
                        <button
                            onClick={rotateItem}
                            disabled={!selectedItem}
                            className="btn-secondary"
                        >
                            🔄 Повернуть
                        </button>
                        <button
                            onClick={() => setFurniture([])}
                            className="btn-warning"
                        >
                            🧹 Очистить
                        </button>
                    </div>
                </div>

                {/* Область комнаты */}
                <div
                    ref={roomRef}
                    className="room-area"
                    onClick={handleRoomClick}
                >
                    <div className="room-background">
                        <div className="grid-overlay"></div>
                        <div className="room-border"></div>

                        {/* Мебель в комнате */}
                        {furniture.map(renderFurnitureItem)}
                    </div>
                </div>

                {/* Панель свойств */}
                <div className="properties-panel">
                    <h3>⚙️ Свойства</h3>
                    {selectedItem ? (
                        <div className="property-list">
                            <p>📦 {furnitureTypes.find(f => f.id === furniture.find(item => item.id === selectedItem)?.type)?.name}</p>
                            <p>📍 X: {furniture.find(item => item.id === selectedItem)?.x}px</p>
                            <p>📍 Y: {furniture.find(item => item.id === selectedItem)?.y}px</p>
                            <p>🔄 Поворот: {furniture.find(item => item.id === selectedItem)?.rotation}°</p>
                        </div>
                    ) : (
                        <p>Выберите объект для редактирования</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BeautifulRoomDesigner;
// RealisticRoomDesigner.jsx
import React, { useState, useRef } from 'react';
import {
    RealisticRoundTable,
    RealisticChair,
    RealisticSofa,
    RealisticBarCounter,
    RealisticArmchair
} from '../components/object/RealisticRoundTable';
import './RealisticRoomDesigner.css';

const RealisticRoomDesigner = () => {
    const [furniture, setFurniture] = useState([]);
    const [selectedTool, setSelectedTool] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);
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
                className="realistic-furniture-item"
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
        <div className="realistic-room-designer">
            <div className="designer-header">
                <div className="header-content">
                    <h2>🏛️ Профессиональный конструктор интерьера</h2>
                    <div className="stats">
                        <span>🪑 Мебель: {furniture.length}</span>
                        <span>👥 Места: {furniture.filter(f => f.type === 'chair').length}</span>
                        <span>⭐ Выбрано: {selectedItem ? 'Да' : 'Нет'}</span>
                    </div>
                </div>
            </div>

            <div className="designer-layout">
                {/* Панель инструментов */}
                <div className="tools-panel">
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
                </div>

                {/* Область комнаты */}
                <div
                    ref={roomRef}
                    className="room-area"
                    onClick={handleRoomClick}
                >
                    <div className="room-background">
                        <div className="perspective-grid"></div>
                        <div className="room-lighting"></div>

                        {/* Мебель в комнате */}
                        {furniture.map(renderFurnitureItem)}
                    </div>
                </div>

                {/* Панель свойств */}
                <div className="properties-panel">
                    <h3>⚙️ Управление</h3>
                    {selectedItem ? (
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
                    ) : (
                        <p className="no-selection">Выберите объект для редактирования</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RealisticRoomDesigner;
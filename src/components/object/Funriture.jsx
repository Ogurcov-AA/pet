// FurnitureComponents.jsx
import React from 'react';

// Элегантный круглый стол
export const RoundTable = ({ width = 120, height = 120, selected = false, onClick }) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 120 120"
            onClick={onClick}
            style={{ cursor: 'pointer', filter: selected ? 'drop-shadow(0 0 8px #007bff)' : 'none' }}
        >
            <circle cx="60" cy="60" r="50" fill="#8B4513" stroke="#5D4037" strokeWidth="3" />
            <circle cx="60" cy="60" r="45" fill="#A0522D" stroke="#5D4037" strokeWidth="2" />
            <circle cx="60" cy="60" r="40" fill="#CD853F" stroke="#A0522D" strokeWidth="1" />
            <circle cx="60" cy="60" r="35" fill="#DEB887" stroke="#CD853F" strokeWidth="1" />

            {/* Ножки */}
            <rect x="25" y="85" width="10" height="20" fill="#5D4037" rx="2" />
            <rect x="85" y="85" width="10" height="20" fill="#5D4037" rx="2" />
            <rect x="50" y="85" width="20" height="5" fill="#5D4037" rx="1" />

            {/* Декоративные элементы */}
            <circle cx="60" cy="60" r="5" fill="#5D4037" />
            <circle cx="40" cy="40" r="2" fill="#A0522D" />
            <circle cx="80" cy="40" r="2" fill="#A0522D" />
            <circle cx="40" cy="80" r="2" fill="#A0522D" />
            <circle cx="80" cy="80" r="2" fill="#A0522D" />
        </svg>
    );
};

// Стильный прямоугольный стол
export const RectangleTable = ({ width = 160, height = 80, selected = false, onClick }) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 160 80"
            onClick={onClick}
            style={{ cursor: 'pointer', filter: selected ? 'drop-shadow(0 0 8px #007bff)' : 'none' }}
        >
            {/* Столешница */}
            <rect x="10" y="10" width="140" height="60" fill="#8B4513" stroke="#5D4037" strokeWidth="3" rx="8" />
            <rect x="15" y="15" width="130" height="50" fill="#A0522D" stroke="#5D4037" strokeWidth="1" rx="5" />

            {/* Ножки */}
            <rect x="20" y="65" width="12" height="15" fill="#5D4037" rx="2" />
            <rect x="128" y="65" width="12" height="15" fill="#5D4037" rx="2" />
            <rect x="60" y="65" width="40" height="5" fill="#5D4037" rx="1" />

            {/* Деревянная текстура */}
            <line x1="20" y1="25" x2="140" y2="25" stroke="#5D4037" strokeWidth="1" strokeOpacity="0.3" />
            <line x1="20" y1="35" x2="140" y2="35" stroke="#5D4037" strokeWidth="1" strokeOpacity="0.3" />
            <line x1="20" y1="45" x2="140" y2="45" stroke="#5D4037" strokeWidth="1" strokeOpacity="0.3" />
            <line x1="20" y1="55" x2="140" y2="55" stroke="#5D4037" strokeWidth="1" strokeOpacity="0.3" />
        </svg>
    );
};

// Элегантный стул
export const Chair = ({ width = 60, height = 60, selected = false, onClick }) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 60 60"
            onClick={onClick}
            style={{ cursor: 'pointer', filter: selected ? 'drop-shadow(0 0 8px #007bff)' : 'none' }}
        >
            {/* Спинка */}
            <rect x="5" y="5" width="50" height="10" fill="#8B4513" stroke="#5D4037" strokeWidth="2" rx="3" />

            {/* Сиденье */}
            <rect x="5" y="15" width="50" height="10" fill="#A0522D" stroke="#5D4037" strokeWidth="2" rx="2" />

            {/* Ножки */}
            <rect x="10" y="25" width="6" height="20" fill="#5D4037" rx="1" />
            <rect x="44" y="25" width="6" height="20" fill="#5D4037" rx="1" />

            {/* Перекладины */}
            <rect x="10" y="40" width="40" height="3" fill="#5D4037" rx="1" />
            <rect x="10" y="30" width="40" height="2" fill="#5D4037" rx="1" />

            {/* Декоративные элементы */}
            <circle cx="30" cy="10" r="2" fill="#5D4037" />
            <circle cx="20" cy="10" r="1" fill="#A0522D" />
            <circle cx="40" cy="10" r="1" fill="#A0522D" />
        </svg>
    );
};

// Роскошный диван
export const Sofa = ({ width = 200, height = 80, selected = false, onClick }) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 200 80"
            onClick={onClick}
            style={{ cursor: 'pointer', filter: selected ? 'drop-shadow(0 0 8px #007bff)' : 'none' }}
        >
            {/* Основа дивана */}
            <path d="M10,40 Q0,30 10,20 H190 Q200,30 190,40 V60 Q180,70 170,70 H30 Q20,70 10,60 Z"
                  fill="#6B8E23" stroke="#556B2F" strokeWidth="2" />

            {/* Подушки */}
            <rect x="20" y="25" width="40" height="25" fill="#8FBC8F" stroke="#556B2F" strokeWidth="1" rx="3" />
            <rect x="70" y="25" width="40" height="25" fill="#8FBC8F" stroke="#556B2F" strokeWidth="1" rx="3" />
            <rect x="140" y="25" width="40" height="25" fill="#8FBC8F" stroke="#556B2F" strokeWidth="1" rx="3" />

            {/* Спинка */}
            <rect x="10" y="20" width="180" height="5" fill="#556B2F" rx="2" />

            {/* Подлокотники */}
            <rect x="5" y="25" width="10" height="35" fill="#556B2F" rx="2" />
            <rect x="185" y="25" width="10" height="35" fill="#556B2F" rx="2" />

            {/* Ножки */}
            <circle cx="20" cy="75" r="3" fill="#8B4513" />
            <circle cx="180" cy="75" r="3" fill="#8B4513" />
        </svg>
    );
};

// Барная стойка
export const BarCounter = ({ width = 180, height = 60, selected = false, onClick }) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 180 60"
            onClick={onClick}
            style={{ cursor: 'pointer', filter: selected ? 'drop-shadow(0 0 8px #007bff)' : 'none' }}
        >
            {/* Столешница */}
            <rect x="0" y="0" width="180" height="15" fill="#2F4F4F" stroke="#1C2E2E" strokeWidth="2" rx="3" />

            {/* Основание */}
            <rect x="10" y="15" width="160" height="35" fill="#708090" stroke="#2F4F4F" strokeWidth="2" rx="3" />

            {/* Полки */}
            <rect x="15" y="25" width="150" height="3" fill="#2F4F4F" rx="1" />
            <rect x="15" y="35" width="150" height="3" fill="#2F4F4F" rx="1" />

            {/* Барные стулья */}
            <circle cx="30" cy="55" r="4" fill="#8B4513" stroke="#5D4037" strokeWidth="1" />
            <circle cx="90" cy="55" r="4" fill="#8B4513" stroke="#5D4037" strokeWidth="1" />
            <circle cx="150" cy="55" r="4" fill="#8B4513" stroke="#5D4037" strokeWidth="1" />
        </svg>
    );
};

// Растение в горшке
export const Plant = ({ width = 50, height = 70, selected = false, onClick }) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 50 70"
            onClick={onClick}
            style={{ cursor: 'pointer', filter: selected ? 'drop-shadow(0 0 8px #007bff)' : 'none' }}
        >
            {/* Горшок */}
            <path d="M15,50 Q10,65 15,70 H35 Q40,65 35,50 Z" fill="#A0522D" stroke="#8B4513" strokeWidth="2" />

            {/* Стебли */}
            <path d="M25,50 L22,30 L25,10 L28,30 Z" fill="none" stroke="#2E8B57" strokeWidth="1.5" />
            <path d="M25,50 L18,35 L25,15 L32,35 Z" fill="none" stroke="#2E8B57" strokeWidth="1.5" />

            {/* Листья */}
            <ellipse cx="20" cy="25" rx="8" ry="5" fill="#3CB371" transform="rotate(-30 20 25)" />
            <ellipse cx="30" cy="25" rx="8" ry="5" fill="#3CB371" transform="rotate(30 30 25)" />
            <ellipse cx="25" cy="15" rx="6" ry="4" fill="#2E8B57" />

            {/* Цветок */}
            <circle cx="25" cy="10" r="3" fill="#FF69B4" />
            <circle cx="23" cy="8" r="1" fill="#FFFFFF" />
            <circle cx="27" cy="8" r="1" fill="#FFFFFF" />
        </svg>
    );
};
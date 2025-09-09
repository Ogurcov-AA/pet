// RealisticFurniture.jsx
import React from 'react';

// Реалистичный круглый стол с текстурой дерева
export const RealisticRoundTable = ({ width = 140, height = 140, selected = false, onClick }) => {
    return (
        <div
            onClick={onClick}
            style={{
                width,
                height,
                position: 'relative',
                cursor: 'pointer',
                filter: selected ? 'drop-shadow(0 0 15px rgba(59, 130, 246, 0.8))' : 'none'
            }}
        >
            {/* Столешница с текстурой дерева */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '80%',
                height: '80%',
                background: `
          radial-gradient(circle at 30% 30%, #d4a76a 0%, #b17a4a 20%, #8b5a2b 60%, #654321 100%),
          repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(139, 90, 43, 0.1) 2px, rgba(139, 90, 43, 0.1) 4px)
        `,
                borderRadius: '50%',
                border: '3px solid #5d4037',
                boxShadow: `
          0 8px 32px rgba(0, 0, 0, 0.3),
          inset 0 2px 4px rgba(255, 255, 255, 0.2),
          inset 0 -2px 4px rgba(0, 0, 0, 0.4)
        `,
                transformStyle: 'preserve-3d',
                // transform: 'rotateX(5deg)'
            }}>
                {/* Годовые кольца */}
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '60%',
                    height: '60%',
                    border: '2px solid #5d4037',
                    borderRadius: '50%',
                    opacity: 0.3
                }} />
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '40%',
                    height: '40%',
                    border: '1px solid #5d4037',
                    borderRadius: '50%',
                    opacity: 0.2
                }} />
            </div>

            {/* Центральная опора */}
            <div style={{
                position: 'absolute',
                top: '70%',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '20%',
                height: '25%',
                background: 'linear-gradient(90deg, #5d4037 0%, #4e342e 30%, #5d4037 70%, #4e342e 100%)',
                borderRadius: '8px 8px 4px 4px',
                boxShadow: `
          inset 0 2px 4px rgba(255, 255, 255, 0.1),
          inset 0 -2px 4px rgba(0, 0, 0, 0.3),
          0 4px 8px rgba(0, 0, 0, 0.4)
        `
            }} />

            {/* Ножки */}
            {[0, 90, 180, 270].map((rotation, index) => (
                <div key={index} style={{
                    position: 'absolute',
                    top: '85%',
                    left: '50%',
                    transform: `
            translateX(-50%) 
            rotate(${rotation}deg) 
            translateY(-20px)
            rotateX(60deg)
          `,
                    width: '8%',
                    height: '20%',
                    background: 'linear-gradient(to bottom, #5d4037 0%, #4e342e 40%, #3e2723 100%)',
                    borderRadius: '3px',
                    boxShadow: `
            inset 0 1px 2px rgba(255, 255, 255, 0.1),
            inset 0 -1px 2px rgba(0, 0, 0, 0.3),
            2px 4px 8px rgba(0, 0, 0, 0.3)
          `,
                    transformStyle: 'preserve-3d'
                }} />
            ))}

            {/* Блеск и блики */}
            <div style={{
                position: 'absolute',
                top: '20%',
                left: '20%',
                width: '30%',
                height: '30%',
                background: 'radial-gradient(ellipse at center, rgba(255, 255, 255, 0.4) 0%, transparent 70%)',
                borderRadius: '50%',
                opacity: 0.6,
                pointerEvents: 'none'
            }} />
        </div>
    );
};

// Реалистичный стул с мягкой обивкой
export const RealisticChair = ({ width = 70, height = 90, selected = false, onClick }) => {
    return (
        <div
            onClick={onClick}
            style={{
                width,
                height,
                position: 'relative',
                cursor: 'pointer',
                filter: selected ? 'drop-shadow(0 0 12px rgba(59, 130, 246, 0.7))' : 'none'
            }}
        >
            {/* Спинка стула */}
            <div style={{
                position: 'absolute',
                top: '5%',
                left: '10%',
                width: '80%',
                height: '35%',
                background: 'linear-gradient(135deg, #2c5530 0%, #1e3e22 50%, #2c5530 100%)',
                border: '3px solid #1a1a1a',
                borderRadius: '8px 8px 4px 4px',
                boxShadow: `
          0 4px 12px rgba(0, 0, 0, 0.4),
          inset 0 2px 4px rgba(86, 171, 47, 0.3),
          inset 0 -2px 4px rgba(0, 0, 0, 0.3)
        `,
                transform: 'perspective(500px) rotateX(10deg)'
            }}>
                {/* Стежка обивки */}
                <div style={{
                    position: 'absolute',
                    top: '30%',
                    left: '10%',
                    width: '80%',
                    height: '2px',
                    background: 'linear-gradient(90deg, transparent 0%, rgba(86, 171, 47, 0.4) 20%, rgba(86, 171, 47, 0.4) 80%, transparent 100%)'
                }} />
                <div style={{
                    position: 'absolute',
                    top: '60%',
                    left: '10%',
                    width: '80%',
                    height: '2px',
                    background: 'linear-gradient(90deg, transparent 0%, rgba(86, 171, 47, 0.4) 20%, rgba(86, 171, 47, 0.4) 80%, transparent 100%)'
                }} />
            </div>

            {/* Сиденье */}
            <div style={{
                position: 'absolute',
                top: '40%',
                left: '10%',
                width: '80%',
                height: '25%',
                background: 'linear-gradient(135deg, #2c5530 0%, #1e3e22 50%, #2c5530 100%)',
                border: '3px solid #1a1a1a',
                borderRadius: '6px',
                boxShadow: `
          0 4px 12px rgba(0, 0, 0, 0.3),
          inset 0 2px 4px rgba(86, 171, 47, 0.3),
          inset 0 -2px 4px rgba(0, 0, 0, 0.3)
        `,
                transform: 'perspective(500px) rotateX(-15deg)'
            }} />

            {/* Каркас - ножки и спинка */}
            <div style={{
                position: 'absolute',
                top: '40%',
                left: '15%',
                width: '70%',
                height: '45%',
                background: 'linear-gradient(90deg, #5d4037 0%, #4e342e 30%, #5d4037 70%, #4e342e 100%)',
                border: '2px solid #3e2723',
                borderRadius: '4px',
                transform: 'perspective(500px) rotateX(60deg)',
                boxShadow: '0 6px 20px rgba(0, 0, 0, 0.4)'
            }} />

            {/* Задние ножки */}
            <div style={{
                position: 'absolute',
                top: '65%',
                left: '15%',
                width: '8%',
                height: '30%',
                background: 'linear-gradient(to bottom, #5d4037 0%, #4e342e 40%, #3e2723 100%)',
                borderRadius: '3px',
                transform: 'perspective(500px) rotateX(60deg)',
                boxShadow: '2px 4px 12px rgba(0, 0, 0, 0.3)'
            }} />
            <div style={{
                position: 'absolute',
                top: '65%',
                left: '77%',
                width: '8%',
                height: '30%',
                background: 'linear-gradient(to bottom, #5d4037 0%, #4e342e 40%, #3e2723 100%)',
                borderRadius: '3px',
                transform: 'perspective(500px) rotateX(60deg)',
                boxShadow: '2px 4px 12px rgba(0, 0, 0, 0.3)'
            }} />

            {/* Блики на обивке */}
            <div style={{
                position: 'absolute',
                top: '15%',
                left: '20%',
                width: '20%',
                height: '15%',
                background: 'radial-gradient(ellipse at center, rgba(255, 255, 255, 0.3) 0%, transparent 70%)',
                borderRadius: '50%',
                pointerEvents: 'none'
            }} />
        </div>
    );
};

// Роскошный диван
export const RealisticSofa = ({ width = 220, height = 100, selected = false, onClick }) => {
    return (
        <div
            onClick={onClick}
            style={{
                width,
                height,
                position: 'relative',
                cursor: 'pointer',
                filter: selected ? 'drop-shadow(0 0 15px rgba(59, 130, 246, 0.8))' : 'none'
            }}
        >
            {/* Основа дивана */}
            <div style={{
                position: 'absolute',
                top: '30%',
                left: '5%',
                width: '90%',
                height: '60%',
                background: 'linear-gradient(135deg, #8d6e63 0%, #6d4c41 50%, #8d6e63 100%)',
                border: '3px solid #4e342e',
                borderRadius: '15px',
                boxShadow: `
          0 8px 32px rgba(0, 0, 0, 0.4),
          inset 0 2px 4px rgba(255, 255, 255, 0.2),
          inset 0 -2px 4px rgba(0, 0, 0, 0.4)
        `,
                transform: 'perspective(600px) rotateX(10deg)'
            }} />

            {/* Спинка */}
            <div style={{
                position: 'absolute',
                top: '5%',
                left: '5%',
                width: '90%',
                height: '30%',
                background: 'linear-gradient(135deg, #8d6e63 0%, #6d4c41 50%, #8d6e63 100%)',
                border: '3px solid #4e342e',
                borderRadius: '12px 12px 5px 5px',
                boxShadow: `
          0 6px 20px rgba(0, 0, 0, 0.3),
          inset 0 2px 4px rgba(255, 255, 255, 0.2),
          inset 0 -2px 4px rgba(0, 0, 0, 0.3)
        `,
                transform: 'perspective(600px) rotateX(-10deg)'
            }} />

            {/* Подушки */}
            <div style={{
                position: 'absolute',
                top: '35%',
                left: '10%',
                width: '25%',
                height: '25%',
                background: 'linear-gradient(135deg, #795548 0%, #5d4037 50%, #795548 100%)',
                border: '2px solid #4e342e',
                borderRadius: '8px',
                boxShadow: `
          0 4px 12px rgba(0, 0, 0, 0.3),
          inset 0 1px 2px rgba(255, 255, 255, 0.1),
          inset 0 -1px 2px rgba(0, 0, 0, 0.2)
        `,
                transform: 'perspective(600px) rotateX(-5deg)'
            }} />
            <div style={{
                position: 'absolute',
                top: '35%',
                left: '40%',
                width: '25%',
                height: '25%',
                background: 'linear-gradient(135deg, #795548 0%, #5d4037 50%, #795548 100%)',
                border: '2px solid #4e342e',
                borderRadius: '8px',
                boxShadow: `
          0 4px 12px rgba(0, 0, 0, 0.3),
          inset 0 1px 2px rgba(255, 255, 255, 0.1),
          inset 0 -1px 2px rgba(0, 0, 0, 0.2)
        `,
                transform: 'perspective(600px) rotateX(-5deg)'
            }} />

            {/* Ножки */}
            {[15, 85].map((left, index) => (
                <div key={index} style={{
                    position: 'absolute',
                    top: '85%',
                    left: `${left}%`,
                    width: '4%',
                    height: '12%',
                    background: 'linear-gradient(to bottom, #5d4037 0%, #4e342e 40%, #3e2723 100%)',
                    borderRadius: '2px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
                    transform: 'perspective(600px) rotateX(60deg)'
                }} />
            ))}

            {/* Стежка и детали */}
            <div style={{
                position: 'absolute',
                top: '45%',
                left: '10%',
                width: '80%',
                height: '2px',
                background: 'linear-gradient(90deg, transparent 0%, rgba(121, 85, 72, 0.4) 20%, rgba(121, 85, 72, 0.4) 80%, transparent 100%)',
                pointerEvents: 'none'
            }} />
        </div>
    );
};

// Барная стойка с мраморной столешницей
export const RealisticBarCounter = ({ width = 200, height = 80, selected = false, onClick }) => {
    return (
        <div
            onClick={onClick}
            style={{
                width,
                height,
                position: 'relative',
                cursor: 'pointer',
                filter: selected ? 'drop-shadow(0 0 12px rgba(59, 130, 246, 0.7))' : 'none'
            }}
        >
            {/* Мраморная столешница */}
            <div style={{
                position: 'absolute',
                top: '10%',
                left: '5%',
                width: '90%',
                height: '25%',
                background: `
          linear-gradient(45deg, 
            #f8f9fa 0%, #e9ecef 20%, #dee2e6 40%, 
            #ced4da 60%, #adb5bd 80%, #6c757d 100%
          ),
          url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" opacity="0.1"><filter id="noise"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" /></filter><rect width="100" height="100" filter="url(%23noise)" /></svg>')
        `,
                border: '3px solid #495057',
                borderRadius: '8px',
                boxShadow: `
          0 8px 32px rgba(0, 0, 0, 0.3),
          inset 0 2px 8px rgba(255, 255, 255, 0.6),
          inset 0 -2px 4px rgba(0, 0, 0, 0.2)
        `,
                transform: 'perspective(500px) rotateX(5deg)'
            }} />

            {/* Деревянное основание */}
            <div style={{
                position: 'absolute',
                top: '35%',
                left: '5%',
                width: '90%',
                height: '50%',
                background: `
          linear-gradient(90deg, #5d4037 0%, #4e342e 30%, #5d4037 70%, #4e342e 100%),
          repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(139, 90, 43, 0.1) 2px, rgba(139, 90, 43, 0.1) 4px)
        `,
                border: '3px solid #3e2723',
                borderRadius: '6px',
                boxShadow: `
          0 6px 24px rgba(0, 0, 0, 0.4),
          inset 0 2px 4px rgba(255, 255, 255, 0.1),
          inset 0 -2px 4px rgba(0, 0, 0, 0.3)
        `,
                transform: 'perspective(500px) rotateX(5deg)'
            }} />

            {/* Полки */}
            <div style={{
                position: 'absolute',
                top: '45%',
                left: '10%',
                width: '80%',
                height: '4%',
                background: 'linear-gradient(90deg, #5d4037 0%, #4e342e 50%, #5d4037 100%)',
                border: '2px solid #3e2723',
                borderRadius: '2px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)'
            }} />
            <div style={{
                position: 'absolute',
                top: '55%',
                left: '10%',
                width: '80%',
                height: '4%',
                background: 'linear-gradient(90deg, #5d4037 0%, #4e342e 50%, #5d4037 100%)',
                border: '2px solid #3e2723',
                borderRadius: '2px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)'
            }} />

            {/* Металлическая окантовка */}
            <div style={{
                position: 'absolute',
                top: '32%',
                left: '4%',
                width: '92%',
                height: '2%',
                background: 'linear-gradient(90deg, #b0bec5 0%, #90a4ae 50%, #b0bec5 100%)',
                borderRadius: '2px',
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)'
            }} />
        </div>
    );
};

// Современное кресло
export const RealisticArmchair = ({ width = 100, height = 100, selected = false, onClick }) => {
    return (
        <div
            onClick={onClick}
            style={{
                width,
                height,
                position: 'relative',
                cursor: 'pointer',
                filter: selected ? 'drop-shadow(0 0 12px rgba(59, 130, 246, 0.7))' : 'none'
            }}
        >
            {/* Основная часть кресла */}
            <div style={{
                position: 'absolute',
                top: '20%',
                left: '15%',
                width: '70%',
                height: '60%',
                background: 'linear-gradient(135deg, #d32f2f 0%, #b71c1c 50%, #d32f2f 100%)',
                border: '3px solid #7b1fa2',
                borderRadius: '20px',
                boxShadow: `
          0 10px 40px rgba(0, 0, 0, 0.4),
          inset 0 3px 6px rgba(255, 255, 255, 0.2),
          inset 0 -3px 6px rgba(0, 0, 0, 0.4)
        `,
                transform: 'perspective(500px) rotateX(15deg) rotateY(-5deg)'
            }} />

            {/* Подлокотники */}
            <div style={{
                position: 'absolute',
                top: '25%',
                left: '10%',
                width: '10%',
                height: '50%',
                background: 'linear-gradient(135deg, #7b1fa2 0%, #6a1b9a 50%, #7b1fa2 100%)',
                border: '2px solid #4a148c',
                borderRadius: '10px',
                boxShadow: '0 6px 20px rgba(0, 0, 0, 0.3)',
                transform: 'perspective(500px) rotateY(10deg)'
            }} />
            <div style={{
                position: 'absolute',
                top: '25%',
                left: '80%',
                width: '10%',
                height: '50%',
                background: 'linear-gradient(135deg, #7b1fa2 0%, #6a1b9a 50%, #7b1fa2 100%)',
                border: '2px solid #4a148c',
                borderRadius: '10px',
                boxShadow: '0 6px 20px rgba(0, 0, 0, 0.3)',
                transform: 'perspective(500px) rotateY(-10deg)'
            }} />

            {/* Ножки */}
            {[20, 70].map((left, index) => (
                <div key={index} style={{
                    position: 'absolute',
                    top: '80%',
                    left: `${left}%`,
                    width: '6%',
                    height: '15%',
                    background: 'linear-gradient(to bottom, #7b1fa2 0%, #6a1b9a 40%, #4a148c 100%)',
                    borderRadius: '3px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                    transform: 'perspective(500px) rotateX(60deg)'
                }} />
            ))}

            {/* Декоративные элементы */}
            <div style={{
                position: 'absolute',
                top: '40%',
                left: '25%',
                width: '50%',
                height: '2px',
                background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.3) 20%, rgba(255, 255, 255, 0.3) 80%, transparent 100%)',
                pointerEvents: 'none'
            }} />
        </div>
    );
};
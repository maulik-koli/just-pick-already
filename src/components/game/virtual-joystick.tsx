import React, { useRef, useState } from 'react';

interface VirtualJoystickProps {
    onChange: (vector: { dx: number, dy: number }) => void;
}

export const VirtualJoystick: React.FC<VirtualJoystickProps> = ({ onChange }) => {
    const baseRef = useRef<HTMLDivElement>(null);
    const [stickPos, setStickPos] = useState({ x: 0, y: 0 });
    const maxDistance = 40;

    const handleTouchMove = (e: React.TouchEvent | React.MouseEvent) => {
        // prevent scrolling while using the joystick
        if (e.cancelable && e.type === 'touchmove') {
            e.preventDefault();
        }

        if (!baseRef.current) return;
        const baseRect = baseRef.current.getBoundingClientRect();
        const centerX = baseRect.left + baseRect.width / 2;
        const centerY = baseRect.top + baseRect.height / 2;

        let clientX, clientY;
        if ('touches' in e) {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        } else {
            clientX = (e as React.MouseEvent).clientX;
            clientY = (e as React.MouseEvent).clientY;
        }

        let dx = clientX - centerX;
        let dy = clientY - centerY;
        const distance = Math.hypot(dx, dy);

        if (distance > maxDistance) {
            dx = (dx / distance) * maxDistance;
            dy = (dy / distance) * maxDistance;
        }

        setStickPos({ x: dx, y: dy });
        onChange({ dx: dx / maxDistance, dy: dy / maxDistance });
    };

    const handleTouchEnd = () => {
        setStickPos({ x: 0, y: 0 });
        onChange({ dx: 0, dy: 0 });
    };

    return (
        <div 
            className="fixed bottom-8 left-8 w-28 h-28 bg-foreground/10 rounded-full border-2 border-border/30 backdrop-blur-sm flex items-center justify-center z-50 touch-none md:hidden"
            ref={baseRef}
            onTouchStart={handleTouchMove}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onTouchCancel={handleTouchEnd}
            onMouseDown={(e) => {
                const moveHandler = (ev: MouseEvent) => handleTouchMove(ev as any);
                const upHandler = () => {
                    handleTouchEnd();
                    document.removeEventListener('mousemove', moveHandler);
                    document.removeEventListener('mouseup', upHandler);
                };
                document.addEventListener('mousemove', moveHandler);
                document.addEventListener('mouseup', upHandler);
                handleTouchMove(e as any);
            }}
        >
            <div 
                className="w-12 h-12 bg-primary/80 rounded-full shadow-lg border border-primary/50"
                style={{ 
                    transform: `translate(${stickPos.x}px, ${stickPos.y}px)`, 
                    transition: stickPos.x === 0 && stickPos.y === 0 ? 'transform 0.2s ease-out' : 'none' 
                }}
            />
        </div>
    );
};

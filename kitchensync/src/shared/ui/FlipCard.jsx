import { useState, useEffect, useRef, useCallback } from 'react';

const FlipCard = ({
                      children,
                      backContent,
                      height = "220px",
                      className = "",
                      onFlip,
                      disabled = false,
                      autoFlipBack = true,
                      flipDuration = 0.6
                  }) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const cardRef = useRef(null);

    const handleFlip = () => {
        if (disabled) return;

        const newFlipState = !isFlipped;
        setIsFlipped(newFlipState);

        if (onFlip) {
            onFlip(newFlipState);
        }
    };

    const handleFlipBack = useCallback(() => {
        if (disabled) return;
        setIsFlipped(false);
    }, [disabled]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (cardRef.current && !cardRef.current.contains(event.target) && isFlipped && autoFlipBack) {
                handleFlipBack();
            }
        };

        if (isFlipped && autoFlipBack) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isFlipped, autoFlipBack, handleFlipBack]);

    return (
        <div
            className={`flip-card-container ${className}`}
            ref={cardRef}
            style={{ height }}
        >
            <div className={`flip-card ${isFlipped ? 'flipped' : ''}`}>
                <div className="flip-card-front">
                    <div
                        className={`flip-card-content ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
                        onClick={handleFlip}
                    >
                        {children}
                    </div>
                </div>

                <div className="flip-card-back">
                    <div className="flip-card-content">
                        {typeof backContent === 'function'
                            ? backContent({ onFlipBack: handleFlipBack, isFlipped })
                            : backContent
                        }
                    </div>
                </div>
            </div>

            <style>{`
                .flip-card-container {
                    perspective: 1000px;
                }

                .flip-card {
                    position: relative;
                    width: 100%;
                    height: 100%;
                    transition: transform ${flipDuration}s ease-in-out;
                    transform-style: preserve-3d;
                }

                .flip-card.flipped {
                    transform: rotateY(180deg);
                }

                .flip-card-front,
                .flip-card-back {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    backface-visibility: hidden;
                    border-radius: inherit;
                }

                .flip-card-back {
                    transform: rotateY(180deg);
                }

                .flip-card-content {
                    width: 100%;
                    height: 100%;
                    border-radius: inherit;
                }
            `}</style>
        </div>
    );
};

export default FlipCard;
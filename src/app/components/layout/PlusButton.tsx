import { Plus, X } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface PlusButtonProps {
    onClick?: () => void;
}

export function PlusButton({ onClick }: PlusButtonProps) {
    const [isOpen, setIsOpen] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        // Preload the audio
        audioRef.current = new Audio('/sounds/michaelscott.mp3');
        audioRef.current.volume = 0.5; // Set volume to 50%
    }, []);

    const handleClick = () => {
        const willBeOpen = !isOpen;

        // Only play sound when OPENING the modal
        if (willBeOpen && audioRef.current) {
            audioRef.current.currentTime = 0; // Reset to start
            audioRef.current.play().catch(err => {
                console.log('Audio play failed:', err);
            });
        }

        setIsOpen(willBeOpen);
        onClick?.();
    };

    return (
        <div className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50">
            <button
                onClick={handleClick}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 flex items-center justify-center transition-all duration-500 shadow-md hover:shadow-lg active:scale-95"
                aria-label={isOpen ? "Close menu" : "Open menu"}
                style={{
                    transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)'
                }}
            >
                <div
                    className="relative w-6 h-6 sm:w-7 sm:h-7"
                    style={{
                        transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                        transition: 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)'
                    }}
                >
                    <Plus className="w-full h-full text-gray-700 absolute inset-0" strokeWidth={2.5} />
                </div>
            </button>
        </div>
    );
}

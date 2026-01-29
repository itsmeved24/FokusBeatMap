interface AboutModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function AboutModal({ isOpen, onClose }: AboutModalProps) {
    return (
        <>
            {/* Backdrop */}
            <div
                className={`fixed inset-0 bg-black/20 backdrop-blur-[2px] z-40 transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                onClick={onClose}
            />

            {/* Modal */}
            <div
                className={`fixed inset-0 z-40 flex items-center justify-center p-4 sm:p-6 md:p-8 transition-all duration-500 overflow-y-auto ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
                    }`}
            >
                <div
                    className="bg-white rounded-[24px] sm:rounded-[32px] md:rounded-[40px] shadow-2xl w-full max-w-3xl p-6 sm:p-10 md:p-12 lg:p-16 relative my-auto max-h-[90vh] overflow-y-auto"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Content */}
                    <div className="space-y-6 sm:space-y-8">
                        {/* Header */}
                        <div>
                            <h2
                                className="mb-3 sm:mb-4"
                                style={{
                                    fontFamily: 'Geist, sans-serif',
                                    fontWeight: 700,
                                    fontSize: '16px',
                                    lineHeight: '24px',
                                    color: '#222222'
                                }}
                            >
                                tl;dr
                            </h2>
                            <p className="text-gray-500 leading-relaxed" style={{ fontSize: '14px' }}>
                                Music has always been my escape from the noise around me and the chaos in my head. So I built this tiny focus beat masher. You can draw over the pixels and let your thoughts turn into gentle loops that play while the timer runs. Click around, make something you can vibe to, or hit randomize to discover catchy, calming beats with just the right hook.
                            </p>
                        </div>

                        {/* Animated Letters */}
                        <div className="relative h-32 sm:h-40 md:h-48 flex items-center justify-center">
                            <div className="relative w-full h-full">
                                {/* Main "focus" letters */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    {['f', 'o', 'c', 'u', 's'].map((letter, i) => (
                                        <span
                                            key={`main-${i}`}
                                            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mx-0.5 sm:mx-1"
                                            style={{
                                                animation: `float ${3 + i * 0.5}s ease-in-out infinite`,
                                                animationDelay: `${i * 0.1}s`,
                                                transform: 'translateZ(0)',
                                                willChange: 'transform'
                                            }}
                                        >
                                            {letter}
                                        </span>
                                    ))}
                                </div>

                                {/* Scattered background letters */}
                                <div className="absolute inset-0 opacity-20 text-gray-400 text-xs sm:text-sm">
                                    {Array.from('musictimerdrawnpixelsloopplayvibeexplore').map((char, i) => (
                                        <span
                                            key={i}
                                            className="absolute"
                                            style={{
                                                left: `${10 + (i * 37) % 80}%`,
                                                top: `${10 + (i * 23) % 70}%`,
                                                animation: `drift ${5 + (i % 5)}s ease-in-out infinite`,
                                                animationDelay: `${i * 0.2}s`,
                                                transform: 'translateZ(0)',
                                                willChange: 'transform'
                                            }}
                                        >
                                            {char}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Bio */}
                        <p className="text-gray-500 leading-relaxed" style={{ fontSize: '14px' }}>
                            I’m a creative developer who builds fun, functional software because I love the idea of having the right tool for the right moment like pulling a Draw 4 just when someone’s about to win in Uno. If you like this or have feedback, I’d love to hear from you.
                        </p>

                        {/* Footer */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 pt-4 border-t border-gray-200">
                            <p className="text-gray-500" style={{ fontSize: '14px' }}>
                                Built by{' '}
                                <a
                                    href="https://vansiadev.vercel.app/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-900 hover:text-gray-600 transition-colors inline-flex items-center gap-1"
                                    style={{
                                        fontSize: '14px',
                                        borderBottom: '1px dotted currentColor',
                                        textDecoration: 'none'
                                    }}
                                >
                                    Vedank Vansia
                                    <span style={{ fontSize: '14px' }}>→</span>
                                </a>
                            </p>
                            <div className="flex gap-3 sm:gap-4">
                                <a
                                    href="https://www.linkedin.com/in/vedank-vansia-73167b270/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-900 hover:text-gray-600 transition-colors"
                                    style={{ fontSize: '14px' }}
                                >
                                    Linkedin
                                </a>
                                <a
                                    href="mailto:vedankvansia@gmail.com"
                                    className="text-gray-900 hover:text-gray-600 transition-colors"
                                    style={{ fontSize: '14px' }}
                                >
                                    Email
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CSS Animations */}
            <style>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                }
                @keyframes drift {
                    0%, 100% { transform: translate(0, 0); }
                    25% { transform: translate(5px, 5px); }
                    50% { transform: translate(-3px, 8px); }
                    75% { transform: translate(3px, -5px); }
                }
            `}</style>
        </>
    );
}

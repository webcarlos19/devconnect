import { useEffect, useState } from 'react';

function Particles() {
    const [particles, setParticles] = useState([]);

    useEffect(() => {
        // Gerar partículas com posições, delays e trajetórias únicas (reduzido para 15 para melhor performance)
        const newParticles = Array.from({ length: 10 }, (_, i) => {
            // Gerar direções aleatórias para movimento único
            const x1 = Math.round((Math.random() - 0.5) * 200); // -100 a 100
            const y1 = Math.round((Math.random() - 0.5) * 200);
            const x2 = Math.round((Math.random() - 0.5) * 250);
            const y2 = Math.round((Math.random() - 0.5) * 250);
            const x3 = Math.round((Math.random() - 0.5) * 180);
            const y3 = Math.round((Math.random() - 0.5) * 180);
            const duration = 30 + Math.round(Math.random() * 30); // 30-60s

            return {
                id: i,
                left: `${Math.round(Math.random() * 100)}%`,
                top: `${Math.round(Math.random() * 100)}%`,
                animationDelay: `${-(Math.random() * duration)}s`, // Delay negativo para começar imediatamente em pontos diferentes do ciclo
                // Custom properties para trajetória única
                '--x1': `${x1}px`,
                '--y1': `${y1}px`,
                '--x2': `${x2}px`,
                '--y2': `${y2}px`,
                '--x3': `${x3}px`,
                '--y3': `${y3}px`,
                '--duration': `${duration}s`,
            };
        });

        setParticles(newParticles);
    }, []);

    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 w-full">
            {particles.map((particle) => (
                <div
                    key={particle.id}
                    className="particle"
                    style={{
                        left: particle.left,
                        top: particle.top,
                        animationDelay: particle.animationDelay,
                        '--x1': particle['--x1'],
                        '--y1': particle['--y1'],
                        '--x2': particle['--x2'],
                        '--y2': particle['--y2'],
                        '--x3': particle['--x3'],
                        '--y3': particle['--y3'],
                        '--duration': particle['--duration'],
                    }}
                />
            ))}
        </div>
    );
}

export default Particles;

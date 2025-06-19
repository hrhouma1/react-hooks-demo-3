import React, { useState, useEffect } from 'react';
import { useWindowsSize } from './useWindowsSize';

// Hook personnalisé pour un compteur automatique
const useAutoCounter = (initialValue = 0, increment = 1, delay = 1000) => {
    const [count, setCount] = useState(initialValue);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        let interval;
        if (isRunning) {
            interval = setInterval(() => {
                setCount(prev => prev + increment);
            }, delay);
        }
        return () => clearInterval(interval);
    }, [isRunning, increment, delay]);

    const start = () => setIsRunning(true);
    const stop = () => setIsRunning(false);
    const reset = () => {
        setCount(initialValue);
        setIsRunning(false);
    };

    return { count, isRunning, start, stop, reset };
};

// Hook personnalisé pour localStorage
const useLocalStorage = (key, initialValue) => {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error(`Erreur localStorage:`, error);
            return initialValue;
        }
    });

    const setValue = (value) => {
        try {
            setStoredValue(value);
            window.localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error(`Erreur lors de l'écriture:`, error);
        }
    };

    return [storedValue, setValue];
};

// Hook personnalisé pour le statut en ligne
const useOnlineStatus = () => {
    const [isOnline, setIsOnline] = useState(navigator.onLine);

    useEffect(() => {
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    return isOnline;
};

const DemoHooksPerso = () => {
    const [largeur, hauteur] = useWindowsSize();
    const counter = useAutoCounter(0, 1, 500);
    const [nom, setNom] = useLocalStorage('demo-nom', '');
    const [preferences, setPreferences] = useLocalStorage('demo-preferences', { theme: 'clair' });
    const isOnline = useOnlineStatus();

    useEffect(() => {
        document.title = "Guide Hooks Personnalisés";
        return () => {
            document.title = "Guide d'apprentissage React Hooks";
        };
    }, []);

    const getBreakpoint = () => {
        if (largeur < 768) return 'Mobile';
        if (largeur < 1024) return 'Tablette';
        return 'Desktop';
    };

    const basculerTheme = () => {
        setPreferences(prev => ({
            ...prev,
            theme: prev.theme === 'clair' ? 'sombre' : 'clair'
        }));
    };

    return (
        <div className="demo-container">
            <div className="learning-objective">
                <div className="title">🎯 Objectif d'apprentissage</div>
                <div>
                    Apprendre à créer des <strong>hooks personnalisés</strong> pour réutiliser la logique entre composants
                </div>
            </div>

            <div className="learning-section">
                <h3>Qu'est-ce qu'un hook personnalisé ?</h3>
                
                <div className="info-pedagogy">
                    <div className="title">📖 Définition</div>
                    <div className="description">
                        Un hook personnalisé est une <strong>fonction JavaScript</strong> qui :
                        <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
                            <li>Commence par "use" (convention)</li>
                            <li>Utilise d'autres hooks React à l'intérieur</li>
                            <li>Permet de réutiliser la logique entre composants</li>
                            <li>Peut avoir ses propres paramètres et retourner des valeurs</li>
                        </ul>
                    </div>
                </div>

                <div className="code-example">
{`// Exemple basique d'un hook personnalisé
const useCompteur = (initial = 0) => {
    const [count, setCount] = useState(initial);
    
    const increment = () => setCount(c => c + 1);
    const decrement = () => setCount(c => c - 1);
    const reset = () => setCount(initial);
    
    return { count, increment, decrement, reset };
};

// Utilisation dans un composant
const { count, increment, reset } = useCompteur(10);`}
                </div>
            </div>

            <div className="learning-section">
                <h3>Exemple : useWindowSize</h3>
                
                <div className="two-column">
                    <div>
                        <div className="code-example">
{`const useWindowSize = () => {
    const [size, setSize] = useState([
        window.innerWidth,
        window.innerHeight
    ]);
    
    useEffect(() => {
        const handleResize = () => {
            setSize([
                window.innerWidth, 
                window.innerHeight
            ]);
        };
        
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    
    return size;
};`}
                        </div>
                    </div>
                    
                    <div>
                        <div className="state-display">
                            <div style={{ marginBottom: '0.5rem', fontWeight: '500' }}>
                                Taille actuelle :
                            </div>
                            <div className="state-value">{largeur} × {hauteur}</div>
                            <div style={{ fontSize: '0.8rem', marginTop: '0.5rem', color: '#666666' }}>
                                Type d'écran : <strong>{getBreakpoint()}</strong>
                            </div>
                            <div style={{ fontSize: '0.75rem', marginTop: '0.5rem', color: '#999999' }}>
                                Redimensionnez votre fenêtre pour voir les changements
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="learning-objective">
                <div className="title">📚 Points clés à retenir</div>
                <div>
                    Les <strong>hooks personnalisés</strong> permettent de :
                    <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
                        <li>Extraire et réutiliser la logique de composant</li>
                        <li>Créer des abstractions métier réutilisables</li>
                        <li>Simplifier les composants complexes</li>
                        <li>Améliorer la maintenabilité du code</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DemoHooksPerso; 
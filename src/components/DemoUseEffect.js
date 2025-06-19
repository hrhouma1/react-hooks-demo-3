import React, { useEffect, useState } from 'react';

const DemoUseEffect = () => {
    const [compteur, setCompteur] = useState(0);
    const [logs, setLogs] = useState([]);
    const [temps, setTemps] = useState(0);

    // Fonction pour ajouter un log pédagogique
    const ajouterLog = (message, type) => {
        const timestamp = new Date().toLocaleTimeString();
        setLogs(prev => [...prev.slice(-4), { message, type, timestamp }]);
    };

    // 1. useEffect sans dépendances - s'exécute à chaque rendu
    useEffect(() => {
        ajouterLog('useEffect sans dépendances exécuté', 'every-render');
    });

    // 2. useEffect avec tableau vide - s'exécute une seule fois au montage
    useEffect(() => {
        ajouterLog('Composant monté (useEffect avec [])', 'mount');
        document.title = "Guide useEffect - Basique";

        // Fonction de nettoyage
        return () => {
            ajouterLog('Composant démonté - nettoyage', 'cleanup');
            document.title = "Guide d'apprentissage React Hooks";
        };
    }, []);

    // 3. useEffect avec dépendance - s'exécute quand compteur change
    useEffect(() => {
        if (compteur > 0) {
            ajouterLog(`Compteur modifié: ${compteur}`, 'dependency');
        }
    }, [compteur]);

    // 4. useEffect avec timer (exemple de nettoyage)
    useEffect(() => {
        const timer = setInterval(() => {
            setTemps(prev => prev + 1);
        }, 1000);

        // Fonction de nettoyage pour éviter les fuites mémoire
        return () => {
            clearInterval(timer);
        };
    }, []);

    const reinitialiser = () => {
        setCompteur(0);
        setTemps(0);
        setLogs([]);
    };

    const getLogStyle = (type) => {
        const base = {
            padding: '0.5rem',
            borderRadius: '4px',
            fontSize: '0.85rem',
            marginBottom: '0.25rem'
        };

        switch(type) {
            case 'mount':
                return { ...base, background: '#d4edda', color: '#155724' };
            case 'dependency': 
                return { ...base, background: '#d1ecf1', color: '#0c5460' };
            case 'every-render':
                return { ...base, background: '#fff3cd', color: '#856404' };
            case 'cleanup':
                return { ...base, background: '#f8d7da', color: '#721c24' };
            default:
                return base;
        }
    };

    return (
        <div className="demo-container">
            {/* Objectif d'apprentissage */}
            <div className="learning-objective">
                <div className="title">🎯 Objectif d'apprentissage</div>
                <div>
                    Comprendre <strong>useEffect</strong> pour gérer les effets de bord dans les composants React
                </div>
            </div>

            {/* Section 1: Qu'est-ce que useEffect */}
            <div className="learning-section">
                <h3>Qu'est-ce que useEffect ?</h3>
                
                <div className="info-pedagogy">
                    <div className="title">📖 Définition</div>
                    <div className="description">
                        <strong>useEffect</strong> permet d'exécuter du code en réaction aux changements du composant :
                        <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
                            <li>Appels API</li>
                            <li>Modifications du DOM</li>
                            <li>Timers et intervalles</li>
                            <li>Abonnements à des événements</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Section 2: Les 3 types de useEffect */}
            <div className="learning-section">
                <h3>Les 3 types de useEffect</h3>

                {/* Type 1 */}
                <div className="step-explanation">
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                        <span className="step-number">1</span>
                        <strong>Sans dépendances - À chaque rendu</strong>
                    </div>
                    <div className="code-example">
{`useEffect(() => {
    // S'exécute à chaque rendu du composant
    console.log('Rendu effectué');
});\n// ⚠️ Attention : peut causer des problèmes de performance`}
                    </div>
                </div>

                {/* Type 2 */}
                <div className="step-explanation">
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                        <span className="step-number">2</span>
                        <strong>Avec tableau vide - Une seule fois</strong>
                    </div>
                    <div className="code-example">
{`useEffect(() => {
    // S'exécute une seule fois au montage
    fetchData();
    document.title = "Mon App";
    
    // Fonction de nettoyage (optionnelle)
    return () => {
        document.title = "Page fermée";
    };
}, []); // [] = tableau vide = une seule fois`}
                    </div>
                </div>

                {/* Type 3 */}
                <div className="step-explanation">
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                        <span className="step-number">3</span>
                        <strong>Avec dépendances - Quand les variables changent</strong>
                    </div>
                    <div className="code-example">
{`useEffect(() => {
    // S'exécute quand 'count' change
    localStorage.setItem('count', count);
}, [count]); // Surveille les changements de 'count'`}
                    </div>
                </div>
            </div>

            {/* Section 3: Démonstration interactive */}
            <div className="learning-section">
                <h3>Démonstration interactive</h3>

                <div className="two-column">
                    {/* Contrôles */}
                    <div>
                        <div style={{ marginBottom: '1rem' }}>
                            <div style={{ fontWeight: '500', marginBottom: '0.5rem' }}>
                                Compteur : {compteur}
                            </div>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <button 
                                    className="btn-professional"
                                    onClick={() => setCompteur(compteur + 1)}
                                >
                                    + Incrémenter
                                </button>
                                <button 
                                    className="btn-secondary"
                                    onClick={reinitialiser}
                                >
                                    Réinitialiser
                                </button>
                            </div>
                        </div>

                        <div style={{ marginBottom: '1rem' }}>
                            <div style={{ fontWeight: '500', marginBottom: '0.5rem' }}>
                                Timer : {temps}s
                            </div>
                            <div style={{ fontSize: '0.85rem', color: '#666666' }}>
                                (Se met à jour automatiquement)
                            </div>
                        </div>
                    </div>

                    {/* Logs des useEffect */}
                    <div>
                        <div style={{ fontWeight: '500', marginBottom: '0.5rem' }}>
                            Journal des useEffect :
                        </div>
                        <div style={{ 
                            maxHeight: '200px', 
                            overflowY: 'auto',
                            border: '1px solid #e6e6e6',
                            borderRadius: '4px',
                            padding: '0.5rem'
                        }}>
                            {logs.length === 0 ? (
                                <div style={{ color: '#666666', fontStyle: 'italic' }}>
                                    Aucun log pour le moment
                                </div>
                            ) : (
                                logs.map((log, index) => (
                                    <div key={index} style={getLogStyle(log.type)}>
                                        <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>
                                            {log.timestamp}
                                        </div>
                                        <div>{log.message}</div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Section 4: Bonnes pratiques */}
            <div className="learning-section">
                <h3>Bonnes pratiques</h3>
                
                <div style={{ marginBottom: '1rem' }}>
                    <div style={{ fontWeight: '500', color: '#057642', marginBottom: '0.5rem' }}>
                        ✅ À faire :
                    </div>
                    <ul style={{ paddingLeft: '1.5rem', lineHeight: '1.6' }}>
                        <li>Toujours spécifier les dépendances dans le tableau</li>
                        <li>Utiliser plusieurs useEffect pour séparer les préoccupations</li>
                        <li>Nettoyer les timers, abonnements, etc. dans la fonction de retour</li>
                        <li>Préférer [] pour les effets qui ne doivent s'exécuter qu'une fois</li>
                    </ul>
                </div>

                <div>
                    <div style={{ fontWeight: '500', color: '#cc1016', marginBottom: '0.5rem' }}>
                        ❌ À éviter :
                    </div>
                    <ul style={{ paddingLeft: '1.5rem', lineHeight: '1.6' }}>
                        <li>Omettre des dépendances (peut causer des bugs)</li>
                        <li>useEffect sans tableau de dépendances (problèmes de performance)</li>
                        <li>Oublier de nettoyer les ressources</li>
                        <li>Modifications d'état qui causent des boucles infinies</li>
                    </ul>
                </div>
            </div>

            {/* Résumé pédagogique */}
            <div className="learning-objective">
                <div className="title">📚 Points clés à retenir</div>
                <div>
                    <strong>useEffect</strong> est essentiel pour gérer les effets de bord :
                    <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
                        <li><code>useEffect(fn)</code> : à chaque rendu</li>
                        <li><code>useEffect(fn, [])</code> : une seule fois au montage</li>
                        <li><code>useEffect(fn, [var])</code> : quand var change</li>
                        <li>Toujours nettoyer avec la fonction de retour si nécessaire</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DemoUseEffect;
import React, { useState } from 'react';

const Demostate = () => {
    // États pour la démonstration
    const [nom, setNom] = useState('');
    const [compteur, setCompteur] = useState(0);
    const [informations, setInformations] = useState({
        nom: '',
        age: '',
        email: ''
    });
    const [taches, setTaches] = useState([]);
    const [nouvelleTache, setNouvelleTache] = useState('');

    // Fonctions pour gérer les informations
    const handleInfoChange = (champ, valeur) => {
        setInformations(prev => ({
            ...prev,
            [champ]: valeur
        }));
    };

    // Fonction pour ajouter une tâche
    const ajouterTache = () => {
        if (nouvelleTache.trim()) {
            setTaches(prev => [...prev, {
                id: Date.now(),
                texte: nouvelleTache,
                terminee: false
            }]);
            setNouvelleTache('');
        }
    };

    // Fonction pour supprimer une tâche
    const supprimerTache = (id) => {
        setTaches(prev => prev.filter(t => t.id !== id));
    };

    return (
        <div className="demo-container">
            {/* Objectif d'apprentissage */}
            <div className="learning-objective">
                <div className="title">🎯 Objectif d'apprentissage</div>
                <div>
                    Comprendre comment utiliser <strong>useState</strong> pour gérer l'état local dans les composants React
                </div>
            </div>

            {/* Section 1: String State */}
            <div className="learning-section">
                <h3>1. État de type String (Texte)</h3>
                
                <div className="info-pedagogy">
                    <div className="title">📝 Concept</div>
                    <div className="description">
                        useState permet de conserver et modifier des valeurs textuelles dans le composant
                    </div>
                </div>

                <div className="code-example">
{`const [nom, setNom] = useState('');
// nom: valeur actuelle
// setNom: fonction pour modifier la valeur`}
                </div>

                <div style={{ marginTop: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                        Saisissez votre nom :
                    </label>
                    <input
                        type="text"
                        value={nom}
                        onChange={(e) => setNom(e.target.value)}
                        placeholder="Entrez votre nom"
                        style={{
                            width: '100%',
                            padding: '0.5rem',
                            border: '1px solid #e6e6e6',
                            borderRadius: '4px',
                            fontSize: '0.9rem'
                        }}
                    />
                </div>

                <div className="state-display" style={{ marginTop: '1rem' }}>
                    <div>État actuel :</div>
                    <div className="state-value">
                        {nom || '(vide)'}
                    </div>
                </div>
            </div>

            {/* Section 2: Number State */}
            <div className="learning-section">
                <h3>2. État de type Number (Nombre)</h3>
                
                <div className="info-pedagogy">
                    <div className="title">🔢 Concept</div>
                    <div className="description">
                        useState peut également gérer des valeurs numériques avec des opérations
                    </div>
                </div>

                <div className="code-example">
{`const [compteur, setCompteur] = useState(0);
// Incrémenter: setCompteur(compteur + 1)
// Décrémenter: setCompteur(compteur - 1)`}
                </div>

                <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '1rem',
                    marginTop: '1rem'
                }}>
                    <button 
                        className="btn-professional"
                        onClick={() => setCompteur(compteur - 1)}
                    >
                        - Décrémenter
                    </button>
                    
                    <div className="state-display" style={{ margin: 0, minWidth: '80px' }}>
                        <div className="state-value">{compteur}</div>
                    </div>
                    
                    <button 
                        className="btn-professional"
                        onClick={() => setCompteur(compteur + 1)}
                    >
                        + Incrémenter
                    </button>
                    
                    <button 
                        className="btn-secondary"
                        onClick={() => setCompteur(0)}
                    >
                        Réinitialiser
                    </button>
                </div>
            </div>

            {/* Section 3: Object State */}
            <div className="learning-section">
                <h3>3. État de type Object (Objet)</h3>
                
                <div className="info-pedagogy">
                    <div className="title">📦 Concept</div>
                    <div className="description">
                        useState peut gérer des objets complexes. Attention à bien utiliser l'opérateur spread (...) pour les modifications
                    </div>
                </div>

                <div className="code-example">
{`const [informations, setInformations] = useState({
    nom: '', age: '', email: ''
});

// Modifier un champ spécifique :
setInformations(prev => ({
    ...prev,
    nom: 'nouvelle valeur'
}));`}
                </div>

                <div style={{ marginTop: '1rem' }}>
                    <div className="two-column">
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                                Nom complet :
                            </label>
                            <input
                                type="text"
                                value={informations.nom}
                                onChange={(e) => handleInfoChange('nom', e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '0.5rem',
                                    border: '1px solid #e6e6e6',
                                    borderRadius: '4px',
                                    fontSize: '0.9rem',
                                    marginBottom: '1rem'
                                }}
                            />
                            
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                                Âge :
                            </label>
                            <input
                                type="number"
                                value={informations.age}
                                onChange={(e) => handleInfoChange('age', e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '0.5rem',
                                    border: '1px solid #e6e6e6',
                                    borderRadius: '4px',
                                    fontSize: '0.9rem',
                                    marginBottom: '1rem'
                                }}
                            />
                            
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                                Email :
                            </label>
                            <input
                                type="email"
                                value={informations.email}
                                onChange={(e) => handleInfoChange('email', e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '0.5rem',
                                    border: '1px solid #e6e6e6',
                                    borderRadius: '4px',
                                    fontSize: '0.9rem'
                                }}
                            />
                        </div>
                        
                        <div>
                            <div style={{ fontWeight: '500', marginBottom: '0.5rem' }}>
                                Objet informations :
                            </div>
                            <div className="state-display" style={{ textAlign: 'left' }}>
                                <pre style={{ margin: 0, fontSize: '0.8rem' }}>
{JSON.stringify(informations, null, 2)}
                                </pre>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Section 4: Array State */}
            <div className="learning-section">
                <h3>4. État de type Array (Tableau)</h3>
                
                <div className="info-pedagogy">
                    <div className="title">📋 Concept</div>
                    <div className="description">
                        useState peut gérer des tableaux. Utilisez les méthodes comme spread (...) et filter() pour les modifications
                    </div>
                </div>

                <div className="code-example">
{`const [taches, setTaches] = useState([]);

// Ajouter un élément :
setTaches(prev => [...prev, nouvelElement]);

// Supprimer un élément :
setTaches(prev => prev.filter(t => t.id !== id));`}
                </div>

                <div style={{ marginTop: '1rem' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                        <input
                            type="text"
                            value={nouvelleTache}
                            onChange={(e) => setNouvelleTache(e.target.value)}
                            placeholder="Nouvelle tâche..."
                            style={{
                                flex: 1,
                                padding: '0.5rem',
                                border: '1px solid #e6e6e6',
                                borderRadius: '4px',
                                fontSize: '0.9rem'
                            }}
                            onKeyPress={(e) => e.key === 'Enter' && ajouterTache()}
                        />
                        <button 
                            className="btn-professional"
                            onClick={ajouterTache}
                            disabled={!nouvelleTache.trim()}
                        >
                            Ajouter
                        </button>
                    </div>

                    <div style={{ 
                        background: '#f8f9fa',
                        border: '1px solid #e6e6e6',
                        borderRadius: '4px',
                        padding: '1rem'
                    }}>
                        <div style={{ fontWeight: '500', marginBottom: '0.5rem' }}>
                            Liste des tâches ({taches.length}) :
                        </div>
                        {taches.length === 0 ? (
                            <div style={{ color: '#666666', fontStyle: 'italic' }}>
                                Aucune tâche pour le moment
                            </div>
                        ) : (
                            taches.map(tache => (
                                <div key={tache.id} style={{ 
                                    display: 'flex', 
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    padding: '0.5rem 0',
                                    borderBottom: '1px solid #e6e6e6'
                                }}>
                                    <span>{tache.texte}</span>
                                    <button 
                                        onClick={() => supprimerTache(tache.id)}
                                        style={{
                                            background: 'transparent',
                                            border: 'none',
                                            color: '#cc1016',
                                            cursor: 'pointer',
                                            fontSize: '0.8rem'
                                        }}
                                    >
                                        Supprimer
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            {/* Résumé pédagogique */}
            <div className="learning-objective">
                <div className="title">📚 Points clés à retenir</div>
                <div>
                    <strong>useState</strong> est le hook fondamental pour gérer l'état local :
                    <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
                        <li>Syntaxe : <code>const [valeur, setValeur] = useState(valeurInitiale)</code></li>
                        <li>Fonctionne avec tous types : string, number, object, array</li>
                        <li>Pour les objets/tableaux : toujours créer une nouvelle référence</li>
                        <li>Re-render automatique quand l'état change</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Demostate;
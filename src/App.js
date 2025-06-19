import './App.css';
import React, { useState } from 'react';
import { BrowserRouter, Route, NavLink, Switch } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import Demohistory from './components/Demohistory';
import Demostate from './components/Demostate';
import Page404 from './components/Page404';
import Demostatemultiples from './components/Demostatemultiples';
import DemoUseEffect from './components/DemoUseEffect';
import DemoUseEffect2 from './components/DemouseEffect2';
import DemoUseEffect3 from './components/DemouseEffect3';
import DemouseRef from './components/DemouseRef';
import DemoHooksPerso from './components/DemoHooksPerso';

function App() {
    const menuItems = [
        { name: 'accueil', to: '/', exact: true, text: 'Accueil' },
        { name: 'demohistory', to: '/demohistory', text: 'useHistory' },
        { name: 'demostate', to: '/demostate', text: 'useState' },
        { name: 'demostatemultiples', to: '/demostatemultiples', text: 'useState Avancé' },
        { name: 'demoUseEffect', to: '/demoUseEffect', text: 'useEffect Basique' },
        { name: 'demoUseEffect2', to: '/demoUseEffect2', text: 'useEffect Dépendances' },
        { name: 'demoUseEffect3', to: '/demoUseEffect3', text: 'useEffect API' },
        { name: 'demoUseRef', to: '/demoUseRef', text: 'useRef' },
        { name: 'perso', to: '/perso', text: 'Hooks Personnalisés' }
    ];

    return (
        <div style={{ backgroundColor: '#f3f2ef', minHeight: '100vh' }}>
            <BrowserRouter>
                {/* Header professionnel simple */}
                <header style={{ 
                    backgroundColor: '#ffffff', 
                    borderBottom: '1px solid #e6e6e6',
                    padding: '1rem 0'
                }}>
                    <Container>
                        <div className="professional-header">
                            <h1>Guide d'apprentissage React Hooks</h1>
                            <div className="subtitle">
                                Apprenez les hooks React étape par étape avec des exemples pratiques
                            </div>
                        </div>
                    </Container>
                </header>

                {/* Navigation épurée */}
                <nav className="simple-nav">
                    <Container>
                        <div style={{ 
                            display: 'flex', 
                            flexWrap: 'wrap',
                            gap: '0.5rem'
                        }}>
                            {menuItems.map((item) => (
                                <NavLink
                                    key={item.name}
                                    to={item.to}
                                    exact={item.exact}
                                    className="nav-item"
                                    activeClassName="active"
                                    style={{ textDecoration: 'none' }}
                                >
                                    {item.text}
                                </NavLink>
                            ))}
                        </div>
                    </Container>
                </nav>

                {/* Contenu principal */}
                <main style={{ padding: '2rem 0', minHeight: 'calc(100vh - 140px)' }}>
                    <Container>
                        <Switch>
                            <Route path="/" component={Demohistory} exact={true} />
                            <Route path="/demohistory" component={Demohistory} exact={true} />
                            <Route path="/demostate" component={Demostate} />
                            <Route path="/demostatemultiples" component={Demostatemultiples} />
                            <Route path="/demoUseEffect" component={DemoUseEffect} />
                            <Route path="/demoUseEffect2" component={DemoUseEffect2} />
                            <Route path="/demoUseEffect3" component={DemoUseEffect3} />
                            <Route path="/demoUseRef" component={DemouseRef} />
                            <Route path="/perso" component={DemoHooksPerso} />
                            <Route path="*" component={Page404} />
                        </Switch>
                    </Container>
                </main>

                {/* Footer simple */}
                <footer style={{ 
                    backgroundColor: '#ffffff',
                    borderTop: '1px solid #e6e6e6',
                    padding: '1.5rem 0',
                    marginTop: 'auto'
                }}>
                    <Container>
                        <div style={{ 
                            textAlign: 'center',
                            color: '#666666',
                            fontSize: '0.9rem'
                        }}>
                            <div style={{ marginBottom: '0.5rem' }}>
                                Guide d'apprentissage React Hooks
                            </div>
                            <div>
                                Exemples pratiques pour maîtriser les hooks React
                            </div>
                        </div>
                    </Container>
                </footer>
            </BrowserRouter>
        </div>
    );
}

export default App;


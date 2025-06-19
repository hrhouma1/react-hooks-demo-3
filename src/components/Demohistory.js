import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { 
    Container, 
    Header, 
    Segment, 
    Icon, 
    Message, 
    Card, 
    Button, 
    Divider, 
    List, 
    Label,
    Grid,
    Image,
    Loader
} from 'semantic-ui-react';

const Demohistory = (props) => {
    const history = useHistory();
    const [navigationHistory, setNavigationHistory] = useState([]);
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Logging pour démonstration
    console.log('📍 History object:', history);
    console.log('📦 Props:', props);

    useEffect(() => {
        document.title = "🌍 Demo useHistory - Guide des Pays";
        loadCountries();
        
        // Enregistrer la navigation initiale
        setNavigationHistory([{
            path: history.location.pathname,
            timestamp: new Date().toLocaleTimeString(),
            action: 'initial_load'
        }]);

        return () => {
            document.title = "React Hooks Démo";
        };
    }, [history.location.pathname]);

    const loadCountries = async () => {
        setLoading(true);
        setError(null);
        
        try {
            // Utilisation d'une nouvelle API de pays qui fonctionne
            const response = await fetch('https://restcountries.com/v3.1/region/europe?fields=name,capital,population,flags,region');
            
            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status}`);
            }
            
            const data = await response.json();
            console.log('🌍 Pays chargés:', data);
            setCountries(data.slice(0, 8)); // Limiter à 8 pays pour la démo
        } catch (err) {
            console.error('❌ Erreur de chargement:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const navigateTo = (path) => {
        // Enregistrer la navigation
        setNavigationHistory(prev => [...prev, {
            path: path,
            timestamp: new Date().toLocaleTimeString(),
            action: 'push'
        }]);
        
        history.push(path);
    };

    const goBack = () => {
        setNavigationHistory(prev => [...prev, {
            path: 'back',
            timestamp: new Date().toLocaleTimeString(),
            action: 'goBack'
        }]);
        
        history.goBack();
    };

    const goForward = () => {
        setNavigationHistory(prev => [...prev, {
            path: 'forward',
            timestamp: new Date().toLocaleTimeString(),
            action: 'goForward'
        }]);
        
        history.goForward();
    };

    const replace = (path) => {
        setNavigationHistory(prev => [...prev, {
            path: path,
            timestamp: new Date().toLocaleTimeString(),
            action: 'replace'
        }]);
        
        history.replace(path);
    };

    return (
        <Container className="demo-container">
            <Header as="h1" textAlign="center" style={{ marginBottom: '2rem' }}>
                <Icon name="history" color="purple" />
                useHistory Hook - Navigation Programmée
                <Header.Subheader>
                    🌍 Guide interactif des pays européens avec React Router
                </Header.Subheader>
            </Header>

            <Message info icon>
                <Icon name="info circle" />
                <Message.Content>
                    <Message.Header>Qu'est-ce que useHistory ?</Message.Header>
                    useHistory donne accès à l'objet history pour naviguer programmatiquement 
                    dans votre application React Router. Parfait pour rediriger après une action !
                </Message.Content>
            </Message>

            <Segment.Group>
                <Segment>
                    <Header as="h3">
                        <Icon name="gamepad" color="blue" />
                        Contrôles de Navigation
                    </Header>
                    
                    <Grid columns={2} stackable>
                        <Grid.Column>
                            <Card fluid>
                                <Card.Content>
                                    <Card.Header>
                                        <Icon name="arrow right" />
                                        Navigation Push
                                    </Card.Header>
                                    <Card.Description>
                                        Ajoute une nouvelle entrée dans l'historique
                                    </Card.Description>
                                </Card.Content>
                                <Card.Content extra>
                                    <Button.Group fluid>
                                        <Button 
                                            color="green" 
                                            onClick={() => navigateTo('/demostate')}
                                            icon="database"
                                            content="Demo State"
                                        />
                                        <Button 
                                            color="blue" 
                                            onClick={() => navigateTo('/demoUseEffect')}
                                            icon="lightning"
                                            content="UseEffect"
                                        />
                                    </Button.Group>
                                </Card.Content>
                            </Card>
                        </Grid.Column>

                        <Grid.Column>
                            <Card fluid>
                                <Card.Content>
                                    <Card.Header>
                                        <Icon name="history" />
                                        Contrôles Historique
                                    </Card.Header>
                                    <Card.Description>
                                        Navigue dans l'historique du navigateur
                                    </Card.Description>
                                </Card.Content>
                                <Card.Content extra>
                                    <Button.Group fluid>
                                        <Button 
                                            color="orange" 
                                            onClick={goBack}
                                            icon="arrow left"
                                            content="Précédent"
                                        />
                                        <Button 
                                            color="purple" 
                                            onClick={goForward}
                                            icon="arrow right"
                                            content="Suivant"
                                        />
                                    </Button.Group>
                                </Card.Content>
                            </Card>
                        </Grid.Column>
                    </Grid>

                    <Divider />

                    <Button 
                        color="red" 
                        onClick={() => replace('/demoUseRef')}
                        icon="refresh"
                        content="Replace vers UseRef (remplace l'entrée actuelle)"
                        fluid
                    />
                </Segment>

                <Segment>
                    <Header as="h3">
                        <Icon name="list" color="teal" />
                        Historique de Navigation
                        <Label color="teal" size="small" style={{ marginLeft: '1rem' }}>
                            {navigationHistory.length} actions
                        </Label>
                    </Header>

                    {navigationHistory.length > 0 ? (
                        <List divided relaxed>
                            {navigationHistory.map((entry, index) => (
                                <List.Item key={index}>
                                    <List.Icon 
                                        name={
                                            entry.action === 'push' ? 'arrow right' :
                                            entry.action === 'goBack' ? 'arrow left' :
                                            entry.action === 'goForward' ? 'arrow right' :
                                            entry.action === 'replace' ? 'refresh' :
                                            'home'
                                        } 
                                        color={
                                            entry.action === 'push' ? 'green' :
                                            entry.action === 'goBack' ? 'orange' :
                                            entry.action === 'goForward' ? 'purple' :
                                            entry.action === 'replace' ? 'red' :
                                            'blue'
                                        }
                                    />
                                    <List.Content>
                                        <List.Header>
                                            {entry.action === 'initial_load' ? 'Chargement initial' :
                                             entry.action === 'push' ? `Navigation vers ${entry.path}` :
                                             entry.action === 'goBack' ? 'Retour en arrière' :
                                             entry.action === 'goForward' ? 'Avancer' :
                                             `Remplacement vers ${entry.path}`}
                                        </List.Header>
                                        <List.Description>
                                            {entry.timestamp} - Action: {entry.action}
                                        </List.Description>
                                    </List.Content>
                                </List.Item>
                            ))}
                        </List>
                    ) : (
                        <Message>Aucune navigation enregistrée</Message>
                    )}
                </Segment>
            </Segment.Group>

            <Divider />

            <Segment raised>
                <Header as="h3">
                    <Icon name="world" color="green" />
                    🌍 Guide des Pays Européens
                    <Header.Subheader>
                        Créé avec React, React Router et l'API RestCountries
                    </Header.Subheader>
                </Header>

                {loading && (
                    <Segment placeholder>
                        <Loader active inline="centered" size="large">
                            Chargement des pays...
                        </Loader>
                    </Segment>
                )}

                {error && (
                    <Message negative>
                        <Message.Header>Erreur de chargement</Message.Header>
                        <p>{error}</p>
                        <Button onClick={loadCountries} color="red" size="small">
                            Réessayer
                        </Button>
                    </Message>
                )}

                {!loading && !error && countries.length > 0 && (
                    <Card.Group itemsPerRow={4} stackable>
                        {countries.map((country, index) => (
                            <Card key={index}>
                                <Image 
                                    src={country.flags?.png || '/placeholder-flag.png'} 
                                    wrapped 
                                    ui={false}
                                    style={{ height: '120px', objectFit: 'cover' }}
                                />
                                <Card.Content>
                                    <Card.Header>
                                        {country.name?.common || 'Nom non disponible'}
                                    </Card.Header>
                                    <Card.Meta>
                                        <Icon name="marker" />
                                        {country.capital?.[0] || 'Capitale inconnue'}
                                    </Card.Meta>
                                    <Card.Description>
                                        <Icon name="users" />
                                        {country.population?.toLocaleString() || 'Population inconnue'} habitants
                                    </Card.Description>
                                </Card.Content>
                                <Card.Content extra>
                                    <Label color="blue" size="small">
                                        {country.region}
                                    </Label>
                                </Card.Content>
                            </Card>
                        ))}
                    </Card.Group>
                )}
            </Segment>

            <Message success>
                <Message.Header>💡 Cas d'usage courants</Message.Header>
                <List bulleted>
                    <List.Item>Redirection après connexion/déconnexion</List.Item>
                    <List.Item>Navigation après soumission de formulaire</List.Item>
                    <List.Item>Retour programmatique (boutons précédent/suivant)</List.Item>
                    <List.Item>Remplacement d'URL sans ajouter à l'historique</List.Item>
                </List>
            </Message>
        </Container>
    );
};

export default Demohistory;
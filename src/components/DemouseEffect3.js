import React, { useEffect, useState } from 'react';
import { Container, Header, Segment, Icon, Message, Form, Input, Button, Card, Divider, Loader, List } from 'semantic-ui-react';

const DemoUseEffect3 = () => {
    const [projet, setProjet] = useState("");
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [departement, setDepartement] = useState("44");
    const [apiCalls, setApiCalls] = useState(0);

    // useEffect pour l'appel API - Version problématique (boucle infinie)
    // useEffect(() => {
    //     _getData();
    // }); // ⚠️ ATTENTION: Sans dépendances = boucle infinie !

    // useEffect correct pour l'initialisation
    useEffect(() => {
        console.log('🚀 Composant initialisé - Chargement des données');
        document.title = "🌐 useEffect & API - Démo";
        _getData();
        
        return () => {
            document.title = "React Hooks Démo";
        };
    }, []); // S'exécute une seule fois au montage

    // useEffect pour surveiller les changements de département
    useEffect(() => {
        if (departement && departement !== "44") {
            console.log(`🔄 Changement de département: ${departement}`);
            _getData();
        }
    }, [departement]); // Se déclenche quand le département change

    const _getData = async () => {
        setLoading(true);
        setError(null);
        setApiCalls(prev => prev + 1);
        
        try {
            console.log(`📡 Appel API pour le département ${departement}`);
            const response = await fetch(`https://etablissements-publics.api.gouv.fr/v3/departements/${departement}/caf`);
            
            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status}`);
            }
            
            const result = await response.json();
            console.log('✅ Données reçues:', result);
            setData(result);
        } catch (erreur) {
            console.error('❌ Erreur API:', erreur);
            setError(erreur.message);
        } finally {
            setLoading(false);
        }
    };

    const changerDepartement = (nouveauDept) => {
        setDepartement(nouveauDept);
    };

    const rechargerDonnees = () => {
        _getData();
    };

    return (
        <Container className="demo-container">
            <Header as="h1" textAlign="center" style={{ marginBottom: '2rem' }}>
                <Icon name="globe" color="teal" />
                useEffect & Appels API
                <Header.Subheader>
                    Gérer les appels réseau avec useEffect
                </Header.Subheader>
            </Header>

            <Message warning icon>
                <Icon name="warning sign" />
                <Message.Content>
                    <Message.Header>⚠️ Attention aux boucles infinies !</Message.Header>
                    Un useEffect sans dépendances qui modifie l'état peut créer une boucle infinie.
                    Toujours spécifier les dépendances correctement !
                </Message.Content>
            </Message>

            <Segment.Group>
                <Segment>
                    <Header as="h3">
                        <Icon name="search" color="blue" />
                        Recherche d'établissements publics
                    </Header>
                    
                    <Form>
                        <Form.Group widths="equal">
                            <Form.Field>
                                <label>Département (numéro)</label>
                                <Input
                                    placeholder="Ex: 44, 75, 13..."
                                    value={departement}
                                    onChange={(e) => setDepartement(e.target.value)}
                                    disabled={loading}
                                />
                            </Form.Field>
                            <Form.Field>
                                <label>Projet en cours</label>
                                <Input
                                    placeholder="Nom du projet (optionnel)"
                                    value={projet}
                                    onChange={(e) => setProjet(e.target.value)}
                                />
                            </Form.Field>
                        </Form.Group>
                        
                        <Button.Group>
                            <Button 
                                primary 
                                onClick={rechargerDonnees}
                                loading={loading}
                                disabled={!departement.trim()}
                                icon="refresh"
                                content="Recharger les données"
                            />
                            <Button 
                                secondary 
                                onClick={() => changerDepartement("75")}
                                disabled={loading}
                                content="Paris (75)"
                            />
                            <Button 
                                secondary 
                                onClick={() => changerDepartement("13")}
                                disabled={loading}
                                content="Marseille (13)"
                            />
                            <Button 
                                secondary 
                                onClick={() => changerDepartement("44")}
                                disabled={loading}
                                content="Loire-Atlantique (44)"
                            />
                        </Button.Group>
                    </Form>

                    <Segment basic textAlign="center">
                        <Message size="mini" color="purple">
                            <Icon name="chart line" />
                            Appels API effectués: {apiCalls}
                        </Message>
                    </Segment>
                </Segment>

                <Segment>
                    <Header as="h3">
                        <Icon name="database" color="green" />
                        Résultats de l'API
                    </Header>

                    {loading && (
                        <Segment placeholder>
                            <Loader active inline="centered" size="large">
                                Chargement des données...
                            </Loader>
                        </Segment>
                    )}

                    {error && (
                        <Message negative>
                            <Message.Header>Erreur lors du chargement</Message.Header>
                            <p>{error}</p>
                            <Button onClick={rechargerDonnees} color="red" size="small">
                                Réessayer
                            </Button>
                        </Message>
                    )}

                    {!loading && !error && data && (
                        <Card.Group>
                            {data.features && data.features.length > 0 ? (
                                data.features.slice(0, 6).map((etablissement, index) => (
                                    <Card key={index} fluid>
                                        <Card.Content>
                                            <Card.Header>
                                                <Icon name="building" color="blue" />
                                                {etablissement.properties.nom || 'Nom non disponible'}
                                            </Card.Header>
                                            <Card.Meta>
                                                <Icon name="map marker" />
                                                {etablissement.properties.adresse || 'Adresse non disponible'}
                                            </Card.Meta>
                                            <Card.Description>
                                                <List horizontal>
                                                    <List.Item>
                                                        <Icon name="phone" />
                                                        {etablissement.properties.telephone || 'N/A'}
                                                    </List.Item>
                                                    <List.Item>
                                                        <Icon name="mail" />
                                                        {etablissement.properties.email || 'N/A'}
                                                    </List.Item>
                                                </List>
                                            </Card.Description>
                                        </Card.Content>
                                    </Card>
                                ))
                            ) : (
                                <Message>
                                    <Icon name="search" />
                                    <Message.Header>Aucun résultat</Message.Header>
                                    <p>Aucun établissement trouvé pour ce département.</p>
                                </Message>
                            )}
                        </Card.Group>
                    )}

                    {!loading && !error && data && data.features && data.features.length > 6 && (
                        <Message>
                            <Icon name="info" />
                            Affichage des 6 premiers résultats sur {data.features.length} établissements trouvés.
                        </Message>
                    )}
                </Segment>
            </Segment.Group>

            <Divider />

            <Segment raised>
                <Header as="h3">
                    <Icon name="lightbulb" color="yellow" />
                    Bonnes pratiques avec les APIs
                </Header>
                
                <List relaxed divided>
                    <List.Item>
                        <List.Icon name="check circle" color="green" />
                        <List.Content>
                            <List.Header>Dépendances correctes</List.Header>
                            <List.Description>
                                useEffect(getData, []) pour charger une seule fois au montage
                            </List.Description>
                        </List.Content>
                    </List.Item>
                    
                    <List.Item>
                        <List.Icon name="loading" color="blue" />
                        <List.Content>
                            <List.Header>États de chargement</List.Header>
                            <List.Description>
                                Gérer loading, success, et error pour une meilleure UX
                            </List.Description>
                        </List.Content>
                    </List.Item>
                    
                    <List.Item>
                        <List.Icon name="shield" color="orange" />
                        <List.Content>
                            <List.Header>Gestion d'erreurs</List.Header>
                            <List.Description>
                                Toujours utiliser try/catch pour les appels API
                            </List.Description>
                        </List.Content>
                    </List.Item>

                    <List.Item>
                        <List.Icon name="warning sign" color="red" />
                        <List.Content>
                            <List.Header>Éviter les boucles infinies</List.Header>
                            <List.Description>
                                Ne jamais oublier les dépendances dans useEffect avec setState
                            </List.Description>
                        </List.Content>
                    </List.Item>
                </List>
            </Segment>

            <Message info>
                <Message.Header>🔍 API utilisée</Message.Header>
                <p>
                    Cette démo utilise l'API publique des établissements publics français.
                    Changez le département pour voir différents résultats !
                </p>
            </Message>
        </Container>
    );
};

export default DemoUseEffect3;
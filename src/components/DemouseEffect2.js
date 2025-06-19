import React, { useEffect, useState } from 'react';
import { Container, Header, Segment, Icon, Message, Form, Input, Button, List, Card, Divider, Label } from 'semantic-ui-react';

const DemoUseEffect2 = () => {
    const [projet, setProjet] = useState("");
    const [projets, setProjets] = useState([]);
    const [effectExecutions, setEffectExecutions] = useState(0);

    // useEffect qui se déclenche à chaque changement de "projet"
    useEffect(() => {
        console.log(`🔄 useEffect déclenché - Projet actuel: "${projet}"`);
        setEffectExecutions(prev => prev + 1);
        
        // Mise à jour du titre avec le projet actuel
        if (projet.trim()) {
            document.title = `📝 Projet: ${projet}`;
        } else {
            document.title = "📝 Gestion de Projets - useEffect";
        }
        
        // Fonction de nettoyage
        return () => {
            console.log('🧹 Nettoyage de l\'effet pour:', projet);
        };
    }, [projet]); // Dépendance: se réexécute quand "projet" change

    // useEffect pour l'initialisation
    useEffect(() => {
        console.log('🚀 Composant initialisé');
        document.title = "📝 Gestion de Projets - useEffect";
        
        return () => {
            document.title = "React Hooks Démo";
        };
    }, []); // S'exécute une seule fois

    const ajouterProjet = () => {
        if (projet.trim()) {
            setProjets(prev => [...prev, {
                id: Date.now(),
                nom: projet.trim(),
                dateAjout: new Date().toLocaleString()
            }]);
            setProjet(""); // Remet à zéro le champ
        }
    };

    const supprimerProjet = (id) => {
        setProjets(prev => prev.filter(p => p.id !== id));
    };

    const viderListe = () => {
        setProjets([]);
        setProjet("");
    };

    return (
        <Container className="demo-container">
            <Header as="h1" textAlign="center" style={{ marginBottom: '2rem' }}>
                <Icon name="sync" color="blue" />
                useEffect avec Dépendances
                <Header.Subheader>
                    Réagir aux changements d'état avec useEffect
                </Header.Subheader>
            </Header>

            <Message info icon>
                <Icon name="info circle" />
                <Message.Content>
                    <Message.Header>Concept clé : Dépendances</Message.Header>
                    Ce useEffect se déclenche à chaque fois que la valeur du champ "projet" change.
                    Observez la console pour voir les exécutions !
                </Message.Content>
            </Message>

            <Segment.Group>
                <Segment>
                    <Header as="h3">
                        <Icon name="plus" color="green" />
                        Ajouter un nouveau projet
                    </Header>
                    
                    <Form onSubmit={(e) => { e.preventDefault(); ajouterProjet(); }}>
                        <Form.Field>
                            <label>Nom du projet</label>
                            <Input
                                placeholder="Ex: Site web e-commerce, App mobile..."
                                value={projet}
                                onChange={(e) => setProjet(e.target.value)}
                                action={{
                                    color: 'blue',
                                    icon: 'plus',
                                    content: 'Ajouter',
                                    onClick: ajouterProjet,
                                    disabled: !projet.trim()
                                }}
                                fluid
                                size="large"
                            />
                        </Form.Field>
                    </Form>

                    <Segment basic textAlign="center">
                        <Label color="purple" size="large">
                            <Icon name="repeat" />
                            useEffect exécuté {effectExecutions} fois
                        </Label>
                    </Segment>
                </Segment>

                <Segment>
                    <Header as="h3">
                        <Icon name="list" color="orange" />
                        Liste des projets ({projets.length})
                        {projets.length > 0 && (
                            <Button 
                                floated="right" 
                                size="small" 
                                color="red" 
                                onClick={viderListe}
                                icon="trash"
                                content="Tout supprimer"
                            />
                        )}
                    </Header>

                    {projets.length === 0 ? (
                        <Message>
                            <Icon name="inbox" size="large" />
                            <Message.Header>Aucun projet ajouté</Message.Header>
                            <p>Commencez par ajouter votre premier projet ci-dessus !</p>
                        </Message>
                    ) : (
                        <Card.Group>
                            {projets.map((p) => (
                                <Card key={p.id} fluid>
                                    <Card.Content>
                                        <Card.Header>
                                            <Icon name="folder" color="blue" />
                                            {p.nom}
                                        </Card.Header>
                                        <Card.Meta>
                                            <Icon name="clock" />
                                            Ajouté le {p.dateAjout}
                                        </Card.Meta>
                                        <Card.Description>
                                            Projet #{p.id}
                                        </Card.Description>
                                    </Card.Content>
                                    <Card.Content extra>
                                        <Button
                                            size="small"
                                            color="red"
                                            onClick={() => supprimerProjet(p.id)}
                                            icon="trash"
                                            content="Supprimer"
                                        />
                                    </Card.Content>
                                </Card>
                            ))}
                        </Card.Group>
                    )}
                </Segment>
            </Segment.Group>

            <Divider />

            <Segment raised>
                <Header as="h3">
                    <Icon name="lightbulb" color="yellow" />
                    Comment ça fonctionne ?
                </Header>
                
                <List relaxed divided>
                    <List.Item>
                        <List.Icon name="keyboard" color="blue" />
                        <List.Content>
                            <List.Header>Saisie de texte</List.Header>
                            <List.Description>
                                À chaque caractère tapé, l'état "projet" change et déclenche useEffect
                            </List.Description>
                        </List.Content>
                    </List.Item>
                    
                    <List.Item>
                        <List.Icon name="sync" color="green" />
                        <List.Content>
                            <List.Header>useEffect réactif</List.Header>
                            <List.Description>
                                useEffect([projet]) surveille les changements et met à jour le titre de la page
                            </List.Description>
                        </List.Content>
                    </List.Item>
                    
                    <List.Item>
                        <List.Icon name="eye" color="orange" />
                        <List.Content>
                            <List.Header>Observation</List.Header>
                            <List.Description>
                                Le compteur d'exécutions montre combien de fois useEffect s'est déclenché
                            </List.Description>
                        </List.Content>
                    </List.Item>
                </List>
            </Segment>

            <Message success>
                <Message.Header>🎯 Challenge</Message.Header>
                <p>
                    Essayez de taper puis effacer du texte dans le champ. 
                    Observez le compteur et la console pour comprendre le comportement de useEffect !
                </p>
            </Message>
        </Container>
    );
};

export default DemoUseEffect2;
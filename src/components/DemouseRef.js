import React, { useEffect, useRef, useState } from 'react';
import { 
    Container, 
    Header, 
    Segment, 
    Icon, 
    Message, 
    Form, 
    Input, 
    Button, 
    Card, 
    Divider, 
    List,
    Grid,
    Label,
    Progress
} from 'semantic-ui-react';

const DemouseRef = () => {
    const [projet, setProjet] = useState("");
    const [compteur, setCompteur] = useState(0);
    const [taille, setTaille] = useState({ largeur: 0, hauteur: 0 });
    const [couleurFond, setCouleurFond] = useState("#f0f0f0");
    
    // Différentes références pour démontrer useRef
    const inputRef = useRef(); // Référence pour l'input principal
    const compteurRef = useRef(0); // Référence pour stocker une valeur persistante
    const divMesureRef = useRef(); // Référence pour mesurer un élément
    const intervalRef = useRef(); // Référence pour stocker un timer
    const premierRenduRef = useRef(true); // Référence pour détecter le premier rendu
    const inputFocusRef = useRef(); // Référence pour le focus automatique

    console.log('🎯 Références useRef:', {
        inputRef: inputRef.current,
        compteurRef: compteurRef.current,
        premierRendu: premierRenduRef.current
    });

    useEffect(() => {
        console.log('🚀 Composant monté');
        document.title = "🎯 Demo useRef - Références DOM";
        
        // Focus automatique sur l'input principal
        if (inputRef.current) {
            inputRef.current.focus();
        }

        // Mesurer la taille de l'élément
        if (divMesureRef.current) {
            mesurerElement();
        }

        // Démarrer un timer pour démonstration
        demarrerTimer();

        return () => {
            console.log('🧹 Nettoyage du composant');
            document.title = "React Hooks Démo";
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []);

    // useEffect pour démontrer la différence entre état et ref
    useEffect(() => {
        if (premierRenduRef.current) {
            console.log('🔵 Premier rendu du composant');
            premierRenduRef.current = false;
        } else {
            console.log('🔄 Re-rendu du composant - compteur:', compteur);
        }
        
        // Mettre à jour la référence (ne déclenche pas de re-rendu)
        compteurRef.current = compteur;
    });

    const mesurerElement = () => {
        if (divMesureRef.current) {
            const rect = divMesureRef.current.getBoundingClientRect();
            setTaille({
                largeur: Math.round(rect.width),
                hauteur: Math.round(rect.height)
            });
        }
    };

    const demarrerTimer = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        
        intervalRef.current = setInterval(() => {
            console.log('⏰ Timer - valeur actuelle du compteur (via ref):', compteurRef.current);
        }, 3000);
    };

    const arreterTimer = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    };

    const focusSurInput = () => {
        if (inputRef.current) {
            inputRef.current.focus();
            inputRef.current.select(); // Sélectionner tout le texte
        }
    };

    const focusSurInputSpecial = () => {
        if (inputFocusRef.current) {
            inputFocusRef.current.focus();
        }
    };

    const viderInput = () => {
        setProjet("");
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    const changerCouleurAleatoire = () => {
        const couleurs = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3'];
        const couleurAleatoire = couleurs[Math.floor(Math.random() * couleurs.length)];
        setCouleurFond(couleurAleatoire);
        
        // Forcer une re-mesure après changement de style
        setTimeout(mesurerElement, 100);
    };

    const incrementerCompteur = () => {
        setCompteur(prev => prev + 1);
    };

    const resetCompteur = () => {
        setCompteur(0);
        compteurRef.current = 0;
    };

    const afficherValeurRef = () => {
        alert(`Valeur stockée dans la référence: ${compteurRef.current}\nValeur de l'état: ${compteur}`);
    };

    return (
        <Container className="demo-container">
            <Header as="h1" textAlign="center" style={{ marginBottom: '2rem' }}>
                <Icon name="crosshairs" color="red" />
                useRef Hook - Références DOM & Valeurs Persistantes
                <Header.Subheader>
                    🎯 Accédez aux éléments DOM et stockez des valeurs sans re-rendu
                </Header.Subheader>
            </Header>

            <Message info icon>
                <Icon name="info circle" />
                <Message.Content>
                    <Message.Header>Qu'est-ce que useRef ?</Message.Header>
                    useRef permet de créer des références vers des éléments DOM ou de stocker 
                    des valeurs mutables qui persistent entre les rendus sans déclencher de re-rendu.
                </Message.Content>
            </Message>

            <Segment.Group>
                <Segment>
                    <Header as="h3">
                        <Icon name="keyboard" color="blue" />
                        Référence DOM - Manipulation d'Input
                    </Header>
                    
                    <Form>
                        <Form.Field>
                            <label>Ajouter un projet (focus automatique)</label>
                            <Input
                                ref={inputRef}
                                placeholder="Tapez le nom de votre projet..."
                                value={projet}
                                onChange={(e) => setProjet(e.target.value)}
                                size="large"
                                fluid
                            />
                        </Form.Field>
                    </Form>

                    <Segment basic>
                        <Label color="blue" size="large">
                            Projet: "{projet}" ({projet.length} caractères)
                        </Label>
                    </Segment>

                    <Button.Group fluid>
                        <Button 
                            color="green" 
                            onClick={focusSurInput}
                            icon="bullseye"
                            content="Focus + Sélection"
                        />
                        <Button 
                            color="orange" 
                            onClick={viderInput}
                            icon="eraser"
                            content="Vider + Focus"
                        />
                    </Button.Group>
                </Segment>

                <Segment>
                    <Header as="h3">
                        <Icon name="calculator" color="purple" />
                        Comparaison État vs Référence
                    </Header>
                    
                    <Grid columns={2} stackable>
                        <Grid.Column>
                            <Card fluid>
                                <Card.Content textAlign="center">
                                    <Card.Header>État (useState)</Card.Header>
                                    <Label color="purple" size="huge">
                                        {compteur}
                                    </Label>
                                    <Card.Description>
                                        Déclenche un re-rendu à chaque changement
                                    </Card.Description>
                                </Card.Content>
                            </Card>
                        </Grid.Column>
                        <Grid.Column>
                            <Card fluid>
                                <Card.Content textAlign="center">
                                    <Card.Header>Référence (useRef)</Card.Header>
                                    <Label color="teal" size="huge">
                                        {compteurRef.current}
                                    </Label>
                                    <Card.Description>
                                        Valeur persistante sans re-rendu
                                    </Card.Description>
                                </Card.Content>
                            </Card>
                        </Grid.Column>
                    </Grid>

                    <Button.Group fluid>
                        <Button 
                            color="green" 
                            onClick={incrementerCompteur}
                            icon="plus"
                            content="Incrémenter"
                        />
                        <Button 
                            color="blue" 
                            onClick={afficherValeurRef}
                            icon="eye"
                            content="Voir valeur ref"
                        />
                        <Button 
                            color="grey" 
                            onClick={resetCompteur}
                            icon="refresh"
                            content="Reset"
                        />
                    </Button.Group>
                </Segment>
            </Segment.Group>

            <Grid columns={2} stackable>
                <Grid.Column>
                    <Segment>
                        <Header as="h3">
                            <Icon name="resize horizontal" color="teal" />
                            Mesure d'Élément DOM
                        </Header>
                        
                        <div 
                            ref={divMesureRef}
                            style={{ 
                                backgroundColor: couleurFond,
                                padding: '2rem',
                                borderRadius: '8px',
                                transition: 'all 0.3s ease',
                                textAlign: 'center'
                            }}
                        >
                            <Icon name="expand" size="large" />
                            <p>Élément mesuré dynamiquement</p>
                            <Label color="teal">
                                {taille.largeur} × {taille.hauteur} px
                            </Label>
                        </div>

                        <Button 
                            fluid 
                            color="teal" 
                            onClick={changerCouleurAleatoire}
                            icon="paint brush"
                            content="Changer couleur + re-mesurer"
                            style={{ marginTop: '1rem' }}
                        />
                    </Segment>
                </Grid.Column>

                <Grid.Column>
                    <Segment>
                        <Header as="h3">
                            <Icon name="clock" color="orange" />
                            Gestion de Timer
                        </Header>
                        
                        <Message size="small">
                            <Icon name="info" />
                            Un timer log la valeur du compteur toutes les 3 secondes
                        </Message>

                        <Form.Field>
                            <label>Input avec focus programmé</label>
                            <Input
                                ref={inputFocusRef}
                                placeholder="Cliquez le bouton pour me donner le focus"
                                fluid
                            />
                        </Form.Field>

                        <Button.Group fluid vertical>
                            <Button 
                                color="green" 
                                onClick={demarrerTimer}
                                icon="play"
                                content="Redémarrer Timer"
                            />
                            <Button 
                                color="red" 
                                onClick={arreterTimer}
                                icon="stop"
                                content="Arrêter Timer"
                            />
                            <Button 
                                color="blue" 
                                onClick={focusSurInputSpecial}
                                icon="bullseye"
                                content="Focus Input Spécial"
                            />
                        </Button.Group>
                    </Segment>
                </Grid.Column>
            </Grid>

            <Divider />

            <Segment raised>
                <Header as="h3">
                    <Icon name="lightbulb" color="yellow" />
                    Cas d'usage de useRef
                </Header>
                
                <List relaxed divided>
                    <List.Item>
                        <List.Icon name="mouse pointer" color="blue" />
                        <List.Content>
                            <List.Header>Manipulation DOM directe</List.Header>
                            <List.Description>
                                Focus, scroll, mesures d'éléments, animations
                            </List.Description>
                        </List.Content>
                    </List.Item>
                    
                    <List.Item>
                        <List.Icon name="database" color="green" />
                        <List.Content>
                            <List.Header>Stockage de valeurs persistantes</List.Header>
                            <List.Description>
                                Variables qui ne doivent pas déclencher de re-rendu
                            </List.Description>
                        </List.Content>
                    </List.Item>
                    
                    <List.Item>
                        <List.Icon name="clock" color="orange" />
                        <List.Content>
                            <List.Header>Gestion de timers et intervals</List.Header>
                            <List.Description>
                                Stocker les IDs pour pouvoir les nettoyer
                            </List.Description>
                        </List.Content>
                    </List.Item>

                    <List.Item>
                        <List.Icon name="exchange" color="purple" />
                        <List.Content>
                            <List.Header>Valeurs précédentes</List.Header>
                            <List.Description>
                                Comparer avec les valeurs des rendus précédents
                            </List.Description>
                        </List.Content>
                    </List.Item>
                </List>
            </Segment>

            <Message warning>
                <Message.Header>⚠️ Important</Message.Header>
                <p>
                    Modifier <code>.current</code> ne déclenche pas de re-rendu ! 
                    Utilisez useState pour les données qui affectent l'affichage.
                </p>
            </Message>

            <Message success>
                <Message.Header>🎯 Démonstrations actives</Message.Header>
                <List bulleted>
                    <List.Item>Focus automatique au montage du composant</List.Item>
                    <List.Item>Timer qui log en arrière-plan (vérifiez la console)</List.Item>
                    <List.Item>Mesure en temps réel de la taille d'élément</List.Item>
                    <List.Item>Comparaison entre état et référence</List.Item>
                </List>
            </Message>
        </Container>
    );
};

export default DemouseRef;
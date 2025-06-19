import React, { useState, useEffect } from 'react';
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
    Label, 
    List,
    Grid,
    Statistic,
    Modal,
    Dropdown
} from 'semantic-ui-react';

const Demostatemultiples = () => {
    const [projet, setProjet] = useState("")
    const [projets, setProjets] = useState([])
    const [filtre, setFiltre] = useState("tous");
    const [modalOuverte, setModalOuverte] = useState(false);
    const [projetASupprimer, setProjetASupprimer] = useState(null);
    const [recherche, setRecherche] = useState("");
    const [triPar, setTriPar] = useState("recent");

    console.log('📊 États multiples:', { 
        projet, 
        projets: projets.length, 
        filtre, 
        recherche,
        triPar 
    });

    useEffect(() => {
        document.title = "📋 Demo useState - États Multiples";
        
        return () => {
            document.title = "React Hooks Démo";
        };
    }, []);

    const addProjet = () => {
        if (projet.trim() !== "") {
            const nouveauProjet = {
                id: Date.now(),
                nom: projet.trim(),
                statut: "en_cours",
                dateCreation: new Date(),
                dateModification: new Date(),
                priorite: "normale"
            };
            setProjets(prev => [...prev, nouveauProjet]);
            setProjet("");
        }
    };

    const changerStatutProjet = (id, nouveauStatut) => {
        setProjets(prev => prev.map(p => 
            p.id === id 
                ? { ...p, statut: nouveauStatut, dateModification: new Date() }
                : p
        ));
    };

    const changerPrioriteProjet = (id, nouvellePriorite) => {
        setProjets(prev => prev.map(p => 
            p.id === id 
                ? { ...p, priorite: nouvellePriorite, dateModification: new Date() }
                : p
        ));
    };

    const supprimerProjet = (id) => {
        setProjets(prev => prev.filter(p => p.id !== id));
        setModalOuverte(false);
        setProjetASupprimer(null);
    };

    const ouvrirModalSuppression = (projet) => {
        setProjetASupprimer(projet);
        setModalOuverte(true);
    };

    const viderTousLesProjets = () => {
        setProjets([]);
        setRecherche("");
        setFiltre("tous");
    };

    // Logique de filtrage et tri
    const projetsFiltres = projets.filter(p => {
        const correspondRecherche = p.nom.toLowerCase().includes(recherche.toLowerCase());
        const correspondFiltre = filtre === "tous" || p.statut === filtre;
        return correspondRecherche && correspondFiltre;
    });

    const projetsTries = [...projetsFiltres].sort((a, b) => {
        switch (triPar) {
            case "alphabetique":
                return a.nom.localeCompare(b.nom);
            case "ancien":
                return a.dateCreation - b.dateCreation;
            case "recent":
            default:
                return b.dateCreation - a.dateCreation;
        }
    });

    // Statistiques
    const statsStatuts = {
        en_cours: projets.filter(p => p.statut === "en_cours").length,
        termine: projets.filter(p => p.statut === "termine").length,
        en_pause: projets.filter(p => p.statut === "en_pause").length
    };

    const statsPriorites = {
        haute: projets.filter(p => p.priorite === "haute").length,
        normale: projets.filter(p => p.priorite === "normale").length,
        basse: projets.filter(p => p.priorite === "basse").length
    };

    const optionsFiltre = [
        { key: 'tous', text: 'Tous les projets', value: 'tous' },
        { key: 'en_cours', text: 'En cours', value: 'en_cours' },
        { key: 'termine', text: 'Terminés', value: 'termine' },
        { key: 'en_pause', text: 'En pause', value: 'en_pause' }
    ];

    const optionsTri = [
        { key: 'recent', text: 'Plus récents', value: 'recent' },
        { key: 'ancien', text: 'Plus anciens', value: 'ancien' },
        { key: 'alphabetique', text: 'Alphabétique', value: 'alphabetique' }
    ];

    const optionsPriorite = [
        { key: 'basse', text: 'Basse', value: 'basse' },
        { key: 'normale', text: 'Normale', value: 'normale' },
        { key: 'haute', text: 'Haute', value: 'haute' }
    ];

    const getStatutColor = (statut) => {
        switch (statut) {
            case "en_cours": return "blue";
            case "termine": return "green";
            case "en_pause": return "orange";
            default: return "grey";
        }
    };

    const getPrioriteColor = (priorite) => {
        switch (priorite) {
            case "haute": return "red";
            case "normale": return "yellow";
            case "basse": return "grey";
            default: return "grey";
        }
    };

    return (
        <Container className="demo-container">
            <Header as="h1" textAlign="center" style={{ marginBottom: '2rem' }}>
                <Icon name="tasks" color="violet" />
                useState - Gestion d'États Multiples
                <Header.Subheader>
                    📋 Démonstration avancée avec filtrage, recherche et statistiques
                </Header.Subheader>
            </Header>

            <Message info icon>
                <Icon name="info circle" />
                <Message.Content>
                    <Message.Header>États Multiples Coordonnés</Message.Header>
                    Ce composant démontre comment gérer plusieurs états useState qui interagissent ensemble 
                    pour créer une application complexe avec filtrage, recherche et tri.
                </Message.Content>
            </Message>

            <Segment.Group>
                <Segment>
                    <Header as="h3">
                        <Icon name="plus" color="green" />
                        Ajouter un Nouveau Projet
                    </Header>
                    
                    <Form onSubmit={(e) => { e.preventDefault(); addProjet(); }}>
                        <Form.Field>
                            <Input
                                placeholder="Nom du projet (ex: Site web e-commerce, App mobile...)"
                                value={projet}
                                onChange={(e) => setProjet(e.target.value)}
                                action={{
                                    color: 'green',
                                    icon: 'plus',
                                    content: 'Ajouter le projet',
                                    onClick: addProjet,
                                    disabled: !projet.trim()
                                }}
                                size="large"
                                fluid
                            />
                        </Form.Field>
                    </Form>

                    <Segment basic>
                        <Label color="blue" size="large">
                            Projet en saisie: "{projet}"
                        </Label>
                    </Segment>
                </Segment>

                <Segment>
                    <Header as="h3">
                        <Icon name="filter" color="blue" />
                        Filtres et Recherche
                    </Header>
                    
                    <Grid columns={3} stackable>
                        <Grid.Column>
                            <Form.Field>
                                <label>Rechercher</label>
                                <Input
                                    icon="search"
                                    placeholder="Rechercher un projet..."
                                    value={recherche}
                                    onChange={(e) => setRecherche(e.target.value)}
                                />
                            </Form.Field>
                        </Grid.Column>
                        <Grid.Column>
                            <Form.Field>
                                <label>Filtrer par statut</label>
                                <Dropdown
                                    selection
                                    value={filtre}
                                    onChange={(e, { value }) => setFiltre(value)}
                                    options={optionsFiltre}
                                    fluid
                                />
                            </Form.Field>
                        </Grid.Column>
                        <Grid.Column>
                            <Form.Field>
                                <label>Trier par</label>
                                <Dropdown
                                    selection
                                    value={triPar}
                                    onChange={(e, { value }) => setTriPar(value)}
                                    options={optionsTri}
                                    fluid
                                />
                            </Form.Field>
                        </Grid.Column>
                    </Grid>
                </Segment>
            </Segment.Group>

            <Grid columns={2} stackable>
                <Grid.Column>
                    <Segment>
                        <Header as="h3">
                            <Icon name="chart bar" color="teal" />
                            Statistiques par Statut
                        </Header>
                        <Statistic.Group widths="three" size="mini">
                            <Statistic color="blue">
                                <Statistic.Value>{statsStatuts.en_cours}</Statistic.Value>
                                <Statistic.Label>En cours</Statistic.Label>
                            </Statistic>
                            <Statistic color="green">
                                <Statistic.Value>{statsStatuts.termine}</Statistic.Value>
                                <Statistic.Label>Terminés</Statistic.Label>
                            </Statistic>
                            <Statistic color="orange">
                                <Statistic.Value>{statsStatuts.en_pause}</Statistic.Value>
                                <Statistic.Label>En pause</Statistic.Label>
                            </Statistic>
                        </Statistic.Group>
                    </Segment>
                </Grid.Column>
                <Grid.Column>
                    <Segment>
                        <Header as="h3">
                            <Icon name="flag" color="red" />
                            Statistiques par Priorité
                        </Header>
                        <Statistic.Group widths="three" size="mini">
                            <Statistic color="red">
                                <Statistic.Value>{statsPriorites.haute}</Statistic.Value>
                                <Statistic.Label>Haute</Statistic.Label>
                            </Statistic>
                            <Statistic color="yellow">
                                <Statistic.Value>{statsPriorites.normale}</Statistic.Value>
                                <Statistic.Label>Normale</Statistic.Label>
                            </Statistic>
                            <Statistic color="grey">
                                <Statistic.Value>{statsPriorites.basse}</Statistic.Value>
                                <Statistic.Label>Basse</Statistic.Label>
                            </Statistic>
                        </Statistic.Group>
                    </Segment>
                </Grid.Column>
            </Grid>

            <Divider />

            <Segment raised>
                <Header as="h3">
                    <Icon name="list" color="purple" />
                    Liste des Projets 
                    <Label color="purple" size="small" style={{ marginLeft: '1rem' }}>
                        {projetsTries.length} sur {projets.length}
                    </Label>
                    {projets.length > 0 && (
                        <Button 
                            floated="right" 
                            size="small" 
                            color="red" 
                            onClick={viderTousLesProjets}
                            icon="trash"
                            content="Vider tout"
                        />
                    )}
                </Header>

                {projetsTries.length === 0 ? (
                    <Message>
                        <Icon name="search" />
                        <Message.Header>
                            {projets.length === 0 ? "Aucun projet" : "Aucun résultat"}
                        </Message.Header>
                        <p>
                            {projets.length === 0 
                                ? "Commencez par ajouter votre premier projet !" 
                                : "Essayez de modifier vos critères de recherche ou de filtre."
                            }
                        </p>
                    </Message>
                ) : (
                    <Card.Group>
                        {projetsTries.map((projetItem) => (
                            <Card key={projetItem.id} fluid>
                                <Card.Content>
                                    <Card.Header>
                                        <Icon name="folder" />
                                        {projetItem.nom}
                                    </Card.Header>
                                    <Card.Meta>
                                        Créé le {projetItem.dateCreation.toLocaleDateString()}
                                        {projetItem.dateModification > projetItem.dateCreation && (
                                            <span> • Modifié le {projetItem.dateModification.toLocaleDateString()}</span>
                                        )}
                                    </Card.Meta>
                                    <Card.Description>
                                        <Label color={getStatutColor(projetItem.statut)} size="small">
                                            {projetItem.statut.replace('_', ' ')}
                                        </Label>
                                        <Label color={getPrioriteColor(projetItem.priorite)} size="small">
                                            Priorité {projetItem.priorite}
                                        </Label>
                                    </Card.Description>
                                </Card.Content>
                                <Card.Content extra>
                                    <Button.Group size="small">
                                        <Dropdown
                                            button
                                            text="Statut"
                                            icon="tag"
                                            labeled
                                            className="icon"
                                            color={getStatutColor(projetItem.statut)}
                                        >
                                            <Dropdown.Menu>
                                                <Dropdown.Item 
                                                    onClick={() => changerStatutProjet(projetItem.id, "en_cours")}
                                                    text="En cours"
                                                />
                                                <Dropdown.Item 
                                                    onClick={() => changerStatutProjet(projetItem.id, "termine")}
                                                    text="Terminé"
                                                />
                                                <Dropdown.Item 
                                                    onClick={() => changerStatutProjet(projetItem.id, "en_pause")}
                                                    text="En pause"
                                                />
                                            </Dropdown.Menu>
                                        </Dropdown>
                                        
                                        <Dropdown
                                            button
                                            text="Priorité"
                                            icon="flag"
                                            labeled
                                            className="icon"
                                            color={getPrioriteColor(projetItem.priorite)}
                                        >
                                            <Dropdown.Menu>
                                                {optionsPriorite.map(option => (
                                                    <Dropdown.Item 
                                                        key={option.key}
                                                        onClick={() => changerPrioriteProjet(projetItem.id, option.value)}
                                                        text={option.text}
                                                    />
                                                ))}
                                            </Dropdown.Menu>
                                        </Dropdown>
                                        
                                        <Button
                                            color="red"
                                            onClick={() => ouvrirModalSuppression(projetItem)}
                                            icon="trash"
                                        />
                                    </Button.Group>
                                </Card.Content>
                            </Card>
                        ))}
                    </Card.Group>
                )}
            </Segment>

            <Modal
                size="small"
                open={modalOuverte}
                onClose={() => setModalOuverte(false)}
            >
                <Modal.Header>Confirmer la suppression</Modal.Header>
                <Modal.Content>
                    <p>Êtes-vous sûr de vouloir supprimer le projet "{projetASupprimer?.nom}" ?</p>
                    <p>Cette action est irréversible.</p>
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={() => setModalOuverte(false)}>
                        Annuler
                    </Button>
                    <Button 
                        color="red" 
                        onClick={() => supprimerProjet(projetASupprimer?.id)}
                        icon="trash"
                        content="Supprimer"
                    />
                </Modal.Actions>
            </Modal>

            <Message success>
                <Message.Header>🎯 États coordonnés démontrés</Message.Header>
                <List bulleted>
                    <List.Item><strong>projets[]:</strong> Collection principale des données</List.Item>
                    <List.Item><strong>projet:</strong> Valeur temporaire du formulaire</List.Item>
                    <List.Item><strong>filtre:</strong> Critère de filtrage actuel</List.Item>
                    <List.Item><strong>recherche:</strong> Terme de recherche</List.Item>
                    <List.Item><strong>triPar:</strong> Critère de tri</List.Item>
                    <List.Item><strong>modalOuverte:</strong> État de l'interface</List.Item>
                </List>
            </Message>
        </Container>
    );
};

export default Demostatemultiples;
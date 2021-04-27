import { useState, useEffect } from "react";
import {
    Container,
    Jumbotron,
    Row,
    Col,
    Image,
    Card,
} from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { Character } from "../../characterTypes/characters";
import { CarouselInfor } from "../../components/carousel/carousel";
import { getParticipation } from "../../provider/service";
import styles from "./description.module.css";

const Description = (): JSX.Element => {
    const params = useLocation();
    const { state } = params;
    const [events, setEvents] = useState([]);
    const [series, setSeries] = useState([]);
    const [comics, setComics] = useState([]);
    const character: Character | any = state;

    useEffect(() => {
        if (character?.id) {
            Promise.all([
                getParticipation(character.id, "series"),
                getParticipation(character.id, "events"),
                getParticipation(character.id, "comics"),
            ]).then((response) => {
                setSeries(response[0]?.results);
                setEvents(response[1]?.results);
                setComics(response[2]?.results);
            });
        }
        return () => {
            setSeries([]);
            setComics([]);
            setEvents([]);
        };
    }, []);
    return (
        <Jumbotron>
            <Container>
                {!character ? (
                    <div>Nenhum personagem encontrado!</div>
                ) : (
                    <>
                        <h1 className="labelHeader" data-testid="labelheader">
                            Descricao do personagem
                        </h1>
                        <Row>
                            <Col md={6} xs={12}>
                                <div>
                                    <Image
                                        src={`${ character?.thumbnail?.path }.${ character?.thumbnail?.extension }`}
                                        alt=""
                                        className={styles.picture}
                                    />
                                </div>
                            </Col>
                            <Col md={6} xs={12}>
                                <Card>
                                    <Card.Body>
                                        <Card.Title className="labelHeader">
                                            {character.name}
                                        </Card.Title>
                                        <Card.Subtitle className="mb-2 labelHeader text-muted">
                                            {character.description}
                                        </Card.Subtitle>
                                        <Card.Subtitle className="mt-2 labelHeader text-muted">
                                            Aparições:
                                        </Card.Subtitle>
                                        <div
                                            className="labelHeader "
                                            style={{
                                                fontSize: 15,
                                                fontWeight: 500,
                                            }}
                                        >
                                            <ul>
                                                <li>
                                                    Quadrinhos:{" "}
                                                    {
                                                        character?.comics
                                                            ?.available
                                                    }
                                                </li>
                                                <li>
                                                    Eventos:{" "}
                                                    {
                                                        character?.events
                                                            ?.available
                                                    }
                                                </li>
                                                <li>
                                                    Séries:{" "}
                                                    {
                                                        character?.series
                                                            ?.available
                                                    }
                                                </li>
                                            </ul>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                        <Row className="pt-3">
                            <Col md={4}>
                                <CarouselInfor data={series} type="series" />
                            </Col>
                            <Col md={4}>
                                <CarouselInfor data={comics} type="comics" />
                            </Col>
                            <Col md={4}>
                                <CarouselInfor data={events} type="events" />
                            </Col>
                        </Row>
                    </>
                )}
            </Container>
        </Jumbotron>
    );
};

export default Description;

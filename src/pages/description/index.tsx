// import { useEffect, useState, useCallback } from "react";
// import { useRequestContext } from "../../provider/requestContext";
import {
    Container,
    Jumbotron,
    Row,
    Col,
    Image,
    Card,
    Carousel,
} from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { Character } from "../../characterTypes/characters";
import { CharacterValue } from "../../characterTypes/charactersValues";
import { CarouselInfor } from "../../components/carousel";
import styles from "./description.module.css";

const Description = (): JSX.Element => {
    const params = useLocation();
    const { state } = params;
    const character: Character | any = state || CharacterValue;
    console.log("char", character);
    return (
        <Jumbotron>
            <Container>
                <h1 className="labelHeader" data-testid="labelheader">
                    Busca de personagens
                </h1>
                <Row>
                    <Col md={6} xs={12}>
                        <div>
                            <Image
                                src={`${character?.thumbnail?.path}.${character?.thumbnail?.extension}`}
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
                                    style={{ fontSize: 15, fontWeight: 500 }}
                                >
                                    <ul>
                                        <li>
                                            Quadrinhos:{" "}
                                            {character?.comics?.available}
                                        </li>
                                        <li>
                                            Eventos:{" "}
                                            {character?.events?.available}
                                        </li>
                                        <li>
                                            Séries:{" "}
                                            {character?.series?.available}
                                        </li>
                                    </ul>
                                </div>
                            </Card.Body>
                        </Card>
                        <CarouselInfor />
                    </Col>
                </Row>
            </Container>
        </Jumbotron>
    );
};

export default Description;

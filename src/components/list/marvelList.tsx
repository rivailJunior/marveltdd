import { Character } from "../../characterTypes/characters";
import { ListGroup, Col, Row, Image } from "react-bootstrap";
import styles from "./marvelList.module.css";
import { ListInformationItem } from "./listInformationItem";
import { useHistory } from "react-router-dom";

type iProps = {
    data: Character[];
    errInfor: boolean;
};

export const MarvelList = ({ data, errInfor }: iProps): JSX.Element => {
    let history = useHistory();

    const changePage = (item: Character | any) => {
        history.push("/description", item);
    };

    const showOrHideList = !errInfor ? styles.showList : styles.hideList;
    const showOrHideInformation = errInfor ? styles.showList : styles.hideList;
    return (
        <>
            <div className={"labelHeader " + showOrHideInformation}>
                Nenhum personagem encontrado
            </div>
            <ListGroup variant="flush" className={showOrHideList}>
                <ListGroup.Item style={{ backgroundColor: "transparent" }}>
                    <Row>
                        <Col md={2}></Col>
                        <Col md={2}>
                            <div className={styles.defaultLabel}>
                                Personagem
                            </div>
                        </Col>
                        <Col md={4} className="d-none d-lg-block">
                            <div className={styles.defaultLabel}>Séries</div>
                        </Col>
                        <Col md={4} className="d-none d-lg-block">
                            <div className={styles.defaultLabel}>Eventos</div>
                        </Col>
                    </Row>
                </ListGroup.Item>
            </ListGroup>
            <ListGroup className={styles.listGroup}>
                {data.map((character, index) => {
                    return (
                        <ListGroup.Item
                            key={index}
                            onClick={() => changePage(character)}
                            data-testid="marvelLi"
                        >
                            <Row>
                                <Col md={2} xs={6} lg={true}>
                                    <div className={styles.listImgDiv}>
                                        <Image
                                            className={styles.thumbImg}
                                            rounded
                                            src={`${ character?.thumbnail?.path }.${ character?.thumbnail?.extension }`}
                                            alt=""
                                        />
                                    </div>
                                </Col>
                                <Col md={2} xs={6} lg={true}>
                                    <div className={styles.defaultLabel}>
                                        {character.name}
                                    </div>
                                </Col>
                                <Col md={4} className="d-none d-lg-block">
                                    <ListInformationItem
                                        list={character.series?.items}
                                        tagName="name"
                                        information="Séries"
                                    />
                                </Col>
                                <Col md={4} className="d-none d-lg-block">
                                    <ListInformationItem
                                        list={character.events?.items}
                                        tagName="name"
                                        information="Eventos"
                                    />
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    );
                })}
            </ListGroup>
        </>
    );
};

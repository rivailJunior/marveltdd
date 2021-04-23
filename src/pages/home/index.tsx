import { useEffect, useState, useCallback } from "react";
import { useRequestContext } from "../../provider/requestContext";
import { Container, Jumbotron, Row, Col } from "react-bootstrap";
import { Character } from "../../characterTypes/characters";
import { CharacterValue } from "../../characterTypes/charactersValues";
import { MarvelList } from "../../components/marvelList";
import { MarvelPagination } from "../../components/marvelPagination";
import styles from "./index.module.css";
import { MarvelInputSearch } from "../../components/marvelInputSearch";

function Index(): JSX.Element {
    const { getCharacters, getCharacter } = useRequestContext();
    const [list, setlist] = useState<[Character]>([CharacterValue]);
    const [pagination, setPagination] = useState({
        numberPages: 0,
        currentPage: 0,
    });

    useEffect(() => {
        getList();
    }, []);

    const getList = useCallback(async () => {
        try {
            const response = await getCharacters(10);
            setlist(response?.results);
            setPagination({ numberPages: response?.total, currentPage: 0 });
        } catch (err) {
            // console.log("err", err);
        }
    }, [getCharacters]);

    const getCharacterByName = useCallback(
        async (name: string) => {
            try {
                if (name.length) {
                    const response: [Character] = await getCharacter(
                        parseInt(name)
                    );
                    setlist(response);
                } else {
                    getList();
                }
            } catch (err) {
                console.log("err getCharacterByName", err);
            }
        },
        [getCharacter]
    );

    return (
        <div>
            <Jumbotron>
                <Container>
                    <>
                        <h1 className="labelHeader" data-testid="labelheader">
                            Busca de personagens
                        </h1>
                        <Row>
                            <Col md={3}>
                                <MarvelInputSearch
                                    handleChangeName={getCharacterByName}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12} xs={12}>
                                <MarvelList data={list} />
                            </Col>
                        </Row>
                    </>
                </Container>
            </Jumbotron>
            <div className={styles.paginationDiv}>
                <MarvelPagination total={pagination.numberPages} />
            </div>
        </div>
    );
}

export default Index;

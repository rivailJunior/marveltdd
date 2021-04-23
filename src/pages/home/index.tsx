import { useEffect, useState } from "react";
import { useRequestContext } from "../../provider/requestContext";
import { Container, Jumbotron, Row, Col } from "react-bootstrap";
import { Character } from "../../characterTypes/characters";
import { MarvelList } from "../../components/marvelList";
import { MarvelPagination } from "../../components/marvelPagination";
import styles from "./index.module.css";
import { MarvelInputSearch } from "../../components/marvelInputSearch";

function Index(): JSX.Element {
    const { getCharacters, getCharacterByName } = useRequestContext();
    const [list, setList] = useState<[Character]>([] as any);
    const [errInfo, setErrInfo] = useState(false);
    const [pagination, setPagination] = useState({
        numberPages: 0,
        currentPage: 0,
    });

    useEffect(() => {
        getList();
    }, []);

    const getList = async (offset?: number) => {
        try {
            const response = await getCharacters(10, offset);
            setList(response?.results);
            setPagination({ numberPages: response?.total, currentPage: 0 });
        } catch (err) {
            setErrInfo(true);
        }
    };

    const getByName = async (name: string) => {
        try {
            if (name.length > 0) {
                const response: [Character] = await getCharacterByName(name);
                setList(response);
            } else {
                getList();
            }
        } catch (err) {
            setErrInfo(true);
        }
    };

    const handleActive = (active: any) => {
        getList(active);
    };

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
                                    handleChangeName={getByName}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12} xs={12}>
                                <MarvelList data={list} errInfor={errInfo} />
                            </Col>
                        </Row>
                    </>
                </Container>
            </Jumbotron>
            <div className={styles.paginationDiv}>
                <MarvelPagination
                    total={pagination.numberPages}
                    handleActive={handleActive}
                />
            </div>
        </div>
    );
}

export default Index;

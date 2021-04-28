import { useEffect, useState } from "react";
import { useRequestContext } from "../../provider/requestContext";
import { Container, Jumbotron, Row, Col } from "react-bootstrap";
import { Character } from "../../characterTypes/characters";
import { MarvelList } from "../../components/list/marvelList";
import { MarvelPagination } from "../../components/pagination/marvelPagination";
import styles from "./index.module.css";
import { MarvelInputSearch } from "../../components/input/marvelInputSearch";
import { useParams, useHistory } from "react-router-dom";
import { helperPagination } from "../../helper/helperPagination";


function Index(): JSX.Element {
    const params = useParams<{ id?: string }>()
    const history = useHistory()
    const { getCharacters, getCharacterByName } = useRequestContext();
    const [list, setList] = useState<[Character]>([] as any);
    const [errInfo, setErrInfo] = useState(false);
    const pageHelper = helperPagination(parseInt(params.id));
    const [pagination, setPagination] = useState({
        numberPages: 0,
        currentPage: pageHelper.page,
    });

    useEffect(() => {
        getList(parseInt(params.id));
    }, []);

    const getList = async (offset?: number) => {
        const pageHelper = helperPagination(offset);
        try {
            const response = await getCharacters(10, pageHelper.offset);
            setList(response.results);
            setPagination({ numberPages: response?.total, currentPage: pageHelper.page });
        } catch (err) {
            setErrInfo(true);
        }
    };

    const getByName = async (name: string) => {
        try {
            if (name.length > 0) {
                const response: [Character] = await getCharacterByName(name);
                return response.length && setList(response);
            }
            getList()

        } catch (err) {
            setErrInfo(true);
        }
    };

    const handleActive = (active: any) => {
        setPagination({ ...pagination, currentPage: active })
        getList(active + 1);
        history.push(`/${ active + 1 }`)
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
                    currentPage={pagination.currentPage}
                />
            </div>
        </div>
    );
}

export default Index;

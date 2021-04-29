import { useEffect } from "react";
import { Container, Jumbotron, Row, Col } from "react-bootstrap";
import { MarvelList } from "../../components/list/marvelList";
import { MarvelPagination } from "../../components/pagination/marvelPagination";
import styles from "./index.module.css";
import MarvelInputSearch from "../../components/input/marvelInputSearch";
import { useParams, useHistory } from "react-router-dom";
import { helperPagination } from "../../helper/helperPagination";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, RootState } from "../../model/storeConfig";


function Index(): JSX.Element {
    const params = useParams<{ id?: string }>()
    const history = useHistory();
    const dispatch = useDispatch<Dispatch>();
    const state = useSelector((state: RootState) => state);
    const { charactersModel } = state;
    const { characters, total } = charactersModel;
    const pageHelper = helperPagination(parseInt(params.id));
    useEffect(() => {
        getList(parseInt(params.id));
    }, []);

    const getList = async (offset?: number) => {
        const pageHelper = helperPagination(offset);
        dispatch.charactersModel.getAll({ offset: pageHelper.offset, total: 10, currentPage: pageHelper.page })
    };

    const getByName = async (name: string) => {
        if (name.length > 0) {
            return dispatch.charactersModel.get(name);
        }
        return getList(parseInt(params.id))
    };

    const handleActive = (active: any) => {
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
                                <MarvelList data={characters} errInfor={!characters.length} />
                            </Col>
                        </Row>
                    </>
                </Container>
            </Jumbotron>
            <div className={styles.paginationDiv}>
                <MarvelPagination
                    total={total}
                    handleActive={handleActive}
                    currentPage={pageHelper.page}
                />
            </div>
        </div>
    );
}

export default Index;

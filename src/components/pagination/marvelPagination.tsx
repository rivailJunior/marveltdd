import { useState } from "react";
import { Pagination } from "react-bootstrap";
import styles from "./marvelPagination.module.css";

type iPaginationProps = {
    total: number;
    handleActive?: Function;
    currentPage: number
};
const MarvelPagination = ({
    total,
    handleActive,
    currentPage
}: iPaginationProps): JSX.Element => {
    const [active, setActive] = useState(currentPage);
    const [maxAndMin, setMaxAndMin] = useState({ max: 9, min: 0 })
    const totalValues = Array(Math.ceil(total / 10)).fill(0);
    const isToHidePagination =
        total > 10 ? styles.showPagination : styles.noPagination;

    const setPaginationOffset = (current: number) => {
        if (current >= 9) {
            setMaxAndMin({ max: current + 1, min: current - 9 })
        } else {
            setMaxAndMin({ max: 9, min: 0 })
        }
    }

    return (
        <Pagination className={isToHidePagination} data-testid="paginationDiv">
            {active > 0 && active > 1 && (
                <Pagination.First
                    className={styles.paginationItem}
                    onClick={() => {
                        setActive(0);
                        handleActive(0);
                        setPaginationOffset(0)
                    }}
                />
            )}
            {active > 0 && (
                <Pagination.Prev
                    className={styles.paginationItem}

                    onClick={() => {
                        const current = active === 1 ? 0 : active - 1;
                        setActive(current);
                        handleActive(current);
                        setPaginationOffset(current)
                    }}
                />
            )}

            {totalValues.map((item, index) => {
                return index >= maxAndMin.min && index <= maxAndMin.max && (
                    <Pagination.Item
                        data-testid="paginationItems"
                        key={index}
                        active={index === active}
                        className={index === active ? ` ${ styles.paginationItem } ${ styles.active } ${ styles.paginate } paginationActive` : `${ styles.paginationItem } ${ styles.paginate }`}
                        onClick={() => {
                            setActive(index);
                            handleActive(index);
                            setPaginationOffset(index)
                        }}
                    >
                        {index + 1}
                    </Pagination.Item>

                );
            })}
            {active !== totalValues.length - 1 && (
                <Pagination.Next
                    className={styles.paginationItem}
                    onClick={() => {
                        const current =
                            active === totalValues.length ? active : active + 1;
                        setActive(current);
                        handleActive(current);
                        setPaginationOffset(current)
                    }}
                />
            )}

            {active > 0 && active !== totalValues.length - 1 && (
                <Pagination.Last
                    className={styles.paginationItem}
                    onClick={() => {
                        setActive(totalValues.length - 1);
                        handleActive(totalValues.length - 1);
                        setPaginationOffset(totalValues.length - 1)
                    }}
                />
            )}
        </Pagination>
    );
};

export { MarvelPagination };

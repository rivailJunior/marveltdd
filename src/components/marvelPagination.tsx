import { useState, useEffect } from "react";
import { Pagination } from "react-bootstrap";
import styles from "./marvelPagination.module.css";

type iPaginationProps = {
    total: number;
    handleActive?: Function;
};
const MarvelPagination = ({
    total,
    handleActive,
}: iPaginationProps): JSX.Element => {
    const [active, setactive] = useState(0);
    useEffect(() => {
        if (active > 0) {
            handleActive(active);
        }
    }, [active, handleActive]);
    const totalValues = Array(Math.ceil(total / 10)).fill(0);
    const isToHidePagination =
        total > 10 ? styles.showPagination : styles.noPagination;

    return (
        <Pagination className={isToHidePagination} data-testid="paginationDiv">
            <Pagination.First onClick={() => setactive(0)} />
            <Pagination.Prev onClick={() => setactive(active - 1)} />
            {totalValues.map((item, index) => {
                return (
                    index < 10 && (
                        <Pagination.Item
                            data-testid="paginationItems"
                            key={index}
                            active={index === active}
                            onClick={() => setactive(index + 1)}
                        >
                            {index + 1}
                        </Pagination.Item>
                    )
                );
            })}
            <Pagination.Next onClick={() => setactive(active + 1)} />
            <Pagination.Last onClick={() => setactive(totalValues.length)} />
        </Pagination>
    );
};

export { MarvelPagination };

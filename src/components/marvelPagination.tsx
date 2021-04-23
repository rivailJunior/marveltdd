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
    const [active, setactive] = useState(1);
    const totalValues = Array(Math.ceil(total / 10)).fill(0);
    const isToHidePagination =
        total > 10 ? styles.showPagination : styles.noPagination;

    return (
        <Pagination className={isToHidePagination} data-testid="paginationDiv">
            <Pagination.First
                onClick={() => {
                    setactive(1);
                    handleActive(0);
                }}
            />
            <Pagination.Prev
                onClick={() => {
                    const current = active === 1 ? 0 : active - 1;
                    setactive(current === 0 ? 1 : current);
                    handleActive(current);
                }}
            />
            {totalValues.map((item, index) => {
                return (
                    index < 10 && (
                        <Pagination.Item
                            data-testid="paginationItems"
                            key={index + 1}
                            active={index + 1 === active}
                            onClick={() => {
                                setactive(index + 1);
                                handleActive(index);
                            }}
                        >
                            {index + 1}
                        </Pagination.Item>
                    )
                );
            })}
            <Pagination.Next
                onClick={() => {
                    const current =
                        active === totalValues.length ? active : active + 1;
                    setactive(current);
                    handleActive(current);
                }}
            />
            <Pagination.Last
                onClick={() => {
                    setactive(totalValues.length);
                    handleActive(totalValues.length);
                }}
            />
        </Pagination>
    );
};

export { MarvelPagination };

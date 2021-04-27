import { useState, useEffect } from "react";
import { InputGroup, FormControl } from "react-bootstrap";
import styles from "./marvelInput.module.css";

type iInputProps = {
    handleChangeName: Function;
};
const MarvelInputSearch = ({ handleChangeName }: iInputProps) => {
    const [name, setName] = useState("");

    const onHandleChange = (evt: any) => {
        setName(evt.target.value);
        handleChangeName(evt.target.value)
    }
    return (
        <div>
            <label htmlFor="" className={styles.labelSearch}>Nome do personagem</label>
            <InputGroup className={"mb-3 " + styles.inputGroup}>

                <FormControl
                    value={name}
                    onChange={onHandleChange}
                    data-testid="inputSearch"
                    placeholder="Search"
                    aria-label="Busque personagens"
                    className={styles.inputSearch}
                />

                <img src="/mar.png" alt="" className={styles.icon} />

            </InputGroup>
        </div>



    );
};

export { MarvelInputSearch };

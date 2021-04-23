import { useState, useEffect } from "react";
import { InputGroup, FormControl } from "react-bootstrap";
import styles from "./marvelInput.module.css";

type iInputProps = {
    handleChangeName: Function;
};
const MarvelInputSearch = ({ handleChangeName }: iInputProps) => {
    const [name, setName] = useState("");
    useEffect(() => {
        if (name.length > 1) {
            handleChangeName(name);
        }
    }, [name]);

    const handleClear = () => {
        setName("");
        handleChangeName("");
    };
    const showOrHideClear =
        name.length > 0 ? styles.showClear : styles.hideClear;
    return (
        <InputGroup className="mb-3">
            <FormControl
                value={name}
                onChange={(evt) => setName(evt.target.value)}
                data-testid="inputSearch"
                placeholder="Search"
                aria-label="Busque personagens"
            />
            <InputGroup.Append data-testid="btnSearch">
                <InputGroup.Text>OK</InputGroup.Text>
            </InputGroup.Append>
            <InputGroup.Append
                className={showOrHideClear}
                data-testid="btnClear"
                onClick={handleClear}
            >
                <InputGroup.Text>X</InputGroup.Text>
            </InputGroup.Append>
        </InputGroup>
    );
};

export { MarvelInputSearch };

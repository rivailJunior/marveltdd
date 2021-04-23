import { Navbar } from "react-bootstrap";
import styles from "./header.module.css";

type iHeaderProps = {
    leftLabel?: string;
    userName?: string;
    descriptionRight?: string;
};

const MarvelHeader = ({
    leftLabel,
    userName,
    descriptionRight,
}: iHeaderProps): JSX.Element => {
    const NoPropsDivInfor = () => {
        return (
            <div
                className={styles.informationProps}
                data-testid="informationProps"
            >
                ops!
            </div>
        );
    };

    return (
        <Navbar
            expand="lg"
            variant="light"
            bg="light"
            className={styles.marvelHeader}
        >
            <Navbar.Brand href="#home">
                {!leftLabel?.length ? NoPropsDivInfor() : leftLabel}
            </Navbar.Brand>
            <Navbar.Toggle />

            <Navbar.Collapse className="justify-content-end">
                <Navbar.Text className={styles.labelName}>
                    {!userName?.length ? NoPropsDivInfor() : userName}
                    {!descriptionRight?.length ? (
                        NoPropsDivInfor()
                    ) : (
                        <a href="#login">{descriptionRight}</a>
                    )}
                </Navbar.Text>
            </Navbar.Collapse>
        </Navbar>
    );
};

export { MarvelHeader };

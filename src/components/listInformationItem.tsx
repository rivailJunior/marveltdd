import styles from "./marvelList.module.css";

type iListProps = {
    list: [any] | any;
    tagName: string;
    information?: string;
};
export const ListInformationItem = ({
    list,
    tagName,
    information,
}: iListProps): JSX.Element => {
    return list?.length > 0 ? (
        <ul className={styles.list}>
            {list.slice(0, 3).map((item: any, index: number) => {
                return (
                    <li data-testid="informationLi" key={index}>
                        {item[tagName]}
                    </li>
                );
            })}
        </ul>
    ) : (
        <div className={styles.defaultLabel}>
            Ops. {information} não encontrados!
        </div>
    );
};

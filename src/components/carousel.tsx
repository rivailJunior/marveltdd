import { useState } from "react";
import { Carousel } from "react-bootstrap";
import styles from "./carousel.module.css";

type iCarouselProps = {
    data: [any];
    type: string;
};
export function CarouselInfor({ data, type }: iCarouselProps): JSX.Element {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex: number, e: any) => {
        setIndex(selectedIndex);
    };

    const showErr = !data.length ? styles.showCarousel : styles.hideCarousel;
    const showCarousel = data.length
        ? styles.showCarousel
        : styles.hideCarousel;
    return (
        <>
            <div className={showErr}>Ops. Nenhuma {type} encontrado</div>
            <Carousel
                className={showCarousel}
                activeIndex={index}
                onSelect={handleSelect}
            >
                {data.map((item, index) => {
                    <Carousel.Item key={index}>
                        <img
                            className="d-block w-100"
                            src="holder.js/800x400?text=First slide&bg=373940"
                            alt="First slide"
                        />
                        <Carousel.Caption>
                            <h3>First slide label</h3>
                            <p>
                                Nulla vitae elit libero, a pharetra augue mollis
                                interdum.
                            </p>
                        </Carousel.Caption>
                    </Carousel.Item>;
                })}
            </Carousel>
        </>
    );
}

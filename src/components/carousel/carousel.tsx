import { useState } from "react";
import { Carousel } from "react-bootstrap";

type iCarouselProps = {
    data: [] | any;
    type: string;
};
export function CarouselInfor({ data, type }: iCarouselProps): JSX.Element {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex: number, e: any) => {
        setIndex(selectedIndex);
    };

    return (
        <>
            {!data.length ? (
                <div>Ops. Nenhuma {type} encontrado</div>
            ) : (
                <>
                    <div
                        className="labelHeader"
                        style={{ fontSize: 20, fontWeight: 500 }}
                    >
                        {type}
                    </div>
                    <Carousel activeIndex={index} onSelect={handleSelect}>
                        {data.map((item: any, id: number) => {
                            return (
                                <Carousel.Item
                                    key={id}
                                    data-testid="carouselItem"
                                >
                                    <img
                                        className="d-block w-100"
                                        src={`${ item?.thumbnail?.path }.${ item?.thumbnail?.extension }`}
                                        alt="First slide"
                                    />
                                    <Carousel.Caption>
                                        <h3>{item?.title}</h3>
                                        <p>{item?.endYear}</p>
                                    </Carousel.Caption>
                                </Carousel.Item>
                            );
                        })}
                    </Carousel>
                </>
            )}
        </>
    );
}

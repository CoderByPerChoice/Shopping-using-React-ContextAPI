import React, { useContext } from "react";
import {
    Carousel,
    CarouselItem,
    CarouselIndicators,
    CarouselControl,
} from 'reactstrap';
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../ProductContext";

function Home() {
    const { featuredProducts, error } = useContext(ProductContext);
    // State for Active index
    const [activeIndex, setActiveIndex] = React.useState(0);

    // State for Animation
    const [animating, setAnimating] = React.useState(false);

    // Items array length
    const itemLength = featuredProducts.length - 1;

    // For navigation
    const navigate = useNavigate();

    // Previous button for Carousel
    const previousButton = () => {
        if (animating) return;
        const nextIndex = activeIndex === 0 ?
            itemLength : activeIndex - 1;
        setActiveIndex(nextIndex);
    }

    // Next button for Carousel
    const nextButton = () => {
        if (animating) return;
        const nextIndex = activeIndex === itemLength ?
            0 : activeIndex + 1;
        setActiveIndex(nextIndex);
    }

    // Carousel Item Data
    const carouselItemData = featuredProducts.map((item) => {
        return (
            <CarouselItem
                key={item.id}
                onExited={() => setAnimating(false)}
                onExiting={() => setAnimating(true)}
            >
                <a href="#" onClick={() => { navigate("/product/" + item.id) }}>
                    <img class="d-block img-fluid" src={`/images/${item.photo}`} alt={item.name} />
                    <div class="carousel-caption d-none d-md-block">

                        <h2>{item.name} <span
                            class="badge badge-pill bg-secondary"><i class="fa fa-inr"></i>{item.price}</span></h2>
                        <p class="d-none d-sm-block">{item.description}</p>
                    </div>
                </a>
            </CarouselItem>
        );
    });

    if (error) throw error;

    return (
        <>
            <h1>Featured products!</h1>
            <hr />
            <div style={{
                display: 'block'
            }}>
                <Carousel dark previous={previousButton} next={nextButton}
                    activeIndex={activeIndex}>
                    <CarouselIndicators items={featuredProducts}
                        activeIndex={activeIndex}
                        onClickHandler={(newIndex) => {
                            if (animating) return;
                            setActiveIndex(newIndex);
                        }} />
                    {carouselItemData}
                    <CarouselControl directionText="Prev"
                        direction="prev" onClickHandler={previousButton} />
                    <CarouselControl directionText="Next"
                        direction="next" onClickHandler={nextButton} />
                </Carousel>
            </div >
        </>
    );
}

export default Home;

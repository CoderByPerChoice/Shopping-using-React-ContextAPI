import React, { useState, useEffect } from "react";
import {
    Carousel,
    CarouselItem,
    CarouselIndicators,
    CarouselCaption,
    CarouselControl,
    Link,
} from 'reactstrap';

function Home() {
    const [products, setProducts] = useState([]);
    // State for Active index
    const [activeIndex, setActiveIndex] = React.useState(0);

    // State for Animation
    const [animating, setAnimating] = React.useState(false);

    useEffect(() => {
        fetchFeaturedProducts();
    }, []);

    const fetchFeaturedProducts = async () => {
        const rsp = await fetch("/products.json");
        const allProducts = await rsp.json();
        const filteredProduct = allProducts.filter(({ featured }) => { return featured === true });
        setProducts(filteredProduct);
    };

    // Items array length
    const itemLength = products.length - 1

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

    function addCart() {
    }
    // Carousel Item Data
    const carouselItemData = products.map((item) => {
        return (
            <CarouselItem
                key={item.id}
                onExited={() => setAnimating(false)}
                onExiting={() => setAnimating(true)}
            >
                <a href={`/product/${item.id}`}>
                    <img class="d-block img-fluid" src={`/images/${item.photo}`} alt={item.name} />
                    {/* <CarouselCaption
                    captionHeader={item.name}
                    captionText={`${item.price}/-`}
                /> */}
                    <div class="carousel-caption d-none d-md-block">

                        <h2>{item.name} <span
                            class="badge badge-pill bg-secondary"><i class="fa fa-inr"></i>{item.price}</span></h2>
                        <p class="d-none d-sm-block">{item.description}</p>
                    </div>
                </a>
            </CarouselItem>
        );
    });

    return (
        <>
            <h1>Featured products</h1>
            <hr />
            <div style={{
                display: 'block'
            }}>
                <Carousel dark previous={previousButton} next={nextButton}
                    activeIndex={activeIndex}>
                    <CarouselIndicators items={products}
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
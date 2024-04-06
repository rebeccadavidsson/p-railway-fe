import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Link } from 'react-router-dom';

const MainCarousel = ({images}) => {
    // const isNonMobile = useMediaQuery("(min-width:600px)");
    console.log(images, "images")
    return (
        <Carousel>
            {images.map((image, index) => (
                <Link to={`/item/1`}>
                    <img key={index} src={image.attributes.url} alt={`carousel-${index}`}/>
                </Link>
                )
            )}
        </Carousel>
    );
};

export default MainCarousel;

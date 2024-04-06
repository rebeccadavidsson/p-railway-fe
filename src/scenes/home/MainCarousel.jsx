import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import useMediaQuery from "@mui/material/useMediaQuery";

const MainCarousel = ({images}) => {
    // const isNonMobile = useMediaQuery("(min-width:600px)");
    return (
        <Carousel>
            {images.map((image, index) => (
                    <img key={index} src={image.attributes.url} alt={`carousel-${index}`}/>
                )
            )}
        </Carousel>
    );
};

export default MainCarousel;

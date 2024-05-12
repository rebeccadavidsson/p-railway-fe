import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Fade, IconButton, Modal } from '@mui/material';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import useMagnifier from '../../components/useMagnifier';

const MainCarousel = ({images}) => {
    const [open, setOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(images[0]);
    const [magnifierPosition, handleMouseMove] = useMagnifier();
    const [isHovered, setIsHovered] = useState(false);

    const handleOpen = (image) => {
        setSelectedImage(image);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // Custom arrow component
    const CustomArrow = ({onClickHandler, direction}) => {
        return (
            <button
                onClick={onClickHandler}
                style={{ zIndex: 100}}
                className={`absolute bottom-0 mb-10 ${direction === 'next' ? 'right-0 mr-5' : 'left-0 ml-5'} w-10 h-10 rounded-full bg-gray-200 text-white flex items-center justify-center opacity-0 transition duration-300`}
            >
                {direction === 'next' ?
                    <div className={'text-black'}> > </div> :
                    <div className={'text-black'}> {'<'} </div>
                }
            </button>
        );
    };

    // Custom indicator component
    const CustomIndicator = ({onClickHandler, isSelected, index, label}) => {
        return (
            <li
                className={`inline-block h-2 w-2 mr-2 rounded-full cursor-pointer ${isSelected ? 'bg-gray-800' : 'bg-gray-400'}`}
                onClick={onClickHandler}
                onKeyDown={onClickHandler}
                value={index}
                key={index}
                role="button"
                tabIndex={0}
                title={`${label} ${index + 1}`}
                aria-label={`${label} ${index + 1}`}
            />
        );
    };

    return (
        <div className="relative group">
            <Carousel
                emulateTouch={true}
                swipeable={true}
                showStatus={false}
                renderArrowPrev={(onClickHandler, hasPrev, label) =>
                    hasPrev && <CustomArrow direction="prev" onClickHandler={onClickHandler} label={label}/>
                }
                renderArrowNext={(onClickHandler, hasNext, label) =>
                    hasNext && <CustomArrow direction="next" onClickHandler={onClickHandler} label={label}/>
                }
                renderIndicator={(onClickHandler, isSelected, index, label) =>
                    <CustomIndicator onClickHandler={onClickHandler} isSelected={isSelected} index={index}
                                     label={label}/>
                }
            >
                {images.map((image, index) => (
                    <div
                        key={index}
                        className="relative"
                        onMouseMove={handleMouseMove}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        onClick={() => handleOpen(image.attributes.url)}>
                        <img
                            key={index}
                            src={image.attributes.url}
                            alt={image.attributes.name}
                            className="transition duration-300 ease-in-out transform"
                        />
                        {isHovered && (
                            <div
                                className="absolute border-4 border-white rounded-sm bg-cover"
                                style={{
                                    width: '120px',
                                    height: '120px',
                                    top: `${magnifierPosition.y}%`,
                                    left: `${magnifierPosition.x}%`,
                                    transform: 'translate(-50%, -50%)',
                                    backgroundSize: '1100%',
                                    backgroundImage: `url(${image.attributes.url})`,
                                    backgroundPosition: `${magnifierPosition.x}% ${magnifierPosition.y}%`,
                                    pointerEvents: 'none'
                                }}
                            />
                        )}
                    </div>

                ))}
            </Carousel>

            <Modal
                open={open}
                onClose={handleClose}
                closeAfterTransition
            >
                <Fade in={open}>
                    <div
                        style={{
                            outline: 'none',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '100%'
                        }}
                        onClick={handleClose} // Close the modal when the backdrop is clicked
                    >
                        <img
                            src={selectedImage}
                            alt={""}
                            style={{
                                position: 'relative', // Position relative to place the close button
                            }}
                            className={'w-auto p-2 max-w-2xl'}
                            onClick={(e) => e.stopPropagation()} // Prevent the click event from bubbling up to the backdrop
                        />

                        <IconButton
                            style={{
                                position: 'absolute',
                                top: '10px',
                                right: '10px'
                            }}
                            onClick={handleClose} // Close the modal when the close button is clicked
                        >
                            <CloseIcon/>
                        </IconButton>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
};

export default MainCarousel;
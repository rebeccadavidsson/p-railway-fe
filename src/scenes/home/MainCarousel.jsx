import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Fade, IconButton, Modal } from '@mui/material';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';

const MainCarousel = ({images}) => {
    const [open, setOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

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
                className={`absolute z-10 bottom-0 mb-10 ${direction === 'next' ? 'right-0 mr-5' : 'left-0 ml-5'} w-10 h-10 rounded-full bg-gray-200 text-white flex items-center justify-center opacity-0 transition-opacity duration-300`}
            >
                {direction === 'next' ?
                    <img src={'/next.png'} alt="next" className={'h-4 w-1/2 object-none'}/> :
                    <img src={'/back.png'} alt="back" className={'h-4 w-1/2 object-none mr-0.5'}/>
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
                    <div onClick={() => handleOpen(image.attributes.url)}>
                        <img
                            key={index}
                            src={image.attributes.url}
                            alt={image.attributes.name}
                            className="border-2 border-gray-300 p-2 transition duration-300 ease-in-out transform hover:border-gray-400 hover:shadow-lg hover:scale-110"
                        />
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
                            alt="Enlarged"
                            style={{
                                position: 'relative' // Position relative to place the close button
                            }}
                            className={'w-full p-2 max-w-4xl'}
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
                            <CloseIcon />
                        </IconButton>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
};

export default MainCarousel;
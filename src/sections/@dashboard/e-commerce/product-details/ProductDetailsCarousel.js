import PropTypes from 'prop-types';
import Slider from 'react-slick';
import { useState, useRef, useEffect } from 'react';
// @mui
import { alpha, styled } from '@mui/material/styles';
import { Box } from '@mui/material';
//
import Image from '../../../../components/Image';
import LightboxModal from '../../../../components/LightboxModal';
import { CarouselArrowIndex } from '../../../../components/carousel';

// ----------------------------------------------------------------------

const THUMB_SIZE = 64;

const RootStyle = styled('div')(({ theme }) => ({
  '& .slick-slide': {
    float: theme.direction === 'rtl' ? 'right' : 'left',
    '&:focus': { outline: 'none' },
  },
}));

// ----------------------------------------------------------------------

ProductDetailsCarousel.propTypes = {
    images: PropTypes.arrayOf(PropTypes.string),
  }

export default function ProductDetailsCarousel({ images }) {

  const otherImages = ["https://images.unsplash.com/photo-1454496522488-7a8e488e8606?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8bW91bnRhaW58ZW58MHx8MHx8&auto=format&fit=crop&w=600", " https://images.unsplash.com/photo-1454496522488-7a8e488e8606?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8bW91bnRhaW58ZW58MHx8MHx8&auto=format&fit=crop&w=600", "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8bW91bnRhaW58ZW58MHx8MHx8&auto=format&fit=crop&w=600"];
  if(!images){
    images = otherImages;
  }
  console.log("images",images);
  const [openLightbox, setOpenLightbox] = useState(false);

  const [selectedImage, setSelectedImage] = useState(0);

  const [currentIndex, setCurrentIndex] = useState(0);

  const [nav1, setNav1] = useState();

  const [nav2, setNav2] = useState();

  const slider1 = useRef(null);

  const slider2 = useRef(null);

  const imagesLightbox = images?.map((_image) => _image);

  const handleOpenLightbox = (url) => {
    const selectedImage = imagesLightbox.findIndex((index) => index === url);
    setOpenLightbox(true);
    setSelectedImage(selectedImage);
  };


  

  const settings1 = {
    dots: false,
    arrows: false,
    slidesToShow: 1,
    draggable: false,
    slidesToScroll: 1,
    adaptiveHeight: true,
    beforeChange: (current, next) => setCurrentIndex(next),
  };

  const settings2 = {
    dots: false,
    arrows: false,
    centerMode: true,
    swipeToSlide: true,
    focusOnSelect: true,
    variableWidth: true,
    centerPadding: '0px',
    slidesToShow: images?.length > 3 ? 3 : images?.length,
  };

  useEffect(() => {
    if (slider1.current) {
      setNav1(slider1.current);
    }
    if (slider2.current) {
      setNav2(slider2.current);
    }
  }, []);

  const handlePrevious = () => {
    slider2.current?.slickPrev();
  };

  const handleNext = () => {
    slider2.current?.slickNext();
  };

  return (
    <RootStyle>
      <Box sx={{ p: 1 }}>
        <Box sx={{ zIndex: 0, borderRadius: 2, overflow: 'hidden', position: 'relative' }}>
          {images ?<Slider {...settings1} asNavFor={nav2} ref={slider1}>
            {images.map((img) => (
              <Image
                key={img}
                alt="large image"
                src={`http://tourbook-backend.herokuapp.com/${img}`}
                ratio="1/1"
                onClick={() => handleOpenLightbox(img)}
                sx={{ cursor: 'zoom-in' }}
              />
            ))}
          </Slider>:<Slider {...settings1} asNavFor={nav2} ref={slider1}>
            {otherImages.map((img) => (
              <Image
                key={img}
                alt="large image"
                src={img}
                ratio="1/1"
                onClick={() => handleOpenLightbox(img)}
                sx={{ cursor: 'zoom-in' }}
              />
            ))}
          </Slider>}
          <CarouselArrowIndex
            index={currentIndex}
            total={images?.length}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        </Box>
      </Box>

      <Box
        sx={{
          my: 3,
          mx: 'auto',
          '& .slick-current .isActive': { opacity: 1 },
          ...(images?.length === 1 && { maxWidth: THUMB_SIZE * 1 + 16 }),
          ...(images?.length === 2 && { maxWidth: THUMB_SIZE * 2 + 32 }),
          ...(images?.length === 3 && { maxWidth: THUMB_SIZE * 3 + 48 }),
          ...(images?.length === 4 && { maxWidth: THUMB_SIZE * 3 + 48 }),
          ...(images?.length >= 5 && { maxWidth: THUMB_SIZE * 6 }),
          ...(images?.length > 2 && {
            position: 'relative',
            '&:before, &:after': {
              top: 0,
              zIndex: 9,
              content: "''",
              height: '100%',
              position: 'absolute',
              width: (THUMB_SIZE * 2) / 3,
              backgroundImage: (theme) =>
                `linear-gradient(to left, ${alpha(theme.palette.background.paper, 0)} 0%, ${
                  theme.palette.background.paper
                } 100%)`,
            },
            '&:after': { right: 0, transform: 'scaleX(-1)' },
          }),
        }}
      >
        {images ?<Slider {...settings2} asNavFor={nav1} ref={slider2}>
          {images.map((img, index) => (
            <Box key={img} sx={{ px: 0.75 }}>
              <Image
                disabledEffect
                alt="thumb image"
                src={`http://tourbook-backend.herokuapp.com/${img}`}
                sx={{
                  width: THUMB_SIZE,
                  height: THUMB_SIZE,
                  borderRadius: 1.5,
                  cursor: 'pointer',
                  ...(currentIndex === index && {
                    border: (theme) => `solid 3px ${theme.palette.primary.main}`,
                  }),
                }}
              />
            </Box>
          ))}
        </Slider> : <Slider {...settings2} asNavFor={nav1} ref={slider2}>
          {otherImages.map((img, index) => (
            <Box key={img} sx={{ px: 0.75 }}>
              <Image
                disabledEffect
                alt="thumb image"
                src={img}
                sx={{
                  width: THUMB_SIZE,
                  height: THUMB_SIZE,
                  borderRadius: 1.5,
                  cursor: 'pointer',
                  ...(currentIndex === index && {
                    border: (theme) => `solid 3px ${theme.palette.primary.main}`,
                  }),
                }}
              />
            </Box>
          ))}
        </Slider>}
      </Box>

      <LightboxModal
        images={imagesLightbox}
        mainSrc={imagesLightbox[selectedImage]}
        photoIndex={selectedImage}
        setPhotoIndex={setSelectedImage}
        isOpen={openLightbox}
        onCloseRequest={() => setOpenLightbox(false)}
      />
    </RootStyle>
  );
}

import PropTypes from 'prop-types';
import Slider from 'react-slick';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { alpha, useTheme, styled } from '@mui/material/styles';

import { Box, Card, Button, CardContent, Typography,Link } from '@mui/material';
import { PATH_DASHBOARD, PATH_PAGE } from '../../../../routes/paths';
// _mock_
import { _ecommerceNewProducts } from '../../../../_mock';
// components
import Image from '../../../../components/Image';
import { CarouselDots } from '../../../../components/carousel';

// ----------------------------------------------------------------------

const OverlayStyle = styled('div')(({ theme }) => ({
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 8,
  position: 'absolute',
  backgroundColor: alpha(theme.palette.grey[900], 0.64),
}));

// ----------------------------------------------------------------------

export default function EcommerceNewProducts({tour}) {
  const theme = useTheme();

  const settings = {
    speed: 1000,
    dots: true,
    arrows: false,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    rtl: Boolean(theme.direction === 'rtl'),
    ...CarouselDots({ position: 'absolute', right: 24, bottom: 24 }),
  };

  

  return (
    <Card>
      <Slider {...settings}>
        {tour.map((tour) => (
          <CarouselItem key={tour.name} tour={tour} />
        ))}
      </Slider>
    </Card>
  );
}

// ----------------------------------------------------------------------

CarouselItem.propTypes = {
  item: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
  }),
};

function CarouselItem({ tour }) {
  // const { image, name } = item;
  const linkTo = `${PATH_DASHBOARD.eCommerce.root}/checkout`;

  return (
    <Box sx={{ position: 'relative' }}>
      <CardContent
        sx={{
          left: 0,
          bottom: 0,
          zIndex: 9,
          maxWidth: '80%',
          position: 'absolute',
          color: 'common.white',
        }}
      >
        <Typography variant="overline" sx={{ opacity: 0.48 }}>
          New
        </Typography>
        <Typography noWrap variant="h5" sx={{ mt: 1, mb: 3 }}>
          {tour?.name}
        </Typography>
        <Link to={localStorage.getItem('accessToken') ? linkTo : PATH_PAGE.details} color="inherit" onClick={() => localStorage.setItem('tourId', tour._id)} component={RouterLink}> <Button to="#" variant="contained" >
          Book Now
        </Button></Link>
       
      </CardContent>
      {/* <OverlayStyle /> */}
      <Image alt={tour?.name} src={tour.tourpics[0]} sx={{ height: { xs: 280, xl: 320 } }} />
    </Box>
  );
}

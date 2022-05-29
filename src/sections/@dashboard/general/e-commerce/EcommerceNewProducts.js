import PropTypes from 'prop-types';
import Slider from 'react-slick';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { alpha, useTheme, styled } from '@mui/material/styles';
import { Box, Card, Button, CardContent, Typography } from '@mui/material';
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

export default function EcommerceNewProducts() {
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

  const tour = [{
    image: "https://images.unsplash.com/photo-1619120238346-978e07731e77?ixlib=rb-1.2.1&raw_url=true&q=60&fm=jpg&crop=entropy&cs=tinysrgb&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTB8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=600",
    name: "Islamabad Three days tour",
  },
    {
      image: "https://images.unsplash.com/photo-1597637245724-beb1e10cb79a?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332",
      name: "Hunza Three days tour",
    },
    {
      image: "https://images.unsplash.com/photo-1597637245724-beb1e10cb79a?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332",
      name: "Chitral one week tour",
    },
]

  return (
    <Card>
      <Slider {...settings}>
        {tour.map((tour) => (
          <CarouselItem key={tour.name} item={tour} />
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

function CarouselItem({ item }) {
  const { image, name } = item;

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
          {name}
        </Typography>
        <Button to="#" variant="contained" component={RouterLink}>
          Book Now
        </Button>
      </CardContent>
      <OverlayStyle />
      <Image alt={name} src={image} sx={{ height: { xs: 280, xl: 320 } }} />
    </Box>
  );
}

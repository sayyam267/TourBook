import PropTypes from 'prop-types';
// @mui
import { Box } from '@mui/material';
import {useState,useEffect} from 'react';
import axios from '../../../../utils/axios';
// components
import { SkeletonProductItem } from '../../../../components/skeleton';
//
import ShopProductCard from './ShopProductCard';


// ----------------------------------------------------------------------

ShopProductList.propTypes = {
  products: PropTypes.array.isRequired,
  loading: PropTypes.bool,
};




export default function ShopProductList(props) {
  const [allTours, setAllTours] = useState(props.tours);
  

  useEffect(() => {
    console.log("all tours", props.tours);
    // setAllTours(tours);
  }, [allTours]);

  
  return (
    <Box
      sx={{
        display: 'grid',
        gap: 3,
        gridTemplateColumns: {
          xs: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
          lg: 'repeat(4, 1fr)',
        },
      }}
      
    >
      {allTours ? <>{allTours?.map(tour => { return <ShopProductCard tour={tour} /> })}</> : <SkeletonProductItem  />}
    </Box>
  );
}

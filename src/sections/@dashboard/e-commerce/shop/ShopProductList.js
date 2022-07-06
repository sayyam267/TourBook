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
    if (props.sortBy === 'newest') {
      console.log(props.sortBy);
      allTours.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setAllTours(allTours);
      console.log(allTours);
      return allTours;
    }
    if (props.sortBy === 'priceAsc') {
      console.log(props.sortBy);
      allTours?.sort((a, b) => (a.price > b.price ? 1 : -1));
      setAllTours(allTours);
      console.log(allTours);
      console.log("price low to high")
      return allTours;

    }
    if (props.sortBy === 'priceDesc') {
      console.log(props.sortBy);
      allTours?.sort((a, b) => (a.price > b.price ? -1 : 1))
      setAllTours(allTours);
      console.log(allTours);
      return allTours;

    }
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

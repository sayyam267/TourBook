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




export default function ShopProductList({tours}) {
  // const [allTours, setAllTours] = useState(null);

  // useEffect(() => {
  //   axios.get("http://tourbook-backend.herokuapp.com/tour/all", { headers: { "x-auth-token": localStorage.getItem('accessToken') } }).then((res) => {
  //     console.log(res);
  //     setAllTours(res.data.data);
  //   })
  // }, []);

  
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
      {tours ? <>{tours?.map(tour => { return <ShopProductCard tour={tour} /> })}</> : <SkeletonProductItem  />}
    </Box>
  );
}

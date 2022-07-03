// @mui
import { styled } from '@mui/material/styles';
import { Button, Card, Typography, Stack } from '@mui/material';
// utils
import { fCurrency } from '../../../../utils/formatNumber';
import axios from '../../../../utils/axios';
// ----------------------------------------------------------------------

const RowStyle = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
});

// ----------------------------------------------------------------------

export default function EcommerceCurrentBalance({ name, data, phoneNumber, email, id, image }) {
  const mname = name;
  const Data = data;
  // const RequestTitle = title;
  const handleReject = () => {
    axios
      .put(
        process.env.REACT_APP_ADMINACCEPT,
        { vendorID: id },
        {
          headers: { 'x-auth-token': localStorage.getItem('accessToken') },
        }
      )
      .then((res) => {
        console.log(res);
      });
  };
  const handleApprove = () => {
    axios
      .put(
        process.env.REACT_APP_ADMINREJECT,
        { vendorID: id },
        {
          headers: { 'x-auth-token': localStorage.getItem('accessToken') },
        }
      )
      .then((res) => {
        console.log(res);
      });
  };
  return (
    <Card sx={{ p: 3 }}>
      {/* <Typography variant="subtitle2" gutterBottom>
        {RequestTitle}
      </Typography> */}

      <Stack spacing={2}>
        <img src={`http://tourbook-backend.herokuapp.com${image}`} width="200" alt={name} />
        <Typography variant="h3">{name}</Typography>

        {/* <RowStyle>
          <Typography variant="body2">{data}</Typography>
        </RowStyle> */}
        <RowStyle>
          <Typography variant="body2">Email: {email}</Typography>
        </RowStyle>
        <RowStyle>
          <Typography variant="body2">Phone: {phoneNumber}</Typography>
        </RowStyle>

        <Stack direction="row" spacing={1.5}>
          <Button fullWidth variant="contained" color="error" onClick={handleReject}>
            Don't Approve
          </Button>
          <Button fullWidth variant="contained" onClick={handleApprove}>
            Approve
          </Button>
        </Stack>
      </Stack>
    </Card>
  );
}













// // @mui
// import { styled } from '@mui/material/styles';
// import { Button, Card, Typography, Stack } from '@mui/material';
// // utils
// import { fCurrency } from '../../../../utils/formatNumber';

// // ----------------------------------------------------------------------

// const RowStyle = styled('div')({
//   display: 'flex',
//   justifyContent: 'space-between'
// });

// // ----------------------------------------------------------------------

// export default function EcommerceCurrentBalance({name,data,title}) {
//   const mname = name;
//   const Data = data;
//   const RequestTitle = title;

//   return (
//     <Card sx={{ p: 3 }}>
//       <Typography variant="subtitle2" gutterBottom>
//         {RequestTitle}
//       </Typography>

//       <Stack spacing={2}>
//         <Typography variant="h3">{mname}</Typography>

//         <RowStyle>
//           <Typography variant="body2">{data}</Typography>
//         </RowStyle>


//         <Stack direction="row" spacing={1.5}>
//           <Button fullWidth variant="contained" color="error">
//             Don't Approve
//           </Button>
//           <Button fullWidth variant="contained">
//             Approve
//           </Button>
//         </Stack>
//       </Stack>
//     </Card>
//   );
// }

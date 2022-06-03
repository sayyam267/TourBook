// @mui
import { Typography, TextField, Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { styled } from '@mui/material/styles';
import {useState} from 'react';
import CreditCardInput from 'react-credit-card-input';
import { async } from '@firebase/util';
import axios from '../../utils/axios';
import Iconify from '../../components/Iconify';


// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(5),
  backgroundColor: theme.palette.background.neutral,
  borderRadius: Number(theme.shape.borderRadius) * 2,
}));

export default function PaymentBillingAddress({onGetSuccess}) {
  const [cardNo,setCardNo] = useState('');
  const [myname,setName] = useState('');
  const [cvc,setCvc] = useState('');
  const [expiry,setExpiry] = useState('');
  const [myemail,setEmail] = useState('');
  const [amount,setAmount] = useState(null);
  const [loading,setLoading] = useState(false);


  const handleSubmit = async ()  =>{
    setLoading(true);
    const arr  = expiry.split('/');
    console.log(expiry, "arr",arr);
    const month= arr[0];
    const year= arr[1];
    const balance = Number(amount);

    const cardno = cardNo.replace(/\s+/g, ''); 
    const cn = Number(cardno);
    console.log(myemail,myname,cn,cvc,Number(amount))
    
    try {

      await axios.post("http://tourbook-backend.herokuapp.com/transaction/buy", {
        payment: {
          CardNumber: cn,
          Month: month,
          Year: year,
          CVC: cvc,
          Amount:balance
        },
        user: {
          email: myemail,
          name: myname
        }
      }, { headers: { "x-auth-token": window.localStorage.getItem("accessToken") }}).then(res => {console.log(res.data.data.charges.receipt_url);localStorage.setItem('balance',res.data.data.balance); console.log(res.data.data);setLoading(false);onGetSuccess(res.data.data.charges.receipt_url);});

    } catch (error) {
      console.error(error);
      setLoading(false);
      // window.localStorage.getItem("accessToken")
  }
}
  return (
    <div>
      <Typography variant="subtitle1">Add Details</Typography>
      <Stack spacing={3} mt={5}>
        <TextField fullWidth label="Full name" variant="standard" value={myname} onChange={(e) => setName(e.target.value)}/>
        <TextField fullWidth label="Email" variant="standard" value={myemail} onChange={(e) => setEmail(e.target.value)} />
        <CreditCardInput
          cardNumberInputProps={{ value: cardNo, onChange: e => setCardNo(e.target.value) }} 
          cardExpiryInputProps={{ value: expiry, onChange: e => setExpiry(e.target.value) }} 
          cardCVCInputProps={{ value: cvc, onChange: e => setCvc(e.target.value) }} 
          fieldClassName="input"
          
        />
        <TextField fullWidth label="Amount" variant="standard" value={amount} onChange={(e) => setAmount(e.target.value)}/>
        <LoadingButton fullWidth size="large" type="submit" onClick={handleSubmit} variant="contained" loading={loading}>
          Buy Credits
        </LoadingButton>
      </Stack>
      <Stack alignItems="center" spacing={1} sx={{mt:2}}>
        <Stack direction="row" alignItems="center" spacing={1.5}>
          <Iconify icon={'eva:shield-fill'} sx={{ width: 20, height: 20, color: 'primary.main' }} />
          <Typography variant="subtitle2">Secure credit card payment</Typography>
        </Stack>
        <Typography variant="caption" sx={{ color: 'text.secondary', textAlign: 'center' }}>
          This is a secure 128-bit SSL encrypted payment
        </Typography>
      </Stack>
    </div>
  );
}

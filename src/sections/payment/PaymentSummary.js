// @mui
import { styled } from '@mui/material/styles';
import { Switch, Divider, Typography, Stack,Alert,Box } from '@mui/material';

import { LoadingButton } from '@mui/lab';
// components
import Label from '../../components/Label';
import Iconify from '../../components/Iconify';
// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(5),
  backgroundColor: theme.palette.background.neutral,
  borderRadius: Number(theme.shape.borderRadius) * 2,
}));

// ----------------------------------------------------------------------

export default function PaymentSummary({url}) {
  return (
    <RootStyle>
      <Typography variant="subtitle1" sx={{ mb: 5 }}>
        Summary 
      </Typography>
      <Divider sx={{ borderStyle: 'dashed' }} />
      <Stack spacing={2.5}>
        {/* <Stack direction="row" justifyContent="space-between">
          <Typography variant="subtitle2" component="p" sx={{ color: 'text.secondary' }}>
            Subscription
          </Typography>
          <Label color="error" variant="filled">
            PREMIUM
          </Label>
        </Stack> */}

        {/* <Stack direction="row" justifyContent="space-between"> */}
          <Box display="flex"
            alignItems="center"
            justifyContent="center">
          <Alert sx={{p: 3}} severity="success">Your Transaction has completed SuccessFully</Alert>
          </Box>
        {/* </Stack> */}

        <Divider sx={{ borderStyle: 'dashed' }} />

      </Stack>

      <Typography variant="caption" sx={{ color: 'text.secondary', mt: 1 }}>
        Click the button the show full details
      </Typography>

      <LoadingButton href={url} target="_blank" fullWidth size="large" type="submit" variant="contained" sx={{ mt: 2, mb: 5 }}>
      Show Receipt
      </LoadingButton>

    </RootStyle>
  );
}

import { m } from 'framer-motion';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Container, Stack, InputAdornment } from '@mui/material';
// components
import Iconify from '../../components/Iconify';
import InputStyle from '../../components/InputStyle';
import { MotionContainer, TextAnimate, varFade } from '../../components/animate';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  backgroundSize: 'cover',
  backgroundImage:
    'url(https://minimal-assets-api.vercel.app/assets/overlay.svg), url(https://res.cloudinary.com/snakecloud/image/upload/v1653368352/about_fi2g5u.png)',
  padding: theme.spacing(10, 0),
  [theme.breakpoints.up('md')]: {
    height: 560,
    padding: 0,
  },
}));

const ContentStyle = styled(Stack)(({ theme }) => ({
  textAlign: 'center',
  [theme.breakpoints.up('md')]: {
    textAlign: 'left',
    position: 'absolute',
    bottom: theme.spacing(10),
  },
}));

// ----------------------------------------------------------------------

export default function FaqsHero() {
  return (
    <RootStyle>
      <Container component={MotionContainer} sx={{ position: 'relative', height: '100%' }}>
        <ContentStyle spacing={5}>
          <div>
            <TextAnimate text="How" sx={{ color: 'primary.main' }} variants={varFade().inRight} />
            <br />
            <Box sx={{ display: 'inline-flex', color: 'common.dark' }}>
              <TextAnimate text="can" sx={{ mr: 2 }} />
              <TextAnimate text="we" sx={{ mr: 2 }} />
              <TextAnimate text="help" sx={{ mr: 2 }} />
              <TextAnimate text="you?" />
            </Box>
          </div>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}

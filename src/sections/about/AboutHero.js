import { m } from 'framer-motion';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Container, Typography } from '@mui/material';
// components
import { MotionContainer, TextAnimate, varFade } from '../../components/animate';
import {AboutImage} from '../../pages/about.png';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme , }) => ({
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundImage:
    'url(https://minimal-assets-api.vercel.app/assets/overlay.svg), url(https://res.cloudinary.com/snakecloud/image/upload/v1653315806/about_dta75h.png)',
  padding: theme.spacing(10, 0),
  [theme.breakpoints.up('md')]: {
    height: 560,
    padding: 0,
  },
}));

const ContentStyle = styled('div')(({ theme }) => ({
  textAlign: 'center',
  [theme.breakpoints.up('md')]: {
    textAlign: 'left',
    position: 'absolute',
    bottom: theme.spacing(10),
  },
}));

// ----------------------------------------------------------------------

export default function AboutHero() {
  return (
    <RootStyle>
      <Container component={MotionContainer} sx={{ position: 'relative', height: '100%' }}>
        <ContentStyle>
          <TextAnimate text="Who" sx={{ color: 'primary.main' }} variants={varFade().inRight} />
          <br />
          <Box sx={{ display: 'inline-flex', color: 'common.dark' }}>
            <TextAnimate text="we" sx={{ mr: 2 }} />
            <TextAnimate text="are?" />
          </Box>

          <m.div variants={varFade().inRight}>
            <Typography
              variant="h4"
              sx={{
                mt: 5,
                color: 'common.dark',
                fontWeight: 'fontWeightMedium',
              }}
            >
              Let's work together and
              <br /> Earn together
            </Typography>
          </m.div>
        </ContentStyle>
      </Container>
      
    </RootStyle>
  );
}

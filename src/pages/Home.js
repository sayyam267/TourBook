// @mui
import { styled } from '@mui/material/styles';
// components
import Page from '../components/Page';
// sections
import {
  HomeHero,
  HomeMinimal,
  HomeDarkMode,
  HomeLookingFor,
  HomeColorPresets,
  HomePricingPlans,
  HomeAdvertisement,
  HomeCleanInterfaces,
  HomeHugePackElements,
} from '../sections/home';
// ----------------------------------------------------------------------

const RootStyle = styled('div')(() => ({
  height: '100%',
}));

const ContentStyle = styled('div')(({ theme }) => ({
  overflow: 'hidden',
  position: 'relative',
  backgroundColor: theme.palette.background.default,
}));

// ----------------------------------------------------------------------

export default function HomePage() {
  return (
  <>
      <Page title="Home">
        {/* <RootStyle> */}
        <HomeHero />
        <ContentStyle>

        <HomePricingPlans />
        <HomeMinimal />

        
        <HomeLookingFor />

        <HomeAdvertisement />
        </ContentStyle>
        {/* </RootStyle> */}
      </Page>
  </>
  );
}

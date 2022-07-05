import { capitalCase } from 'change-case';
import { useState, useRef,useEffect } from 'react';

// @mui

import PropTypes from 'prop-types';

import { Link as RouterLink,useLocation } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import {
    Tab, Box, Card, Tabs, Container, Link,Button, Typography, CardHeader, 
    Stack,
    Paper,
    Avatar,
    Checkbox,
    TextField,
    IconButton,
    AvatarGroup,
    Rating,
    InputAdornment,
    Grid,
    Divider,
    CardContent,
    FormControlLabel, } from '@mui/material';
// routes
import { PATH_DASHBOARD,PATH_PAGE } from '../routes/paths';
import Label from '../components/Label';

import InputStyle from '../components/InputStyle';
import SocialsButton from '../components/SocialsButton';
import SearchNotFound from '../components/SearchNotFound';
// utils
import { fNumber, fShortenNumber } from '../utils/formatNumber';
// hooks
import useAuth from '../hooks/useAuth';
import useSettings from '../hooks/useSettings';
// _mock_
import { _userAbout, _userFeeds, _userFriends, _userGallery, _userFollowers } from '../_mock';
// components
import Page from '../components/Page';
import Iconify from '../components/Iconify';
import HeaderBreadcrumbs from '../components/HeaderBreadcrumbs';
// sections

// utils
import { fDate } from '../utils/formatTime';
// components
import Image from '../components/Image';
import MyAvatar from '../components/MyAvatar';
import EmojiPicker from '../components/EmojiPicker';

// @mui
// utils
import cssStyles from '../utils/cssStyles';
// components
import LightboxModal from '../components/LightboxModal';

import axios from '../utils/axios';

// ----------------------------------------------------------------------
// @mui

// ----------------------------------------------------------------------

function ProfileFollowers({ followers }) {
    return (
        <Box sx={{ mt: 5 }}>
            <Typography variant="h4" sx={{ mb: 3 }}>
                Followers
            </Typography>

            <Grid container spacing={3}>
                {followers.map((follower) => (
                    <Grid key={follower.id} item xs={12} md={4}>
                        <FollowerCard follower={follower} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

// ----------------------------------------------------------------------


function FollowerCard({ follower }) {
    const { name, country, avatarUrl, isFollowed } = follower;

    const [toggle, setToogle] = useState(isFollowed);

    return (
        <Card sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
            <Avatar alt={name} src={avatarUrl} sx={{ width: 48, height: 48 }} />
            <Box sx={{ flexGrow: 1, minWidth: 0, pl: 2, pr: 1 }}>
                <Typography variant="subtitle2" noWrap>
                    {name}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Iconify icon={'eva:pin-fill'} sx={{ width: 16, height: 16, mr: 0.5, flexShrink: 0 }} />
                    <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                        {country}
                    </Typography>
                </Box>
            </Box>
            <Button
                size="small"
                onClick={() => setToogle(!toggle)}
                variant={toggle ? 'text' : 'outlined'}
                color={toggle ? 'primary' : 'inherit'}
                startIcon={toggle && <Iconify icon={'eva:checkmark-fill'} />}
            >
                {toggle ? 'Followed' : 'Follow'}
            </Button>
        </Card>
    );
}


// ----------------------------------------------------------------------
function ProfileGallery({ gallery }) {

    const CaptionStyle = styled(CardContent)(({ theme }) => ({
        ...cssStyles().bgBlur({ blur: 2, color: theme.palette.grey[900] }),
        bottom: 0,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        position: 'absolute',
        justifyContent: 'space-between',
        color: theme.palette.common.white,
    }));
    const [openLightbox, setOpenLightbox] = useState(false);

    const [selectedImage, setSelectedImage] = useState(0);

    const imagesLightbox = gallery.map((img) => img.imageUrl);

    const handleOpenLightbox = (url) => {
        const selectedImage = imagesLightbox.findIndex((index) => index === url);
        setOpenLightbox(true);
        setSelectedImage(selectedImage);
    };
    return (
        <Box sx={{ mt: 5 }}>
            <Typography variant="h4" sx={{ mb: 3 }}>
                Gallery
            </Typography>

            <Card sx={{ p: 3 }}>
                <Box
                    sx={{
                        display: 'grid',
                        gap: 3,
                        gridTemplateColumns: {
                            xs: 'repeat(1, 1fr)',
                            sm: 'repeat(2, 1fr)',
                            md: 'repeat(3, 1fr)',
                        },
                    }}
                >
                    {gallery.map((image) => (
                        <GalleryItem key={image.id} image={image} onOpenLightbox={handleOpenLightbox} />
                    ))}
                </Box>

                <LightboxModal
                    images={imagesLightbox}
                    mainSrc={imagesLightbox[selectedImage]}
                    photoIndex={selectedImage}
                    setPhotoIndex={setSelectedImage}
                    isOpen={openLightbox}
                    onCloseRequest={() => setOpenLightbox(false)}
                />
            </Card>
        </Box>
    );
}

// ----------------------------------------------------------------------


function GalleryItem({ image, onOpenLightbox }) {
    const { imageUrl, title, postAt } = image;
    return (
        <Card sx={{ cursor: 'pointer', position: 'relative' }}>
            <Image alt="gallery image" ratio="1/1" src={imageUrl} onClick={() => onOpenLightbox(imageUrl)} />

            {/* <CaptionStyle>
                <div>
                    <Typography variant="subtitle1">{title}</Typography>
                    <Typography variant="body2" sx={{ opacity: 0.72 }}>
                        {fDate(postAt)}
                    </Typography>
                </div>
                <IconButton color="inherit">
                    <Iconify icon={'eva:more-vertical-fill'} width={20} height={20} />
                </IconButton>
            </CaptionStyle> */}
        </Card>
    );
}


// ----------------------------------------------------------------------

const TabsWrapperStyle = styled('div')(({ theme }) => ({
    zIndex: 9,
    bottom: 0,
    width: '100%',
    display: 'flex',
    position: 'absolute',
    backgroundColor: theme.palette.background.paper,
    [theme.breakpoints.up('sm')]: {
        justifyContent: 'center',
    },
    [theme.breakpoints.up('md')]: {
        justifyContent: 'flex-end',
        paddingRight: theme.spacing(3),
    },
}));

// ----------------------------------------------------------------------

export default function UserProfile() {
    const { themeStretch } = useSettings();
    const { user } = useAuth();
    const [vendor,setVendor] = useState();
    const [tour,setTour] = useState();
    const location = useLocation();

    const [currentTab, setCurrentTab] = useState('profile');
    const [findFriends, setFindFriends] = useState('');

    const handleChangeTab = (newValue) => {
        setCurrentTab(newValue);
    };

    const handleFindFriends = (value) => {
        setFindFriends(value);
    };

    useEffect(() => {
        if(localStorage.getItem("VendorID")){
            getVendor();
        }
    }, [location?.state?.id])

    const getVendor = () => { 
        axios
            .get(`https://tourbook-backend.herokuapp.com/api/vendor/get/${localStorage.getItem("VendorID")}`,
                { headers: { 'x-auth-token': localStorage.getItem('accessToken') } }
            )
            .then((res) => {
                console.log(res.data.data);
                setTour(res.data.data.tours);
                setVendor(res.data.data.vendor);

            })
            .catch((e) => {
                console.log(e);
            });
        
       
    }

    const PROFILE_TABS = [
        {
            value: 'profile',
            icon: <Iconify icon={'ic:round-account-box'} width={20} height={20} />,
            component: <Profile myProfile={_userAbout} posts={_userFeeds} tour={tour} vendor={vendor} />,
        },
        // {
        //     value: 'followers',
        //     icon: <Iconify icon={'eva:heart-fill'} width={20} height={20} />,
        //     component: <ProfileFollowers followers={_userFollowers} />,
        // },
        // {
        //     value: 'friends',
        //     icon: <Iconify icon={'eva:people-fill'} width={20} height={20} />,
        //     component: <ProfileFriends friends={_userFriends} findFriends={findFriends} onFindFriends={handleFindFriends} />,
        // },
        // {
        //     value: 'gallery',
        //     icon: <Iconify icon={'ic:round-perm-media'} width={20} height={20} />,
        //     component: <ProfileGallery gallery={_userGallery} />,
        // },
    ];

    return (
        <Page title="User: Profile">
            <Container maxWidth={themeStretch ? false : 'lg'}>
               
                <Card
                    sx={{
                        mb: 3,
                        height: 280,
                        position: 'relative',
                    }}
                >
                   {vendor ?<ProfileCover myProfile={vendor} />:<></>}

                    {vendor ?<TabsWrapperStyle>
                        <Tabs
                            value={currentTab}
                            scrollButtons="auto"
                            variant="scrollable"
                            allowScrollButtonsMobile
                            onChange={(e, value) => handleChangeTab(value)}
                        >
                            {PROFILE_TABS.map((tab) => (
                                <Tab disableRipple key={tab.value} value={tab.value} icon={tab.icon} label={capitalCase(tab.value)} />
                            ))}
                        </Tabs>
                    </TabsWrapperStyle> : <></>}
                </Card>

                {PROFILE_TABS.map((tab) => {
                    const isMatched = tab.value === currentTab;
                    return isMatched && <Box key={tab.value}>{tab.component}</Box>;
                })}
            </Container>
        </Page>
    );
}




// ----------------------------------------------------------------------


function Profile({ myProfile, posts, tour, vendor }) {
    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
                <Stack spacing={3}>
                    <ProfileFollowInfo profile={tour} />
                    <ProfileAbout profile={vendor} />
                   
                </Stack>
            </Grid>

            <Grid item xs={12} md={8}>
                <Box
                    sx={{
                        display: 'grid',
                        gap: 3,
                        gridTemplateColumns: {
                            xs: 'repeat(1, 1fr)',
                            sm: 'repeat(2, 1fr)',
                            md: 'repeat(2, 1fr)',
                            lg: 'repeat(2, 1fr)',
                        },
                    }}
                    >
                    {tour ? tour?.map((tour) => (
                        <ShopProductCard tour={tour} />
                    )):<></>}
                </Box>
            </Grid>
        </Grid>
    );
}

function ShopProductCard({ tour }) {
   

    const linkTo = `${PATH_DASHBOARD.general.app}`;


    console.log(tour);
    return (
        <Card sx={{ borderRadius: 2, bgcolor: 'background.neutral' }}>
            <Box sx={{ position: 'relative', px: 1, pt: 1 }}>
                <Image alt={"img"} src={tour?.tourpics[0]} ratio="1/1" />
            </Box>

            <Stack spacing={2.5} sx={{ p: 3, pb: 2.5 }}>
                <Stack direction="row" alignItems="center" spacing={1}>
                    <div>
                        <Link to={localStorage.getItem('accessToken') ? linkTo : PATH_PAGE.details} color="inherit" onClick={() => localStorage.setItem('tourId', tour?._id)} component={RouterLink}>
                            <Typography variant="subtitle2">{tour?.name}</Typography>
                        </Link>
                        <Typography variant="caption" sx={{ color: 'text.disabled', mt: 0.5, display: 'block' }}>
                            {/* Starting from {fDateTime(tour.addedOn)} */}
                            {/* {`Startin from ${Date(tour.addedOn)}`} */}

                            {`Starting From: ${Date(tour?.startDate)}`}
                            {/* `${Date(tour.startDate).getDay()}  ${Date(tour.startDate).getDate()} - ${Date(tour.startDate).getMonth()} - ${Date(tour.startDate).getYear()}` */}

                            {/* Starting from {`${ Date(tour.addedOn).getDay()}  ${ Date(tour.addedOn).getDate()} - ${ Date(tour.addedOn).getMonth()} - ${new Date(tour.addedOn).getYear()}`} */}
                        </Typography>
                    </div>
                </Stack>

                <Stack direction="row" alignItems="center" spacing={1} sx={{ color: 'text.secondary' }}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <Iconify icon={'topcoat:location'} width={16} height={16} />
                        <Typography variant="caption">Source: {tour?.source?.name}</Typography>
                    </Stack>
                </Stack>

                <Stack direction="row" alignItems="center" spacing={1} sx={{ color: 'text.secondary' }}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <Iconify icon={'topcoat:location'} width={16} height={16} />
                        <Typography variant="caption">Dstination: {tour?.destination?.name}</Typography>
                    </Stack>
                </Stack>

                <Stack direction="row" alignItems="center" spacing={1} sx={{ color: 'text.secondary' }}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <Iconify icon={'ic:outline-airline-seat-recline-normal'} width={16} height={16} />
                        <Typography variant="caption">{tour?.seats}</Typography>
                    </Stack>

                    <Stack direction="row" alignItems="center" spacing={1}>
                        <Label
                            variant="ghost"
                            color={'success'}
                        >
                            <Iconify icon={'icomoon-free:price-tags'} width={16} height={16} />
                            <Typography variant="caption"> {tour?.price} RS</Typography>
                        </Label>
                    </Stack>
                </Stack>
            </Stack>



        </Card>
    );
}



// ----------------------------------------------------------------------

const IconStyle = styled(Iconify)(({ theme }) => ({
    width: 20,
    height: 20,
    marginTop: 1,
    flexShrink: 0,
    marginRight: theme.spacing(2),
}));

// ----------------------------------------------------------------------


function ProfileAbout({ profile }) {
   
    return (
        <Card>
            <CardHeader title="About" />

            <Stack spacing={2} sx={{ p: 3 }}>
                <Typography variant="body2">Description</Typography>

                <Stack direction="row">
                    <IconStyle icon={'eva:pin-fill'} />
                    <Typography variant="body2">
                        Live at &nbsp;
                        <Link component="span" variant="subtitle2" color="text.primary">
                            Pakistan
                        </Link>
                    </Typography>
                </Stack>

                <Stack direction="row">
                    <IconStyle icon={'eva:email-fill'} />
                    <Typography variant="body2">{profile? profile[0]?.email :''}</Typography>
                </Stack>

                <Stack direction="row">
                    <IconStyle icon={'ic:round-business-center'} />
                    <Typography variant="body2">
                        Vendor at &nbsp;
                        <Link component="span" variant="subtitle2" color="text.primary">
                            TourBook
                        </Link>
                    </Typography>
                </Stack>
                <Stack direction="row">

                    <Rating name="read-only" value={profile ? profile[0]?.rating : 0} readOnly />
                   
                </Stack>

                
            </Stack>
        </Card>
    );
}


// ----------------------------



// hooks


// ----------------------------------------------------------------------


function ProfilePostCard({ post }) {
    const { user } = useAuth();

    const commentInputRef = useRef(null);

    const fileInputRef = useRef(null);

    const [isLiked, setLiked] = useState(post.isLiked);

    const [likes, setLikes] = useState(post.personLikes.length);

    const [message, setMessage] = useState('');

    const hasComments = post.comments.length > 0;

    const handleLike = () => {
        setLiked(true);
        setLikes((prevLikes) => prevLikes + 1);
    };

    const handleUnlike = () => {
        setLiked(false);
        setLikes((prevLikes) => prevLikes - 1);
    };

    const handleChangeMessage = (value) => {
        setMessage(value);
    };

    const handleClickAttach = () => {
        fileInputRef.current?.click();
    };

    const handleClickComment = () => {
        commentInputRef.current?.focus();
    };

    return (
        <Card>
            <CardHeader
                disableTypography
                avatar={<MyAvatar />}
                title={
                    <Link to="#" variant="subtitle2" color="text.primary" component={RouterLink}>
                        {user?.displayName}
                    </Link>
                }
                subheader={
                    <Typography variant="caption" sx={{ display: 'block', color: 'text.secondary' }}>
                        {fDate(post.createdAt)}
                    </Typography>
                }
                action={
                    <IconButton>
                        <Iconify icon={'eva:more-vertical-fill'} width={20} height={20} />
                    </IconButton>
                }
            />

            <Stack spacing={3} sx={{ p: 3 }}>
                <Typography>{post.message}</Typography>

                <Image alt="post media" src={post.media} ratio="16/9" sx={{ borderRadius: 1 }} />

                <Stack direction="row" alignItems="center">
                    <FormControlLabel
                        control={
                            <Checkbox
                                size="small"
                                color="error"
                                checked={isLiked}
                                icon={<Iconify icon={'eva:heart-fill'} />}
                                checkedIcon={<Iconify icon={'eva:heart-fill'} />}
                                onChange={isLiked ? handleUnlike : handleLike}
                            />
                        }
                        label={fShortenNumber(likes)}
                        sx={{ minWidth: 72, mr: 0 }}
                    />
                    <AvatarGroup max={4} sx={{ '& .MuiAvatar-root': { width: 32, height: 32 } }}>
                        {post.personLikes.map((person) => (
                            <Avatar key={person.name} alt={person.name} src={person.avatarUrl} />
                        ))}
                    </AvatarGroup>
                    <Box sx={{ flexGrow: 1 }} />
                    <IconButton onClick={handleClickComment}>
                        <Iconify icon={'eva:message-square-fill'} width={20} height={20} />
                    </IconButton>
                    <IconButton>
                        <Iconify icon={'eva:share-fill'} width={20} height={20} />
                    </IconButton>
                </Stack>

                {hasComments && (
                    <Stack spacing={1.5}>
                        {post.comments.map((comment) => (
                            <Stack key={comment.id} direction="row" spacing={2}>
                                <Avatar alt={comment.author.name} src={comment.author.avatarUrl} />
                                <Paper sx={{ p: 1.5, flexGrow: 1, bgcolor: 'background.neutral' }}>
                                    <Stack
                                        direction={{ xs: 'column', sm: 'row' }}
                                        alignItems={{ sm: 'center' }}
                                        justifyContent="space-between"
                                        sx={{ mb: 0.5 }}
                                    >
                                        <Typography variant="subtitle2">{comment.author.name}</Typography>
                                        <Typography variant="caption" sx={{ color: 'text.disabled' }}>
                                            {fDate(comment.createdAt)}
                                        </Typography>
                                    </Stack>
                                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                        {comment.message}
                                    </Typography>
                                </Paper>
                            </Stack>
                        ))}
                    </Stack>
                )}

                <Stack direction="row" alignItems="center">
                    <MyAvatar />
                    <TextField
                        fullWidth
                        size="small"
                        value={message}
                        inputRef={commentInputRef}
                        placeholder="Write a comment…"
                        onChange={(event) => handleChangeMessage(event.target.value)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton size="small" onClick={handleClickAttach}>
                                        <Iconify icon={'ic:round-add-photo-alternate'} width={24} height={24} />
                                    </IconButton>
                                    <EmojiPicker alignRight value={message} setValue={setMessage} />
                                </InputAdornment>
                            ),
                        }}
                        sx={{
                            ml: 2,
                            mr: 1,
                            '& fieldset': {
                                borderWidth: `1px !important`,
                                borderColor: (theme) => `${theme.palette.grey[500_32]} !important`,
                            },
                        }}
                    />
                    <IconButton>
                        <Iconify icon={'ic:round-send'} width={24} height={24} />
                    </IconButton>
                    <input type="file" ref={fileInputRef} style={{ display: 'none' }} />
                </Stack>
            </Stack>
        </Card>
    );
}

// ----------------------------





// ----------------------------------------------------------------------

function ProfilePostInput() {
    const fileInputRef = useRef(null);

    const handleAttach = () => {
        fileInputRef.current?.click();
    };

    return (
        <Card sx={{ p: 3 }}>
            <TextField
                multiline
                fullWidth
                rows={4}
                placeholder="Share what you are thinking here..."
                sx={{
                    '& fieldset': {
                        borderWidth: `1px !important`,
                        borderColor: (theme) => `${theme.palette.grey[500_32]} !important`,
                    },
                }}
            />

            <Box
                sx={{
                    mt: 3,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                <Box sx={{ display: 'flex' }}>
                    <IconButton size="small" onClick={handleAttach} sx={{ mr: 1 }}>
                        <Iconify icon={'ic:round-add-photo-alternate'} width={24} height={24} />
                    </IconButton>
                    <IconButton size="small" onClick={handleAttach}>
                        <Iconify icon={'eva:attach-2-fill'} width={24} height={24} />
                    </IconButton>
                </Box>
                <Button variant="contained">Post</Button>
            </Box>

            <input ref={fileInputRef} type="file" style={{ display: 'none' }} />
        </Card>
    );
}





// ----------------------------------------------------------------------



function ProfileFollowInfo({ profile }) {
  
    console.log("total",profile);
    return (
        <Card sx={{ py: 3 }}>
            <Stack direction="row" divider={<Divider orientation="vertical" flexItem />}>
                <Stack width={1} textAlign="center">
                    <Typography variant="h4">{profile ?profile.length :""}</Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Total Tours Hosted
                    </Typography>
                </Stack>

                {/* <Stack width={1} textAlign="center">
                    <Typography variant="h4">{fNumber(following)}</Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Following
                    </Typography>
                </Stack> */}
            </Stack>
        </Card>
    );
}





// ----------------------------------------------------------------------


// ----------------------------------------------------------------------


function ProfileCover({ myProfile }) {
    const { user } = useAuth();

    console.log("my profile",myProfile);

    const RootStyle = styled('div')(({ theme }) => ({
        '&:before': {
            ...cssStyles().bgBlur({ blur: 2, color: theme.palette.primary.darker }),
            top: 0,
            zIndex: 9,
            content: "''",
            width: '100%',
            height: '100%',
            position: 'absolute',
        },
    }));

    const InfoStyle = styled('div')(({ theme }) => ({
        left: 0,
        right: 0,
        zIndex: 99,
        position: 'absolute',
        marginTop: theme.spacing(5),
        [theme.breakpoints.up('md')]: {
            right: 'auto',
            display: 'flex',
            alignItems: 'center',
            left: theme.spacing(3),
            bottom: theme.spacing(3),
        },
    }));

    return (
        <RootStyle>
            <InfoStyle>
                <MyAvatar
                    sx={{
                        mx: 'auto',
                        borderWidth: 2,
                        borderStyle: 'solid',
                        borderColor: 'common.white',
                        width: { xs: 80, md: 128 },
                        height: { xs: 80, md: 128 },
                    }}
                />
                <Box
                    sx={{
                        ml: { md: 3 },
                        mt: { xs: 1, md: 0 },
                        color: 'common.white',
                        textAlign: { xs: 'center', md: 'left' },
                    }}
                >
                    <Typography variant="h4">{myProfile[0]?.fname} {myProfile[0]?.lname}</Typography>
                    {/* <Typography sx={{ opacity: 0.72 }}>{position}</Typography> */}<Rating name="read-only" value={myProfile ? myProfile[0]?.rating : 0} readOnly />
                </Box>
            </InfoStyle>
            <Image alt="profile cover" src={myProfile[0]?.profilePicture} sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} />
        </RootStyle>
    );
}



// ----------------------------------------------------------------------


 function ProfileFriends({ friends, findFriends, onFindFriends }) {
    const friendFiltered = applyFilter(friends, findFriends);

    const isNotFound = friendFiltered.length === 0;

    return (
        <Box sx={{ mt: 5 }}>
            <Typography variant="h4" sx={{ mb: 3 }}>
                Friends
            </Typography>

            <InputStyle
                stretchStart={240}
                value={findFriends}
                onChange={(event) => onFindFriends(event.target.value)}
                placeholder="Find friends..."
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Iconify icon={'eva:search-fill'} sx={{ color: 'text.disabled', width: 20, height: 20 }} />
                        </InputAdornment>
                    ),
                }}
                sx={{ mb: 5 }}
            />

            <Grid container spacing={3}>
                {friendFiltered.map((friend) => (
                    <Grid key={friend.id} item xs={12} md={4}>
                        <FriendCard friend={friend} />
                    </Grid>
                ))}
            </Grid>

            {isNotFound && (
                <Box sx={{ mt: 5 }}>
                    <SearchNotFound searchQuery={findFriends} />
                </Box>
            )}
        </Box>
    );
}

// ----------------------------------------------------------------------


function FriendCard({ friend }) {
    const { name, role, avatarUrl } = friend;

    return (
        <Card
            sx={{
                py: 5,
                display: 'flex',
                position: 'relative',
                alignItems: 'center',
                flexDirection: 'column',
            }}
        >
            <Avatar alt={name} src={avatarUrl} sx={{ width: 64, height: 64, mb: 3 }} />
            <Link variant="subtitle1" color="text.primary">
                {name}
            </Link>

            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                {role}
            </Typography>

            <SocialsButton initialColor />

            <IconButton sx={{ top: 8, right: 8, position: 'absolute' }}>
                <Iconify icon={'eva:more-vertical-fill'} width={20} height={20} />
            </IconButton>
        </Card>
    );
}
// ----------------------------------------------------------------------

function applyFilter(array, query) {
    if (query) {
        return array.filter((friend) => friend.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
    }

    return array;
}


import { sentenceCase } from 'change-case';
import { Link as RouterLink, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

// import queries
import { useQuery, useMutation } from '@apollo/react-hooks';

// @mui
import { alpha, styled, useTheme } from '@mui/material/styles';

import {
  Box,
  Tab,
  Card,
  Grid,
  Divider,
  Container,
  Typography,
  Button,
  Avatar,
  Link,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Stack
} from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';

// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import Page from '../../../components/Page';
import Image from '../../../components/Image';
import Iconify from '../../../components/Iconify';
import Markdown from '../../../components/Markdown';
import { SkeletonGame } from '../../../components/skeleton';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';

// sections
import { GameDetailsSummary } from '../../../sections/@dashboard/game-details';

// queries
import { game as gameQuery } from '../../../_queries/Games.gql';
import { user as userQuery } from '../../../_queries/Users.gql';

// mutations
import {
  addGameToWishlist as addGameToWishlistMutation,
  addGameToItchlist as addGameToItchlistMutation,
  addGameToOwnlist as addGameToOwnlistMutation,
  removeGameFromWishlist as removeGameFromWishlistMutation,
  removeGameFromItchlist as removeGameFromItchlistMutation,
  removeGameFromOwnlist as removeGameFromOwnlistMutation,
  updateGamePlayCount as updateGamePlayCountMutation
} from '../../../_mutations/Users.gql';
import { set } from 'lodash';
// ----------------------------------------------------------------------

const IconWrapperStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  justifyContent: 'center',
  height: theme.spacing(8),
  marginBottom: theme.spacing(3),
  color: theme.palette.primary.main,
  backgroundColor: `${alpha(theme.palette.primary.main, 0.08)}`
}));

// ----------------------------------------------------------------------

export default function GameDetails() {
  const [addGameToWishlist] = useMutation(addGameToWishlistMutation);
  const [removeGameFromWishlist] = useMutation(removeGameFromWishlistMutation);

  const [addGameToItchlist] = useMutation(addGameToItchlistMutation);
  const [removeGameFromItchlist] = useMutation(removeGameFromItchlistMutation);

  const [addGameToOwnlist] = useMutation(addGameToOwnlistMutation);
  const [removeGameFromOwnlist] = useMutation(removeGameFromOwnlistMutation);

  const [updateGamePlayCount] = useMutation(updateGamePlayCountMutation);

  const theme = useTheme();

  const [value, setValue] = useState('1');
  const [wishListStatus, setWishListStatus] = useState(false);
  const [itchListStatus, setItchListStatus] = useState(false);
  const [ownListStatus, setOwnListStatus] = useState(false);

  const { gameId } = useParams();

  const [game, setGame] = useState({});
  const [user, setUser] = useState({});

  const [gamePlayCount, setGamePlayCount] = useState(0);

  const { loading, data } = useQuery(gameQuery, { variables: { _id: gameId } });
  const userData = useQuery(userQuery).data;
  const tmpUser = userData && userData.user;

  const tmpGame = data && data.game;

  useEffect(() => {
    if (tmpUser && tmpGame) {
      const { gamePlayCounts } = tmpUser;
      const { wishlist, itchlist, ownlist } = tmpUser;
      const { _id } = tmpGame;

      if (wishlist) {
        const wishStatus = wishlist.find((wl) => wl === _id);
        setWishListStatus(wishStatus);
      }

      if (itchlist) {
        const itchStatus = itchlist.find((wl) => wl === _id);
        setItchListStatus(itchStatus);
      }

      if (ownlist) {
        const ownStatus = ownlist.find((wl) => wl === _id);
        setOwnListStatus(ownStatus);
      }

      const gamePlayCount = gamePlayCounts ? gamePlayCounts : [];
      const tmpGamePlayCounts = gamePlayCount.find((gamePlay) => gamePlay._id === tmpGame._id) || {
        count: 0
      };
      setGamePlayCount(Number(tmpGamePlayCounts.count));

      setGame(tmpGame);
      setUser(tmpUser);
    }
  }, [tmpUser, tmpGame]);

  const handleWishListStatus = (status) => {
    const mutate = status ? addGameToWishlist : removeGameFromWishlist;

    mutate({
      variables: {
        _id: game._id
      },
      refetchQueries: [{ query: userQuery }]
    });

    setWishListStatus(status);
  };

  const handleItchListStatus = (status) => {
    const mutate = status ? addGameToItchlist : removeGameFromItchlist;

    mutate({
      variables: {
        _id: game._id
      },
      refetchQueries: [{ query: userQuery }]
    });

    setItchListStatus(status);
  };

  const handleOwnListStatus = (status) => {
    const mutate = status ? addGameToOwnlist : removeGameFromOwnlist;

    mutate({
      variables: {
        _id: game._id
      },
      refetchQueries: [{ query: userQuery }]
    });

    setOwnListStatus(status);
  };

  return (
    <Page title="Game Detail">
      <Container maxWidth="lg">
        <HeaderBreadcrumbs
          heading="Game Details"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Games', href: PATH_DASHBOARD.games },
            { name: `${game.title}` }
          ]}
          action={
            <Button
              variant="contained"
              component={RouterLink}
              to={PATH_DASHBOARD.games}
              startIcon={<Iconify icon={'icon-park-outline:back'} />}
            >
              Back to List
            </Button>
          }
        />

        {!loading ? (
          <>
            <Card>
              <Grid container>
                <Grid item xs={12} md={6} lg={7}>
                  <Image disabledEffect alt="large image" src={game.image} ratio="1/1" />
                </Grid>
                <Grid item xs={12} md={6} lg={5}>
                  <GameDetailsSummary
                    game={game}
                    owned={!!ownListStatus}
                    gameId={game._id}
                    gamePlayCount={gamePlayCount}
                    updateGamePlayCount={updateGamePlayCount}
                  />
                </Grid>
              </Grid>
            </Card>

            <Grid container sx={{ my: 8 }}>
              {/* wishlist */}
              <Grid item xs={12} md={4}>
                <Box sx={{ my: 2, mx: 'auto', maxWidth: 280, textAlign: 'center' }}>
                  <IconWrapperStyle sx={{ backgroundColor: `${alpha(theme.palette.error.main, 0.08)}` }}>
                    <Iconify
                      sx={{ color: theme.palette.error.main }}
                      icon={wishListStatus ? 'ic:round-verified' : 'material-symbols:verified-outline'}
                      width={36}
                      height={36}
                    />
                  </IconWrapperStyle>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {wishListStatus ? 'Added to wishlist' : 'Removed from wishlist'}
                  </Typography>
                  <Button
                    fullWidth
                    disabled={!!ownListStatus}
                    size="large"
                    color="error"
                    variant={wishListStatus ? 'contained' : 'outlined'}
                    startIcon={<Iconify icon={'cil:heart'} />}
                    onClick={() => handleWishListStatus(!wishListStatus)}
                    sx={{ whiteSpace: 'nowrap' }}
                  >
                    WishList
                  </Button>
                </Box>
              </Grid>

              {/* itchlist */}
              <Grid item xs={12} md={4}>
                <Box sx={{ my: 2, mx: 'auto', maxWidth: 280, textAlign: 'center' }}>
                  <IconWrapperStyle>
                    <Iconify
                      icon={itchListStatus ? 'ic:round-verified' : 'material-symbols:verified-outline'}
                      width={36}
                      height={36}
                    />
                  </IconWrapperStyle>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {itchListStatus ? 'Added to itchlist' : 'Removed from itchlist'}
                  </Typography>
                  <Button
                    fullWidth
                    size="large"
                    color="primary"
                    variant={itchListStatus ? 'contained' : 'outlined'}
                    startIcon={<Iconify icon={'ic:sharp-travel-explore'} />}
                    onClick={() => handleItchListStatus(!itchListStatus)}
                    sx={{ whiteSpace: 'nowrap' }}
                  >
                    ItchList
                  </Button>
                </Box>
              </Grid>

              {/* ownlist */}
              <Grid item xs={12} md={4}>
                <Box sx={{ my: 2, mx: 'auto', maxWidth: 280, textAlign: 'center' }}>
                  <IconWrapperStyle sx={{ backgroundColor: `${alpha(theme.palette.warning.main, 0.08)}` }}>
                    <Iconify
                      sx={{ color: theme.palette.warning.main }}
                      icon={ownListStatus ? 'ic:round-verified' : 'material-symbols:verified-outline'}
                      width={36}
                      height={36}
                    />
                  </IconWrapperStyle>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {ownListStatus ? 'Added to ownlist' : 'Removed from ownlist'}
                  </Typography>
                  <Button
                    fullWidth
                    size="large"
                    color="warning"
                    variant={ownListStatus ? 'contained' : 'outlined'}
                    startIcon={<Iconify icon={'bi:person-check'} />}
                    onClick={() => handleOwnListStatus(!ownListStatus)}
                    sx={{ whiteSpace: 'nowrap' }}
                  >
                    ownList
                  </Button>
                </Box>
              </Grid>
            </Grid>

            <Card>
              <TabContext value={value}>
                <Box sx={{ px: 3, bgcolor: 'background.neutral' }}>
                  <TabList
                    onChange={(e, value) => setValue(value)}
                    sx={{ '& .MuiTabs-scroller': { overflow: 'auto !important' } }}
                  >
                    <Tab disableRipple value="1" label="Game Description" />
                    <Tab disableRipple value="2" label="Game Mechanics" />
                    <Tab disableRipple value="3" label="Categories" />
                    <Tab disableRipple value="4" label="Designers" />
                    <Tab disableRipple value="5" label="Artists" />
                    <Tab disableRipple value="6" label="Publishers" />
                  </TabList>
                </Box>

                <Divider />

                <TabPanel value="1">
                  <Box sx={{ p: 3 }}>
                    <Markdown children={game.description} />
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center">
                      <Button
                        color="error"
                        variant="contained"
                        startIcon={<Iconify icon={'icon-park-solid:youtube'} />}
                        onClick={() => {
                          let ythURL = 'https://www.youtube.com/results?search_query=review+' + game.title;
                          ythURL = ythURL.replace(' ', '+');
                          window.open(ythURL, '_blank');
                        }}
                        sx={{ whiteSpace: 'nowrap' }}
                      >
                        Find YouTube Review
                      </Button>
                      <Button
                        color="primary"
                        variant="contained"
                        startIcon={<Iconify icon={'fa-solid:chalkboard-teacher'} />}
                        onClick={() => {
                          let ythURL = 'https://www.youtube.com/results?search_query=how+to+play+' + game.title;
                          ythURL = ythURL.replace(' ', '+');
                          window.open(ythURL, '_blank');
                        }}
                        sx={{ whiteSpace: 'nowrap' }}
                      >
                        Find YouTube How To Play
                      </Button>
                      <Button
                        color="warning"
                        variant="contained"
                        startIcon={<Iconify icon={'iconoir:gamepad'} />}
                        onClick={() => {
                          let bggURL = 'https://boardgamegeek.com/boardgame/' + game.bggid;
                          window.open(bggURL, '_blank');
                        }}
                        sx={{ whiteSpace: 'nowrap' }}
                      >
                        View on BGG
                      </Button>
                      <Button
                        color="secondary"
                        variant="contained"
                        startIcon={<Iconify icon={'ic:round-queue-music'} />}
                        onClick={() => {
                          let bggURL =
                            'https://melodice.org/playlist/' +
                            encodeURI(
                              game.title
                                .replaceAll(' ', '-')
                                .replaceAll('!', '')
                                .replaceAll('@', '')
                                .replaceAll('#', '')
                                .replaceAll('$', '')
                                .replaceAll('%', '')
                                .replaceAll('&', '')
                                .replaceAll('*', '')
                                .replaceAll('(', '')
                                .replaceAll(')', '')
                                .replaceAll('–', '')
                                .replaceAll(':', '')
                                .replaceAll(';', '')
                                .replaceAll("'", '')
                                .replaceAll(',', '')
                                .replaceAll('.', '')
                                .replaceAll('?', '')
                                .replaceAll('à', 'a')
                                .replaceAll('ä', 'a')
                                .replaceAll('é', 'e')
                                .replaceAll('í', 'i')
                                .replaceAll('ó', 'o')
                                .replaceAll('Ü', 'U')
                                .replaceAll('₂', '2')
                            );

                          window.open(bggURL, '_blank');
                        }}
                        sx={{ whiteSpace: 'nowrap' }}
                      >
                        Find Music
                      </Button>
                    </Stack>
                  </Box>
                </TabPanel>
                <TabPanel value="2">
                  <List>
                    {game.gameMechanics && game.gameMechanics.length > 0 ? (
                      <>
                        {game.gameMechanics.map((gameMechanic) => (
                          <ListItem key={gameMechanic.id}>
                            <ListItemAvatar>
                              <Avatar>
                                <Iconify icon={'bi:link-45deg'} />
                              </Avatar>
                            </ListItemAvatar>
                            <Link
                              underline="hover"
                              color="text.primary"
                              href={`https://boardgamegeek.com/boardgamemechanic/${gameMechanic.id}`}
                              target="_blank"
                              rel="noopener"
                              variant="body2"
                            >
                              <ListItemText primary={`${gameMechanic.mechanic}`} />
                            </Link>
                          </ListItem>
                        ))}
                      </>
                    ) : (
                      <Box sx={{ padding: 10 }}>
                        <Typography variant="body1" sx={{ textAlign: 'center' }}>
                          There is no data
                        </Typography>
                      </Box>
                    )}
                  </List>
                </TabPanel>
                <TabPanel value="3">
                  <List>
                    {game.gameCategories && game.gameCategories.length > 0 ? (
                      <>
                        {game.gameCategories.map((gameCategory) => (
                          <ListItem key={gameCategory.id}>
                            <ListItemAvatar>
                              <Avatar>
                                <Iconify icon={'bi:link-45deg'} />
                              </Avatar>
                            </ListItemAvatar>
                            <Link
                              underline="hover"
                              color="text.primary"
                              href={`https://boardgamegeek.com/boardgamecategory/${gameCategory.id}`}
                              target="_blank"
                              rel="noopener"
                              variant="body2"
                            >
                              <ListItemText primary={`${gameCategory.category}`} />
                            </Link>
                          </ListItem>
                        ))}
                      </>
                    ) : (
                      <Box sx={{ padding: 10 }}>
                        <Typography variant="body1" sx={{ textAlign: 'center' }}>
                          There is no data
                        </Typography>
                      </Box>
                    )}
                  </List>
                </TabPanel>
                <TabPanel value="4">
                  <List>
                    {game.gameDesigners && game.gameDesigners.length > 0 ? (
                      <>
                        {game.gameDesigners.map((gameDesigner) => (
                          <ListItem key={gameDesigner.id}>
                            <ListItemAvatar>
                              <Avatar>
                                <Iconify icon={'bi:link-45deg'} />
                              </Avatar>
                            </ListItemAvatar>
                            <Link
                              underline="hover"
                              color="text.primary"
                              href={`https://boardgamegeek.com/boardgamedesigner/${gameDesigner.id}`}
                              target="_blank"
                              rel="noopener"
                              variant="body2"
                            >
                              <ListItemText primary={`${gameDesigner.designer}`} />
                            </Link>
                          </ListItem>
                        ))}
                      </>
                    ) : (
                      <Box sx={{ padding: 10 }}>
                        <Typography variant="body1" sx={{ textAlign: 'center' }}>
                          There is no data
                        </Typography>
                      </Box>
                    )}
                  </List>
                </TabPanel>
                <TabPanel value="5">
                  <List>
                    {game.gameArtists && game.gameArtists.length > 0 ? (
                      <>
                        {game.gameArtists.map((gameArtist) => (
                          <ListItem key={gameArtist.id}>
                            <ListItemAvatar>
                              <Avatar>
                                <Iconify icon={'bi:link-45deg'} />
                              </Avatar>
                            </ListItemAvatar>
                            <Link
                              underline="hover"
                              color="text.primary"
                              href={`https://boardgamegeek.com/boardgameartist/${gameArtist.id}`}
                              target="_blank"
                              rel="noopener"
                              variant="body2"
                            >
                              <ListItemText primary={`${gameArtist.name}`} />
                            </Link>
                          </ListItem>
                        ))}
                      </>
                    ) : (
                      <Box sx={{ padding: 10 }}>
                        <Typography variant="body1" sx={{ textAlign: 'center' }}>
                          There is no data
                        </Typography>
                      </Box>
                    )}
                  </List>
                </TabPanel>
                <TabPanel value="6">
                  <List>
                    {game.gamePublishers && game.gamePublishers.length > 0 ? (
                      <>
                        {game.gamePublishers.map((gamePublisher) => (
                          <ListItem key={gamePublisher.id}>
                            <ListItemAvatar>
                              <Avatar>
                                <Iconify icon={'bi:link-45deg'} />
                              </Avatar>
                            </ListItemAvatar>
                            <Link
                              underline="hover"
                              color="text.primary"
                              href={`https://boardgamegeek.com/boardgamepublisher/${gamePublisher.id}`}
                              target="_blank"
                              rel="noopener"
                              variant="body2"
                            >
                              <ListItemText primary={`${gamePublisher.publisher}`} />
                            </Link>
                          </ListItem>
                        ))}
                      </>
                    ) : (
                      <Box sx={{ padding: 10 }}>
                        <Typography variant="body1" sx={{ textAlign: 'center' }}>
                          There is no data
                        </Typography>
                      </Box>
                    )}
                  </List>
                </TabPanel>
              </TabContext>
            </Card>
          </>
        ) : (
          <SkeletonGame />
        )}
      </Container>
    </Page>
  );
}

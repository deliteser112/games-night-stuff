import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { useTheme } from '@mui/material/styles';
import { Container, Grid, Button } from '@mui/material';

// components
import Page from '../../components/Page';
// sections
import { AppWelcome, FriendLists, AppWidgetSummary, AppCurrentDownload } from '../../sections/@dashboard/general/app';
// assets
import { SeoIllustration } from '../../assets';

// routes
import { PATH_DASHBOARD } from '../../routes/paths';

// import queries
import { useQuery } from '@apollo/react-hooks';

// queries
import { games as gamesQuery } from '../../_queries/Games.gql';
import { user as userQuery, users as usersQuery } from '../../_queries/Users.gql';

// ----------------------------------------------------------------------

export default function GeneralApp() {
  const theme = useTheme();

  const [userName, setUserName] = useState('');
  const [totalLoanedTo, setTotalLoanedTo] = useState([]);

  const [sitchlist, setItchList] = useState([]);
  const [swishlist, setWishList] = useState([]);
  const [sownlist, setOwnList] = useState([]);

  const [friendLists, setFriendLists] = useState([]);

  const [viewCount, setViewCount] = useState(-4);

  const { data } = useQuery(gamesQuery);
  const games = (data && data.games) || [];

  const userData = useQuery(userQuery).data;
  const tmpUser = userData && userData.user;

  const usersData = useQuery(usersQuery).data;
  const tmpUsers = (usersData && usersData.users && usersData.users.users) || [];

  useEffect(() => {
    if (tmpUser && tmpUsers.length > 0) {
      const { name, loanedTo, itchlist, wishlist, ownlist, friends } = tmpUser;
      const username = `${name.first} ${name.last}`;

      setItchList(itchlist || []);
      setWishList(wishlist || []);
      setOwnList(ownlist || []);

      setUserName(username);
      setTotalLoanedTo(loanedTo || []);

      if (friends) {
        const tmpFriends = friends.map((friend) => tmpUsers.find(({ _id }) => friend.userId === _id));
        setFriendLists(tmpFriends);
      }
    }
  }, [tmpUser, tmpUsers]);

  const handleViewAll = () => {
    setViewCount(-friendLists.length);
  }

  return (
    <Page title="Analytics">
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <AppWelcome
              title={`Welcome back! \n ${userName}`}
              description="It keeps a record of all the games in your growing collection. Tracks who you have lent them to. Connects you with the people and the games you are itching to play. It even helps you choose your next game. All this, from any device you like."
              img={
                <SeoIllustration
                  sx={{
                    p: 3,
                    width: 360,
                    margin: { xs: 'auto', md: 'inherit' }
                  }}
                />
              }
              action={
                <Button variant="contained" component={RouterLink} to={PATH_DASHBOARD.games}>
                  Go Now
                </Button>
              }
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <AppWidgetSummary
              title="Total Active Users"
              percent={2.6}
              total={tmpUsers.length}
              chartColor={theme.palette.primary.main}
              chartData={[5, 18, 12, 51, 68, 11, 39, 37, 27, 20]}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <AppWidgetSummary
              title="Total Games"
              percent={0.2}
              total={games.length}
              chartColor={theme.palette.chart.blue[0]}
              chartData={[20, 41, 63, 33, 28, 35, 50, 46, 11, 26]}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <AppWidgetSummary
              title="Total LoanedTo"
              percent={-0.1}
              total={totalLoanedTo.length}
              chartColor={theme.palette.chart.red[0]}
              chartData={[8, 9, 31, 8, 16, 37, 8, 33, 46, 31]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentDownload
              title="Current Active"
              chartColors={[theme.palette.primary.main, theme.palette.error.main, theme.palette.warning.main]}
              chartData={[
                { label: 'ItchList', value: sitchlist.length },
                { label: 'WishList', value: swishlist.length },
                { label: 'OwnList', value: sownlist.length }
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <FriendLists
              title="Friends"
              subheader={`You have ${friendLists.length} friends`}
              list={friendLists.slice(viewCount)}
              onViewAll={handleViewAll}
            />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}

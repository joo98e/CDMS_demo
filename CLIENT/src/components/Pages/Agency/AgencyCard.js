import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';

import axios from 'axios'
import {
  Grid, Grow, Paper, Button, Typography, Box,
  Avatar, makeStyles, IconButton,
  CardHeader, Card, CardActions, CardContent,
} from '@material-ui/core/';

import MoreVertIcon from '@material-ui/icons/MoreVert';
import { AvatarGroup } from '@material-ui/lab'
import UISkeletonAvatar from '../../common/UISkeletonAvatar';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    minHeight: '200px',
    maxHeight: '400px',
    backgroundColor: theme.palette.background.default,
  },
  pr: {
    position: 'relative'
  },
  bold: {
    fontWeight: '400'
  },
  boxTop: {
    display: "-webkit-box",
    height: theme.spacing(20),
    maxHeight: theme.spacing(20),
    boxSizing: 'border-box',
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    lineClamp: "8",
    boxOrient: "vertical",
    overflow: 'hidden',
    textOverflow: "ellipsis"
  },
  boxBottom: {
    width: '100%',
    height: '30px'
  },
  cardHeader: {
    display: 'flex',
    flex: "1 1 auto",
    boxSizing: 'border-box',
    padding: theme.spacing(2)
  },
  headerTitle: {
    width: "90%",
  },
  headerAction: {
    width: "10%",
    marginLeft: -theme.spacing(1),
    marginTop: -theme.spacing(1),
  },
  hiddenText: {
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    overflow: 'hidden',
    display: 'block',
  },
}));

function AgencyCard(props) {
  const classes = useStyles();

  const history = useHistory();

  const [GrowIn, setGrowIn] = React.useState(false);
  const [agcyColleagueList, setAgcyColleagueList] = React.useState(null);

  const getColleagueList = () => {
    const URL = '/api/agency/getColleague';
    const condition = {
      agcy_id: props.item.id,
      delete_yn: 'N'
    }
    axios.get(URL, {
      params: {
        ...condition
      }
    })
      .then(res => {
        setAgcyColleagueList(res.data.result);
      });
  }

  React.useEffect(() => {
    setGrowIn(true);
    getColleagueList();

  }, []);

  return (
    <Grid item xs={12} md={6} lg={4} className={classes.pr}>
      <Grow
        in={GrowIn}
        style={{ transformOrigin: '0 0 0' }}
        {...(GrowIn ? { timeout: 400 } : {})}
      >
        <Paper elevation={4}>
          <Card className={classes.root}>
            <Box className={classes.cardHeader}>
              <Box className={classes.headerTitle}>
                <Typography variant="h6" className={classes.hiddenText}>
                  {props.item.name}
                </Typography>
              </Box>
              <Box className={classes.headerAction}>
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              </Box>
            </Box>

            {/* <CardActionArea> */}
            <Box className={classes.boxTop}>
              {props.item.desc}
            </Box>
            {/* </CardActionArea> */}
            <CardActions>
              <AvatarGroup max={4}>
                {/* {id: 9, ref_agcy_colleague_seq: 1, ref_agcy_id: 7, name: '관리자', avatar_path: 'static\avatars\items\default\33.jpg'} */}
                {
                  (Array.isArray(agcyColleagueList) && agcyColleagueList.length !== 0)
                    ?
                    agcyColleagueList.map((item, index) => {
                      return (
                        <UISkeletonAvatar
                          key={index}
                          path={item.avatar_path}
                          fullName={item.name}
                        />
                      )
                    })
                    :
                    <Typography variant="body1">
                      데이터가 없습니다.
                    </Typography>
                }
              </AvatarGroup>
            </CardActions>
            <CardActions>
              <Button
                className={classes.boxBottom}
                variant="outlined"
                size="small"
                onClick={() => { history.push(`/agency/detail/${props.item.id}`) }}
              >
                <Typography variant="body2" color="textPrimary">MORE</Typography>
              </Button>
            </CardActions>
          </Card>
        </Paper>
      </Grow>
    </Grid>
  );
}

export default connect(state => ({
  theme: state.UI.theme
}))(AgencyCard)
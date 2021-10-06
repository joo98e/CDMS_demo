import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';

import axios from 'axios'
import {
  Grid, Grow, Paper,
  Card, CardActionArea, CardActions, CardContent,
  Button,
  Typography,
  Avatar,
  makeStyles,
} from '@material-ui/core/';
// import StyledButton from '../../common/StyledButton';
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
    height: '170px'
  },
  boxBottom: {
    width: '100%',
    height: '30px'
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
    setTimeout(() => {
      setGrowIn(true);
    }, 150);
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
            {/* <CardActionArea> */}
            <CardContent className={classes.boxTop}>

              <Typography gutterBottom variant="h5" component="h2">
                {props.item.name}
              </Typography>

              <Typography variant="body2" color="inherit" component="p">
                {props.item.desc}
              </Typography>

            </CardContent>
            {/* </CardActionArea> */}
            <CardActions>
              <AvatarGroup max={6}>
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
                      참여자가 없습니다.
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
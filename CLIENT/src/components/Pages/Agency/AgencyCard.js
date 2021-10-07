import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import axios from 'axios'
import {
  Grid, Grow, Paper, Button, Typography, Box,
  makeStyles,
  Card, CardActions
} from '@material-ui/core/';


import { AvatarGroup } from '@material-ui/lab'
import UISkeletonAvatar from '../../common/UISkeletonAvatar';

import UICardHeader from '../../common/Card/UICardHeader';
import {
  EditIcon, DeleteIcon, MoreVertIcon, NotificationsActiveIcon
} from '../../common/CustomIcons';

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
  boxTop: {
    display: "-webkit-box",
    height: theme.spacing(20),
    boxSizing: 'border-box',
    maxHeight: theme.spacing(20),
    marginBottom: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
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
  const _member = useSelector((store) => store.User.member);
  const [writeStatus, setWriteStatus] = React.useState(false);
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


  const alert1 = () => {
    alert(1)
  }

  const alert2 = () => {
    alert(2)
  }

  const headerActionList = [
    {
      name: "수정하기",
      icon: EditIcon,
      action: alert1
    },
    {
      name: "삭제하기",
      icon: DeleteIcon,
      action: alert2
    },
  ]


  React.useEffect(() => {

    setGrowIn(true);
    getColleagueList();

    if (_member.ref_allow_action.indexOf('WRITE') !== -1 || props.item.writer_seq === _member.seq) {
      setWriteStatus(true);
    }

  }, [writeStatus]);

  return (
    <Grid item xs={12} md={6} lg={4} className={classes.pr}>
      <Grow
        in={GrowIn}
        style={{ transformOrigin: '0 0 0' }}
        {...(GrowIn ? { timeout: 400 } : {})}
      >
        <Paper elevation={4}>
          <Card className={classes.root}>

            <UICardHeader
              title={props.item.name}
              icon={MoreVertIcon}
              action={writeStatus ? headerActionList : null}
            />



            {/* <CardActionArea> */}
            <Box className={classes.boxTop}>
              {props.item.desc}
            </Box>

            <CardActions>
              <AvatarGroup max={4}>
                {
                  (Array.isArray(agcyColleagueList) && agcyColleagueList.length !== 0)
                    ?
                    agcyColleagueList.map((item, index) => {
                      return (
                        <UISkeletonAvatar
                          key={index}
                          src={item.avatar_path}
                          alt={item.name}
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
                color="inherit"
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
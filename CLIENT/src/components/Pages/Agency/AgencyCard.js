import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import axios from 'axios'
import {
  Grid, Grow, Paper, Button, Typography, Box,
  makeStyles, Avatar,
  Card, CardActions
} from '@material-ui/core/';
import { AvatarGroup } from '@material-ui/lab'

import UICardHeader from '../../common/Card/UICardHeader';
import API from "../../common/API"

import {
  MoreVertIcon,
  EditIcon,
  DeleteIcon,
  MailIcon
} from '../../common/CustomIcons';
import UIButton from '../../common/UIButton';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    minHeight: '200px',
    maxHeight: '400px',
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(0, 1, 1, 1)
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
  const [write, setWrite] = useState(false);
  const [GrowIn, setGrowIn] = useState(false);
  const [agcyColleagueList, setAgcyColleagueList] = useState(null);

  const headerActionList = [
    {
      name: "수정하기",
      icon: <EditIcon />,
      action: () => { alert("수정하기") }
    },
    {
      name: "삭제하기",
      icon: <DeleteIcon />,
      action: () => { alert("삭제하기") }
    },
    // {
    //   name: "알림 메일 보내기",
    //   icon: <MailIcon />,
    //   action: () => {console.log("알림 메일 보내기")}
    // },
  ]

  const returnHTML = HTML => {
    return {
      __html: HTML
    }
  }

  useEffect(() => {
    API.get("/api/agency/getColleague", { agcy_id: props.item.id, delete_yn: 'N' })
      .then(res => {
        setAgcyColleagueList(res.data.result);
      });

    API.permit(_member)
      .then(res => {
        setWrite(true);
        setGrowIn(true);
      });

  }, [_member, props.item.id]);

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
              icon={<MoreVertIcon />}
              action={write ? headerActionList : null}
            />

            <Box className={classes.boxTop} dangerouslySetInnerHTML={returnHTML(props.item.desc)} />

            <CardActions>
              <AvatarGroup max={4}>
                {
                  (Array.isArray(agcyColleagueList) && agcyColleagueList.length !== 0)
                    ?
                    agcyColleagueList.map((item, index) => {
                      return (
                        <Avatar
                          key={index}
                          src={item.avatar_path}
                          alt={item.name}
                        />
                      )
                    })
                    :
                    <Typography variant="body1">
                      담당자 혹은 참여자가 없습니다.
                    </Typography>
                }
              </AvatarGroup>
            </CardActions>

            <CardActions>
              <UIButton
                name="자세히"
                fullWidth
                variant="contained"
                action={() => { history.push(`/agency/detail/${props.item.id}`) }}
              />
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
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import {
  Grid, Grow, Paper, Divider, Box,
  makeStyles, Avatar,
  Card, CardActions
} from '@material-ui/core/';
import { AvatarGroup } from '@material-ui/lab'

import UICardHeader from '../../common/Card/UICardHeader';
import UIButton from '../../common/UIButton';
import API from "../../common/API"

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    minHeight: '325px',
    maxHeight: '325px',
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(0, 1, 1, 1)
  },
  columnFlexBox: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start"
  },
  mb1: {
    margin: theme.spacing(1)
  },
  pr: {
    position: 'relative'
  },
  boxTop: {
    display: "-webkit-box",
    height: theme.spacing(20),
    boxSizing: 'border-box',
    maxHeight: theme.spacing(20),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    lineClamp: "8",
    boxOrient: "vertical",
    overflow: 'hidden',
    textOverflow: "ellipsis",
    color: theme.palette.text.desc
  },
}));

function AgencyCard(props) {
  const classes = useStyles();
  const history = useHistory();
  const _member = useSelector((store) => store.User.member);
  const [growIn, setGrowIn] = useState(false);
  const [agcyColleagueList, setAgcyColleagueList] = useState(null);

  const returnHTML = HTML => {
    return {
      __html: HTML
    }
  }

  useEffect(() => {
    setGrowIn(true);
    API.get("/api/agency/getColleague", { agcy_id: props.item.id, delete_yn: 'N' })
      .then(res => {
        setAgcyColleagueList(res.data.result);
      });

  }, [_member, props.item.id]);

  return (
    <Grid item xs={12} md={6} lg={4} className={classes.pr}>
      <Grow
        in={growIn}
        style={{ transformOrigin: '0 0 0' }}
        {...(growIn ? { timeout: 400 } : {})}
      >
        <Paper elevation={4}>
          <Card className={classes.root}>
            <UICardHeader
              title={props.item.name}
              titleVariant="h4"
            />
            <Divider />

            <Box className={classes.boxTop} dangerouslySetInnerHTML={returnHTML(props.item.desc)} />

            {
              (Array.isArray(agcyColleagueList) && agcyColleagueList.length !== 0) &&
              <CardActions className={classes.columnFlexBox}>
                <AvatarGroup max={4}>
                  {
                    agcyColleagueList.map((item, index) => {
                      return (
                        <Avatar
                          key={index}
                          src={item.avatar_path}
                          alt={item.name}
                        />
                      )
                    })
                  }
                </AvatarGroup>
                <UIButton
                  name="자세히"
                  variant="contained"
                  action={() => { history.push(`/agency/detail/${props.item.id}`) }}
                />
              </CardActions>
            }

          </Card>
        </Paper>
      </Grow>
    </Grid>
  );
}

export default AgencyCard
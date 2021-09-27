import React from 'react';
import { connect } from 'react-redux';
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
  avatar: {
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.background.paper,
  }
}));

function ProjectCard(props) {
  const classes = useStyles();

  const [GrowIn, setGrowIn] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      setGrowIn(true);
    }, 150);

  }, []);
  
  const infos = {
    ...props.infos
  }

  // TODO 이미지 만들기
  // TODO 속한 사람의 아바타 나타내기

  return (
    <Grid item xs={12} md={6} lg={4} className={classes.pr}>
      <Grow
        in={GrowIn}
        style={{ transformOrigin: '0 0 0' }}
        {...(GrowIn ? { timeout: 400 } : {})}
      >
        <Paper elevation={4}>
          <Card className={classes.root}>
            <CardActionArea>
              <CardContent className={classes.boxTop}>
                <Typography gutterBottom variant="h5" component="h2">
                  {infos.PROJ_TITLE}
                </Typography>
                <Typography variant="body1" color="inherit">기관명</Typography>
                <Typography variant="body2" color="inherit" component="p">
                  {infos.PROJ_AGENCY_NAME}
                </Typography>
                <Typography variant="body1" color="inherit">설명</Typography>
                <Typography variant="body2" color="inherit" component="p" noWrap>
                  {infos.PROJ_DESCRIPTION}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <AvatarGroup max={6}>
                <Avatar className={classes.avatar} alt="Remy Sharp">R</Avatar>
                <Avatar className={classes.avatar} alt="Travis Howard">T</Avatar>
              </AvatarGroup>
            </CardActions>
            <CardActions>
              <Button className={classes.boxBottom} variant="outlined" size="small">
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
}))(ProjectCard)
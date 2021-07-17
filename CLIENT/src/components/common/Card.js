import React from 'react';
import {
  Grid, Grow, Paper, 
  Card, CardActionArea, CardActions, CardContent,
  Button,
  Typography,
  makeStyles,
} from '@material-ui/core/';

const useStyles = makeStyles({
  root: {
    width: '100%',
    minHeight: '200px',
    maxHeight: '400px'
  },
  pr: {
    position: 'relative'
  },
  bold: {
    fontWeight: 'bold'
  },
  boxTop: {
    height: '170px'
  },
  boxBottom: {
    width: '100%',
    height: '30px'
  }
});

export default function ProjectCard(props) {
  const classes = useStyles();

  const [GrowIn, setGrowIn] = React.useState(false)
  React.useEffect(() => {
    setTimeout(() => {
      setGrowIn(true);
    }, 150);

  }, []);

  const infos = {
    ...props.infos
  }

  // TODO 더보기 버튼으로 다이얼로그 만들기
  // TODO 마지막 플러스 버튼 만들기

  return (
    <Grid item xs={12} md={6} lg={4} className={classes.pr}>
      <Grow
        in={GrowIn}
        style={{ transformOrigin: '0 0 0' }}
        {...(GrowIn ? { timeout: 400 } : {})}
      >
        <Paper>
          <Card className={classes.root}>
            <CardActionArea>
              <CardContent className={classes.boxTop}>
                <Typography gutterBottom variant="h5" component="h2">
                  {infos.PROJ_TITLE}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  <span className={classes.bold}>기관명</span> : {infos.PROJ_AGENCY_NAME}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  <span className={classes.bold}>설명</span> : {infos.PROJ_DESCRIPTION}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button className={classes.boxBottom} variant="contained" size="small">세부 페이지로 이동</Button>
              <Button className={classes.boxBottom} variant="contained" size="small">더 보기</Button>
            </CardActions>
          </Card>
        </Paper>
      </Grow>
    </Grid>
  );
}

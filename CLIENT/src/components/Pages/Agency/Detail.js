import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router';
import { useHistory } from 'react-router';
import {
    Container, Grid, Grow, Paper, Typography,
    Dialog, DialogContent, DialogActions, makeStyles
} from '@material-ui/core';

import API from '../../common/API';
import getNow from '../../common/fn/getNow';
import UIButton from '../../common/UIButton';

import ProjectCard from '../Proj/ProjectCard';
import ProjectAddDialog from '../Proj/ProjectAddDialog';

const useStyles = makeStyles(theme => ({
    root: {
        paddingTop: theme.spacing(6)
    },
    trans: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
    },
    backbtn : {
        top: '100%',
    },
    card: {
        position: 'relative',
        height: '325px',
    },
    emptyBox: {
        position: "relative",
        height: "30vh"
    },
}));

function AgencyDetail(props) {
    const classes = useStyles();
    const history = useHistory();
    const _member = useSelector(state => state.User.member);
    const { ref_agcy_id } = useParams();
    const [list, setList] = useState([]);
    const [grow, setGrow] = useState(false);
    const [open, setOpen] = useState(false);
    const [writer, setWriter] = useState(false);

    useEffect(() => {
        API.permit(_member)
            .then(res => setWriter(API.permitted("WRITE", res)));

        const URL = '/api/project/list';
        const condition = {
            ref_agcy_id: ref_agcy_id,
            unretired: getNow(),
            order_by: "DESC",
            delete_yn: 'N'
        }

        API.get(URL, condition)
            .then(res => {
                if (res.data.result.length === 0) setOpen(true);
                setList(res.data.result);
                setGrow(true);
            });
        
        return () => {
            setOpen(false);
            setGrow(false);
        }

    }, [_member, ref_agcy_id]);

    return (
        <Container className={classes.root}>
            {
                Array.isArray(list) && list.length !== 0 ?
                    // 과정 정보 있음
                    <Grow
                        in={grow}
                        timeout={800}
                    >
                        <Grid container spacing={3}>
                            {
                                list.map((item, index) => {
                                    return (
                                        <ProjectCard
                                            key={index}
                                            item={item}
                                        />
                                    )
                                })
                            }
                            {
                                writer &&
                                <Grid item xs={12} md={6} lg={4}>
                                    <Paper className={classes.card} elevation={4}>
                                        <ProjectAddDialog />
                                    </Paper>
                                </Grid>
                            }
                        </Grid>
                    </Grow>
                    :
                    // 과정 정보 없음
                    <Grow
                        in={grow}
                        timeout={800}
                    >
                        {
                            writer ?
                                <Grid item xs={12} md={6} lg={4}>
                                    <Paper className={classes.card} elevation={4}>
                                        <ProjectAddDialog />
                                    </Paper>
                                </Grid>
                                :
                                <Grid className={classes.emptyBox} item xs={12} md={12} lg={12}>
                                    <Typography className={classes.trans} variant="h4">
                                        지금은 참여하고 있는 과정 정보가 없습니다.
                                    </Typography>
                                    <UIButton
                                        class={`${classes.trans} ${classes.backbtn}`}
                                        name="돌아가기"
                                        variant="contained"
                                        action={() => { history.goBack() }}
                                    />
                                </Grid>
                        }
                    </Grow>
            }

            {
                (list === null || list.length === 0) && writer
                &&
                <Dialog open={open} fullWidth>
                    <DialogContent className={classes.emptyBox}>
                        <Typography className={classes.trans} variant="h6" align="center" style={{ width: "100%" }}>
                            아직 과정 정보가 없습니다.<br />
                            플러스 버튼을 클릭해 과정 정보를 생성해보세요.
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <UIButton
                            name="닫기"
                            variant="contained"
                            action={() => setOpen(false)}
                        />
                    </DialogActions>
                </Dialog>
            }
        </Container>
    )
}
export default AgencyDetail
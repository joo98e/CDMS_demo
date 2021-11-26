import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router';
import {
    Container, Grid, Grow, Paper, Typography,
    Dialog, DialogContent, DialogActions, makeStyles
} from '@material-ui/core';

import API from '../../common/API';
import AgencyCard from './AgencyCard'
import AgencyAddDialog from './AgencyAddDialog'
import UIButton from '../../common/UIButton';

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
    card: {
        position: 'relative',
        height: '325px',
    },
    emptyBox: {
        position: "relative",
        height: "30vh"
    }
}));

function Agency(props) {
    const classes = useStyles();
    const _member = useSelector(state => state.User.member);
    const history = useHistory();
    const [list, setList] = useState([]);
    const [grow, setGrow] = useState(false);
    const [open, setOpen] = useState(false);
    const [writer, setWriter] = useState(false);

    useEffect(() => {
        API.permit(_member)
            .then(res => setWriter(API.permitted("WRITE", res)))
            .catch(() => history.go(0));

        const URL = "/api/agency/list";
        const condition = {
            mem_seq: _member.seq,
            status: "STATUS::OPEN",
            delete_yn: "N"
        }

        API.get(URL, condition)
            .then(res => {
                if(res.data.result.length === 0) setOpen(true);
                setList(res.data.result);
                setGrow(true);
            });

    }, [_member]);

    return (
        <Container className={classes.root}>
            {
                Array.isArray(list) && list.length !== 0 ?
                    // 사업 있음
                    <Grow
                        in={grow}
                        timeout={800}
                    >
                        <Grid container spacing={3}>
                            {
                                list.map((item, index) => {
                                    return (
                                        <AgencyCard
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
                                        <AgencyAddDialog />
                                    </Paper>
                                </Grid>
                            }
                        </Grid>
                    </Grow>
                    :
                    // 사업 없음
                    <Grow
                        in={grow}
                        timeout={800}
                    >
                        {
                            writer ?
                                <Grid item xs={12} md={6} lg={4}>
                                    <Paper className={classes.card} elevation={4}>
                                        <AgencyAddDialog />
                                    </Paper>
                                </Grid>
                                :
                                <Grid className={classes.emptyBox} item xs={12} md={12} lg={12}>
                                    <Typography className={classes.trans} variant="h4">
                                        지금은 참여하고 있는 사업이 없습니다.
                                    </Typography>
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
                            플러스 버튼을 클릭해 사업 정보를 생성해보세요.
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
export default Agency
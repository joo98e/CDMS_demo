import React from 'react';
import { useHistory } from 'react-router';
import {
    Paper, Modal, Backdrop, Fade, makeStyles, Typography,
} from '@material-ui/core';
import UIButton from '../../../common/UIButton';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        width: "50%",
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        "&:focus": {
            outline: "none"
        }
    },
    image: {
        display: "block",
        width: "40%",
        margin: "0 auto",
        marginTop : theme.spacing(4)
    },
    mauto : {
        display: "block",
        margin : "0 auto",
        marginTop : theme.spacing(4)
    }
}));

export default function TransitionsModal(props) {
    const classes = useStyles();
    const history = useHistory();

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={props.open}
                onClose={props.handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={props.open}>
                    <Paper className={classes.paper}>
                        <Typography variant="h5" align="center">
                            아직 프로세스가 없네요.
                        </Typography>
                        <Typography variant="body2" align="center">
                            프로세스를 추가하고 함께 협업해보세요.
                        </Typography>
                        <img className={classes.image} src={"/static/common/help/detail-project-first.png"} alt={"프로세스를 생성해보세요."} />
                        <UIButton
                            class={classes.mauto}
                            name={"지금 추가하러 가기"}
                            variant="contained"
                            color="primary"
                            action={() => {
                                history.push({
                                    pathname: `/agency/project/detail/process/add/${props.ref_proj_id}`,
                                    state: {
                                        status: "TODO"
                                    }
                                })
                            }}
                        />
                    </Paper>
                </Fade>
            </Modal>
        </div>
    );
}
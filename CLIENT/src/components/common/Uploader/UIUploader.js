/**
 * @param {data}        : 
 * @param {action}     : 
 */

import React, { useCallback, useEffect } from 'react'
import { useSnackbar } from 'notistack';
import { useDropzone } from 'react-dropzone'
import {
    Paper, Box, makeStyles, Typography, IconButton,
    Table, TableHead, TableBody, TableRow, TableCell,
    Grow
} from '@material-ui/core'
import UIButton from '../UIButton'
import fileSizeCalc from "../fn/getFileSize"
import { AddCircleIcon, CloseIcon } from "../CustomIcons"
import UIExportMimeType from './UIExportMimeType';
import getDateFormat from "../fn/getDateFormat"

const useStyles = makeStyles(theme => ({
    dropzone: {
        display: "flex",
        width: "100%",
        height: "100%",
        minHeight: theme.spacing(12),
        justifyContent: "center",
        alignItems: "center",
        border: `1px solid #dbdbdb`,
    },
    pointer: {
        cursor: "pointer",
    },
    hover: {
        backgroundColor: theme.palette.background.default
    },
    desc: {
        color: theme.palette.text.desc
    },
    actionColor: {
        color: "red",
    },
    fileList: {
        width: "100%",
        height: "100%",
    }
}));

export const UIUploader = (props) => {
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();

    const onDrop = useCallback(acceptedFiles => {
        if (props.data && props.action) {
            const nextState = [...props.data, ...acceptedFiles];
            if (nextState.length > 10) {
                enqueueSnackbar("10개 이하만 업로드가 가능합니다.", { variant: "error" });
            } else {
                props.action(nextState);
            }
        } else {
            console.error("파일을 담을 공간이 없습니다.");
        }
    }, [enqueueSnackbar, props])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    const handleClickFileAttachCancle = index => {
        const nextState = [...props.data];
        nextState.splice(index, 1);
        props.action(nextState);
    }

    useEffect(() => {

    }, [props.data]);

    return (
        <React.Fragment>
            {
                props.data.length === 0
                    ?
                    <Paper className={isDragActive ? `${classes.hover} ${classes.dropzone}` : `${classes.pointer} ${classes.dropzone}`} elevation={2} {...getRootProps()}>
                        <input {...getInputProps()} />
                        {
                            isDragActive ?
                                // <Grow in={isDragActive} style={{ transformOrigin: '0 0 0' }} timeout={isDragActive ? 800 : 0} >
                                <Box>
                                    <AddCircleIcon style={{ fontSize: "48px" }} />
                                </Box>
                                // </Grow>
                                :
                                <Grow in={!isDragActive} style={{ transformOrigin: '0 0 0' }} timeout={!isDragActive ? 800 : 0}>
                                    <Box>
                                        <Typography variant="h6" align="center">
                                            파일을 드래그하거나, <br />
                                            클릭하여 선택해보세요.
                                        </Typography>
                                    </Box>
                                </Grow>
                        }
                    </Paper>
                    :
                    <Paper className={isDragActive ? `${classes.hover} + ${classes.dropzone}` : classes.dropzone} elevation={2} {...getRootProps()}>
                        <Box className={classes.fileList}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell width={60}></TableCell>
                                        <TableCell width={60}></TableCell>
                                        <TableCell><Typography variant="body1">파일명</Typography></TableCell>
                                        <TableCell width={120}><Typography variant="body1"></Typography></TableCell>
                                        <TableCell width={120} align="right"><Typography variant="body1">파일 사이즈</Typography></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        Array.isArray(props.data) && props.data.length !== 0 &&
                                        props.data.map((item, index) => {
                                            return (
                                                <TableRow key={index}>
                                                    <TableCell>
                                                        <IconButton size="small" onClick={() => handleClickFileAttachCancle(index)}>
                                                            <CloseIcon style={{ cursor: "pointer" }} />
                                                        </IconButton>
                                                    </TableCell>
                                                    <TableCell>
                                                        <UIExportMimeType name={item.name} />
                                                    </TableCell>
                                                    <TableCell>
                                                        <Typography variant="body2">
                                                            {item.name}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell>
                                                        {getDateFormat.YYYYMMDD(item.lastModifiedDate)}
                                                    </TableCell>
                                                    <TableCell align="right"><Typography className={classes.desc} variant="body2">{fileSizeCalc(item.size)}</Typography></TableCell>
                                                </TableRow>
                                            )
                                        })
                                    }
                                </TableBody>

                            </Table>
                            <Box width="100%" display="flex" justifyContent="flex-end" mt={2} mb={2} pr={2}>
                                <UIButton
                                    name="모두 삭제"
                                    variant="contained"
                                    action={() => { props.action([]) }}
                                />
                            </Box>
                        </Box>
                    </Paper>
            }

        </React.Fragment>
    )
}

export default UIUploader

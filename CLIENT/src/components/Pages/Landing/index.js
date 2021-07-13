import React, { Component } from 'react'
import { connect } from 'react-redux'
import Axios from 'axios';

import { Container, Grid, Box, Paper, Typography, withStyles } from '@material-ui/core'
import Card from '../../common/Card'

const styles = theme => ({
    root: {
        marginTop: '30px'
    }
});

const personnel = [
    // join 결과
    {
        MEM_ID: '1',
        MEM_NAME: '정태복',
        MEM_NICKNAME: 'joo98e',
        MEM_DEPT_NO: '1001',
        MEM_EMAIL: 'blackishhood@mirimmedialab.co.kr',
        MEM_PHONE: '010-5614-1328',
        MEM_HIREDATE: '2020-05-01',
        MEM_BIRTHDAY: '1994-09-28',
    },
    {
        MEM_ID: '2',
        MEM_NAME: '정태영',
        MEM_NICKNAME: 'xodud5621',
        MEM_DEPT_NO: '1001',
        MEM_EMAIL: 'xodud5621@mirimmedialab.co.kr',
        MEM_PHONE: '010-5614-1328',
        MEM_HIREDATE: '2018-05-11',
        MEM_BIRTHDAY: '2002-01-22',
    },
    {
        MEM_ID: '3',
        MEM_NAME: '최현중',
        MEM_NICKNAME: 'askamplee',
        MEM_DEPT_NO: '1001',
        MEM_EMAIL: 'blackishhood@mirimmedialab.co.kr',
        MEM_PHONE: '010-5614-1328',
        MEM_HIREDATE: '2020-04-01',
        MEM_BIRTHDAY: '1993-04-01',
    },
];

export class Landing extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    componentDidMount() {

    }
    // TODO
    // 프로젝트 리스트
    // 카드 구현
    // 그로우 구현
    // 플러스 버튼 다이얼로그 구현
    // DB 프로젝트참여자리스트 구현 => 조인으로 함께 불러오기

    render() {
        const { classes } = this.props;

        return (
            <Container className={classes.root}>
                <Card></Card>
            </Container>
        )

    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Landing))

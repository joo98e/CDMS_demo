import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Grid, Box } from '@material-ui/core'

const exampleList = [
    {
        // 1000번대는 팀
        // 10000번대는 프로젝트 
        PROJ_ID: '10001',

        PROJ_SUB_CATEGORY: '콘텐츠', // 대학, 공공, 기타 등등
        PROJ_NAME: '삼육보건대학교_2021',

        PROJ_MANAGER_MEM_ID: 3, // JOIN, MEM_ID
        PROJ_DATE_START: '2021-07-01',
        PROJ_DATE_END: '2021-07-11',
    },
    {
        PROJ_ID: '10002',
        PROJ_SUB_CATEGORY: '대학',
        PROJ_NAME: '금오공과대학교',
        PROJ_MANAGER_MEM_ID: 1,
        PROJ_DATE_START: '2021-01-01',
        PROJ_DATE_END: '2021-07-11',
    },
    {
        PROJ_ID: '10003',
        PROJ_SUB_CATEGORY: '공공',
        PROJ_NAME: '한국사회적기업진흥원',
        PROJ_MANAGER_MEM_ID: 2,
        PROJ_DATE_START: '2021-04-01',
        PROJ_DATE_END: '2021-07-11',
    },
];

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
    
    render() {
        console.log(exampleList);
        return (
            <Grid container>
                {
                    exampleList.map((item, index) => {
                        return (
                            <div key={index}>
                                {item.PROJ_ID}
                            </div>
                        )
                    })
                }

            </Grid>

        )

    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Landing)

import React, { PureComponent } from 'react'
import { Typography, Box, Divider } from '@material-ui/core'

export class Success extends PureComponent {

    render() {

        return (
            <Box
                style={{
                    marginTop : "350px"
                }}
            >
                <Box mt={8} mb={4}>
                    <Typography variant="h4" align='center'>
                        회원가입 성공!
                    </Typography>
                    <Typography variant="h6" align='center'>
                        관리자로부터 권한을 받은 뒤 로그인이 가능합니다.
                    </Typography>
                </Box>
            </Box>
        )
    }
}

export default (Success);
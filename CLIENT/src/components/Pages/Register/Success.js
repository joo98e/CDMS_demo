import React, { PureComponent } from 'react'
import { Typography, Box, Divider } from '@material-ui/core'

export class Success extends PureComponent {

    render() {

        return (
            <Box>
                <Divider />
                <Box mt={8} mb={4}>
                    <Typography variant="h4" align='center'>
                        회원가입 성공!
                    </Typography>
                    <Typography variant="h6" align='center'>
                        단, 권한을 부여 받기 전까지는 로그인이 되지 않아요.
                    </Typography>
                </Box>
            </Box>
        )
    }
}

export default (Success);
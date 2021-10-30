import React, { useState } from 'react'
import UIEditor from './Editor/UIEditor'
import UIButton from './UIButton'
import { Box, Divider, Typography } from '@material-ui/core'

export const UIRelease = (props) => {
    const [HTML, setHTML] = useState(null);

    return (
        <Box style={{ width: "960px", margin: "0 auto" }} alignItems="center" >
            <UIEditor
                data={HTML}
                setData={setHTML}
            />
            <Box width={160} style={{ margin: "0 auto" }}>
                <Box width={160} mb={2} display="flex" alignItems="center" justifyContent="space-between">
                    <UIButton
                        name="작성"
                        variant="contained"
                    />
                    <UIButton
                        name="취소"
                        variant="contained"
                    />
                </Box>
            </Box>

            <Divider />

            <Typography variant="h6">
                HTML
            </Typography>
            <Box dangerouslySetInnerHTML={{ __html: HTML }} />
        </Box>
    )
}
export default UIRelease

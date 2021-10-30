import React, { useState } from 'react'
import UIEditor from './Editor/UIEditor'
import UIButton from './UIButton'
import { Box, Divider, Typography } from '@material-ui/core'
import UIUploader from './Uploader/UIUploader'

export const UIRelease = (props) => {
    const [HTML, setHTML] = useState(null);
    const [files, setFiles] = useState([]);

    const handleSetFileList = result => {
        setFiles(result);
    }
    return (
        <Box style={{ width: "960px", margin: "0 auto" }} alignItems="center" >
            <UIEditor
                data={HTML}
                action={setHTML}
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

            <Divider style={{ margin: "30px 0 30px 0" }} />

            <Typography variant="h6">
                HTML 미리보기
            </Typography>
            <Box dangerouslySetInnerHTML={{ __html: HTML }} />

            <Divider style={{ margin: "30px 0 30px 0" }} />

            <Typography variant="h6">
                파일 업로더
            </Typography>

            <Box width={960}>
                <UIUploader
                    data={files}
                    action={handleSetFileList}
                />
            </Box>
            <Box height={1280}>

            </Box>
        </Box>
    )
}
export default UIRelease

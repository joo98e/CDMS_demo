import React, { useState } from 'react'
import UIEditor from './Editor/UIEditor'
import UIButton from './UIButton'
import { Box, Divider, Typography } from '@material-ui/core'
import UIUploader from './Uploader/UIUploader'
import API from './API'

export const UIRelease = (props) => {
    const [HTML, setHTML] = useState(null);
    const [files, setFiles] = useState([]);

    const handleSetFileList = result => {
        setFiles(result);
    }

    const handleSubmitFiles = files => {
        const baseURL = "/api/release/test"
        const config = {
            headers: {
                "content-type": "multipart/form-data",
                "dest" : {
                    agency : "1",
                    project : "14",
                    process : "17",
                    board : "2"
                }
            }
        }
        
        const formData = new FormData();
        for(let i =0; i < files.length; i++){
            formData.append(`files`, files[i]);
        }

        API.uploads(baseURL, formData, config)
            .then(res => console.log(res))
            .catch(err => console.error(err))

            // 에러처리
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
                <Box width={160} style={{ margin: "0 auto" }}>
                    <Box width={160} mt={2} mb={2} display="flex" alignItems="center" justifyContent="center">
                        <UIButton
                            name="전송"
                            variant="contained"
                            action={() => handleSubmitFiles(files)}
                        />
                    </Box>
                </Box>

            </Box>
            <Box height={480}>

            </Box>
        </Box>
    )
}
export default UIRelease

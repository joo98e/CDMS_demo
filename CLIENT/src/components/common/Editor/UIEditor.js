import React, { useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html'
import { Box } from '@material-ui/core'
import '../../../common/css/editor.css';

const UIEditor = props => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const editToHTML = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    const onEditorStateChange = (editorState) => {

        setEditorState(editorState);

        if (props.setData) {
            props.setData(editToHTML);
        }else console.error("결과값을 담을 변수 혹은 함수가 없습니다.");
    };

    return (
        <Box mt={2} mb={2}>
            <Editor
                toolbar={{
                    list: { inDropdown: true },
                    textAlign: { inDropdown: true },
                    link: { inDropdown: true },
                    history: { inDropdown: false },
                }}
                placeholder="내용을 작성해주세요."
                localization={{ locale: 'ko' }}
                editorState={editorState}
                onEditorStateChange={onEditorStateChange}
            />
        </Box>
    );
};

export default UIEditor;
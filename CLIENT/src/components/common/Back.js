import React from 'react'
import { useHistory } from 'react-router-dom'
import UIButton from './UIButton';
export default function ProcessAdd() {
    const history = useHistory();

    return (
        <UIButton
            name="뒤로 가기"
            variant="contained"
            color="primary"
            action={() => { history.goBack() }}
        />
    )
}

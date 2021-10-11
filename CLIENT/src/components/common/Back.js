import React from 'react'
import { useHistory } from 'react-router-dom'
import {
    Button
} from "@material-ui/core"

export default function ProcessAdd() {
    const history = useHistory();

    return (
        <div>
            <Button
                variant="outlined"
                color="inherit"
                onClick={() => {history.goBack()}}
            >
                이전으로
            </Button>
        </div>
    )
}

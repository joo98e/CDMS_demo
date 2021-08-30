import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';

const columns = [
    { field: 'id', headerName: '번호', width: 150 },
    { field: 'MEM_USERID', headerName: 'ID', width: 200 },
    { field: 'MEM_NAME', headerName: '성명', width: 200 },
    { field: 'DEPART_NAME', headerName: '부서', width: 200 },
    { field: 'MEM_EMAIL', headerName: '이메일', width: 350 },
];

export default function DataTable(props) {
    const aaaa = props.data;
    return (
        <div style={{ height: 500, width: '100%' }}>
            <DataGrid
                rows={aaaa}
                columns={columns}
                pageSize={15}
                checkboxSelection
                disableSelectionOnClick
            />
        </div>
    );
}


import React, { useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { inject, observer } from 'mobx-react';
import UpdateMenu from './UpdateMenu';


const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    {
        field: 'fullName',
        headerName: 'Full name',
        width: 160,
        valueGetter: (params) =>
            `${params.row.last || ''} ${params.row.first || ''}`,
    },
    { field: 'country', headerName: 'Country', width: 130 },
    {
        field: 'date', headerName: 'First contact', width: 160,
        valueGetter: (params) =>
            `${new Date(params.row.date).toLocaleDateString()}`
    }, { field: 'email', headerName: 'Email', width: 250 },
    {
        field: 'email-type', headerName: 'Email Type', width: 160,
        valueGetter: (params) =>
            `${params.row.email_type === 'null' ? '-' : params.row.email_type}`
    }, {
        field: 'ownerFullName',
        headerName: 'Owner',
        width: 160,
        valueGetter: (params) =>
            `${params.row.owner || ''}`,
    }
    , {
        field: 'Sold', headerName: 'Sold', width: 130,
        valueGetter: (params) =>
            `${params.row.sold ? '✓' : '-'}`
    }


];


const Table = inject("clientsStore","inputsStore")(observer(function ({inputsStore, clientsStore }) {
    const [shouldUpdateShow, setShouldUpdateShow] = useState(false)
    const handleRowClick = (e) => {
        inputsStore.emptyInputs("updateMenuInputs")
        inputsStore.handleInputs("updateMenuInputs","id",e.row.id)
        inputsStore.handleInputs("updateMenuInputs","last",e.row.last)
        inputsStore.handleInputs("updateMenuInputs","first",e.row.first)
        inputsStore.handleInputs("updateMenuInputs","country",e.row.country)
        setShouldUpdateShow(true)
    }
    const hideUpdateMenu = () => {
        inputsStore.emptyInputs("updateMenuInputs")
        setShouldUpdateShow(false)
    }
    return (
        <div className="tableContainer">
            {shouldUpdateShow && <span>
                <div className="updateMenuContainer" onClick={hideUpdateMenu}></div>
                <UpdateMenu setShouldUpdateShow={setShouldUpdateShow}/>
            </span>}
            <DataGrid className="dataGrid" onRowClick={handleRowClick} rows={clientsStore.clients} columns={columns} pageSize={15} />
        </div>
    );
}))

export default Table
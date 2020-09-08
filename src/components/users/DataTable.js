import React, { useState } from 'react';
import { Table } from 'antd';

import EditableTable from './EditableTable';



const DataTable = ({ loading, dataSource }) => {

    // const components = {
    //     header: {
    //         cell: ResizeableTitle,
    //     },
    // };

    // const handleResize = index => (e, { size }) => {

    //     setColumns(( columns ) => {
    //         const nextColumns = [...columns];

    //         nextColumns[index] = {
    //             ...nextColumns[index],
    //             width: size.width,
    //         };

    //         return nextColumns;
    //     });
    // };

    // const tmpColumns = columns.map((col, index) => {
    //     return ({
    //         ...col,
    //         onHeaderCell: column => ({
    //             width: column.width,
    //             onResize: handleResize(index),
    //         }),
    //     })
    // });

    return (
        <div
            className="search-result-list" 
            style={{
                marginTop: '16px',
                backgroundColor: '#fafafa',
                minHeight: '200px',
            }}>
            <EditableTable bordered size={'small'} loading={loading} dataSource={dataSource} />
        </div>
    );
};

export default DataTable;
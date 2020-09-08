import React, { useState } from 'react';
import SearchForm from './SearchForm';
import DataTable from './DataTable';
// import EditableTable from './EditableTable'

const Users = () => {

    const [loading, setLoading] = useState(false);
    const [dataSource, setDataSource] = useState([]);

    return (
        <div>
            <SearchForm handleLoading={setLoading} setDataSource={setDataSource} />
            <DataTable loading={loading} dataSource={dataSource} />
        </div>
    );
};

export default Users;
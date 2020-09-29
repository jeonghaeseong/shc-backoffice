import React, { useState } from 'react';
import SearchForm from './SearchForm';
import SearchResult from './SearchResult';
// import EditableTable from './EditableTable'

const Users = () => {

    const [loading, setLoading] = useState(false);
    const [dataSource, setDataSource] = useState([]);

    return (
        <div>
            <SearchForm handleLoading={setLoading} setDataSource={setDataSource} />
            <SearchResult loading={loading} dataSource={dataSource} setDataSource={setDataSource} />
        </div>
    );
};

export default Users;
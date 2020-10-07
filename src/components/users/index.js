import React, { useEffect, useState } from 'react';
import SearchForm from './SearchForm';
import SearchResult from './SearchResult';
// import EditableTable from './EditableTable'

const Users = () => {

    const [loading, setLoading] = useState(false);
    const [dataSource, setDataSource] = useState([]);

    const _dataSource = dataSource.map((data, idx) => {
        return {
            key: idx,
            ...data
        };
    });

    return (
        <div>
            <SearchForm handleLoading={setLoading} setDataSource={setDataSource} />
            <SearchResult loading={loading} dataSource={_dataSource} setDataSource={setDataSource} />
        </div>
    );
};

export default Users;
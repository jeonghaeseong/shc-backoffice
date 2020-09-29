import React from 'react';

import EditableTable from './EditableTable';

const SearchResult = ({ loading, dataSource }) => {

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

export default SearchResult;
import React from 'react';
import { Row, Col, Button, Space } from 'antd'; 
import {
    PlusOutlined,
    MinusOutlined,
    SaveOutlined
} from '@ant-design/icons';

import EditableTable from '../common/EditableTable';

const SearchResult = ({ loading, dataSource, setDataSource }) => {

    const title = () => {
        return (
            <Row style={{color: '#1890ff'}} align={"middle"}>
                <Col span={6}>회원목록</Col>
                <Col span={18}>
                    <div style={{textAlign: "right"}}>
                        <Space>
                            <Button icon={<PlusOutlined />}></Button>
                            <Button icon={<MinusOutlined />}></Button>
                            <Button icon={<SaveOutlined />}>저장</Button>
                        </Space>
                    </div>
                </Col>
            </Row>
        )
    };

    return (
        <div
            className="search-result-list" 
            style={{
                marginTop: '16px',
                backgroundColor: '#fafafa',
                minHeight: '200px',
            }}>
            <EditableTable bordered title={title} size={'small'} loading={loading} dataSource={dataSource} setDataSource={setDataSource} />
        </div>
    );
};

export default SearchResult;
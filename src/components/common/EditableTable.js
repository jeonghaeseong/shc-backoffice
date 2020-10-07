import React, { useState, useRef, useEffect, useContext } from 'react';
import { Resizable } from 'react-resizable';
import { Form, Input, Table } from 'antd';

const EditableContext = React.createContext();

const EditableRow = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
        <Form form={form} component={false}>
            <EditableContext.Provider value={form}>
                <tr {...props} />
            </EditableContext.Provider>
        </Form>
    );
};

const ResizeableTitle = props => {
    const { onResize, width, ...restProps } = props;

    if (!width) {
        return <th {...restProps} />;
    }

    return (
        <Resizable
            width={width}
            height={0}
            onResize={onResize}
            draggableOpts={{ enableUserSelectHack: false }}
        >
            <th {...restProps} />
        </Resizable>
    );
};

const EditableCell = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
}) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef();
    const form = useContext(EditableContext);

    useEffect(() => {
        if (editing) {
            inputRef.current.focus();
        }
    }, [editing]);

    const toggleEdit = () => {
        setEditing(!editing);
        form.setFieldsValue({
            [dataIndex]: record[dataIndex],
        });
    };

    // Enter, 
    const save = async e => {
        try {
            const values = await form.validateFields();
            toggleEdit();
            handleSave({ ...record, ...values });
        } catch (errInfo) {
            console.log('Save failed:', errInfo);
        }
    };

    let childNode = children;

    if (editable) {
        childNode = editing ? (
            <Form.Item
                style={{
                    margin: 0,
                }}
                name={dataIndex}
                rules={[
                    {
                        required: true,
                        message: `${title} is required.`,
                    },
                ]}
            >
                {/* input, comobo, modal, checkbox, radio */}
                <Input ref={inputRef} onPressEnter={save} onBlur={save} />
            </Form.Item>
        ) : (
                <div
                    className="editable-cell-value-wrap"
                    // style={{
                    //     paddingRight: 24,
                    // }}
                    onClick={toggleEdit}
                >
                    {children}
                </div>
            );
    }

    return <td {...restProps}>{childNode}</td>;
};

/**
 * @description 
 * @param {Array} dataSource
 */
const EditableTable = ({ dataSource, setDataSource, ...props }) => {

    // antd Table Component 내부에서 사용할 컴포넌트를 설정
    const components = {
        header: {
            cell: ResizeableTitle,
        },
        body: {
            row: EditableRow,
            cell: EditableCell,
        },
    };

    const [columns, setColumns] = useState([
        {
            key: '1',
            title: '아이디',
            dataIndex: 'userId',
            width: 200,
            align: 'center',
            editable: false,
        },
        {
            key: '2',
            title: '이름',
            dataIndex: 'name',
            width: 200,
            align: 'center',
            editable: true,
        },
        {
            key: '3',
            title: '이메일',
            dataIndex: 'email',
            width: 200,
            align: 'center',
            editable: true,
        },
        {
            key: '3',
            title: '수정일시',
            dataIndex: 'updateDateTime',
            width: 200,
            align: 'center',
            editable: true,
        }
    ]);

    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const handleResize = index => (e, { size }) => {

        setColumns((columns) => {
            const nextColumns = [...columns];

            nextColumns[index] = {
                ...nextColumns[index],
                width: size.width,
            };

            return nextColumns;
        });
    };

    const handleSave = (row) => {
        const newData = [...dataSource];
        const index = newData.findIndex((item) => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setDataSource(newData);
    };

    const tmpColumns = columns.map((col, index) => {
        return ({
            ...col,
            onHeaderCell: column => ({
                width: column.width,
                onResize: handleResize(index),
            }),
            onCell: record => {
                return ({
                    record,
                    editable: col.editable,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    handleSave: handleSave
                })
            },
        })
    });

    const onSelectChange = selectedRowKeys => {
        setSelectedRowKeys(selectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    return (
        <Table
            components={components}
            rowClassName={() => 'editable-row'}
            columns={tmpColumns}
            dataSource={dataSource}
            rowSelection={rowSelection}
            pagination={{total: 500}}
            {...props}
        />
    );
};

export default EditableTable;
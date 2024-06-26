import { Button, Input, Pagination, Row, Space, Table } from "antd";
import React, { useEffect, useRef, useState } from "react";
import api from "../../../services/api";
import Loader from "../../Loader";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { Badge, useToast } from "@chakra-ui/react";
import { getToast } from "../../../utils/toast";
import { useAppSelector } from "../../../reduxs/hooks";

function UserManagement() {
  const { titleI18n } = useAppSelector((state) => state.account);

  const toast = useToast()
  const [loading, setIsLoading] = useState(false);
  const [dataUser, setDataUser] = useState([]);

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  const fetch = async (
    isLoading = true,
    page = 0,
    size = 10,
    isSetPagination = true
  ) => {
    setIsLoading(isLoading);
    const res = await api.getUserByAdmin({ page, size });
    if (res) {
      setDataUser(res?.metadata?.accounts);
      if (isSetPagination) {
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total: res?.metadata?.total,
            pageSize:tableParams.pagination.pageSize
          },
        });
      }
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetch();
  }, []);

  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });
    fetch(true, pagination.current - 1, pagination.pageSize, false);

    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setDataUser([]);
    }
  };

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const handleStatusAcc = async ({idUser,status}) => {
      const res = await api.updateStatusUserByAdmin({status,idUser})
      if(res){
        toast(getToast("success", res.metadata, titleI18n['success']));
      }
      fetch(true, tableParams.pagination.current-1, tableParams.pagination.pageSize, false);
  }

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`${titleI18n['success']} ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            {titleI18n['search']}
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            {titleI18n['reset']}
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            {titleI18n['filter']}
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            {titleI18n['close']}
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) => {
      return record?.[dataIndex]
        ?.toString()
        .toLowerCase()
        .includes(value.toLowerCase());
    },
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput?.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: titleI18n['full_name'],
      dataIndex: "fullName",
      key: "fullName",
      ...getColumnSearchProps("name"),
    },
    {
      title: titleI18n['gender_upper'],
      dataIndex: "gender",
      key: "gender",
      filters: [
        {
          text: 'Male',
          value: 'male',
        },
        {
          text: 'Female',
          value: 'female',
        },
      ],
      ...getColumnSearchProps("gender"),
    },
    {
      title: titleI18n['phone'],
      dataIndex: "phone",
      key: "phone",
      ...getColumnSearchProps("phone"),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      ...getColumnSearchProps("email"),
    },
    {
      title: titleI18n['address'],
      dataIndex: "address",
      key: "address",
      ...getColumnSearchProps("address"),
      sorter: (a, b) => a?.address?.length - b?.address?.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: titleI18n['status'],
      dataIndex: "status",
      key: "status",
      render: (status, item) => {
        if (status == "active") {
          return <Badge colorScheme={"green"}>{status}</Badge>;
        }
        if (status == "inactive") {
          return <Badge colorScheme={"yellow"}>{status}</Badge>;
        }
        if (status == "lock") {
          return <Badge colorScheme={"red"}>{status}</Badge>;
        }
      },
    },
    {
      title: titleI18n['action'],
      dataIndex: "status",
      key: "status",
      render: (status,item) => {
        if (status == "active") {
          return <Button type="primary" danger onClick={()=>handleStatusAcc({idUser:item.id, status: "lock"})}>Lock</Button>
        }
        if (status == "inactive") {
          return <Button type="primary" warn onClick={()=>handleStatusAcc({idUser:item.id, status: "active"})}>Active</Button>;
        }
        if (status == "lock") {
          return <Button type="primary" onClick={()=>handleStatusAcc({idUser:item.id, status: "active"})}>UnLock</Button>;
        }
      }
    },
  ];

  return (
    <div>
      <Table
        rowKey={(record) => record.id}
        loading={loading}
        columns={columns}
        dataSource={dataUser}
        pagination={tableParams.pagination}
        onChange={handleTableChange}
      />
    </div>
  );
}

export default UserManagement;

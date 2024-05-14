import { Button, Input, Pagination, Row, Space, Table } from "antd";
import React, { useEffect, useRef, useState } from "react";
import api from "../../../services/api";
import Loader from "../../Loader";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import {
  Badge,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { getToast } from "../../../utils/toast";
import { useAppSelector } from "../../../reduxs/hooks";

function ContactMaintenance() {
  const { titleI18n } = useAppSelector((state) => state.account);

  const toast = useToast();
  const [loading, setIsLoading] = useState(false);
  const [dataContact, setDataContact] = useState([]);
  const [descConfirm, setDescConfirm] = useState(null);
  const [idContactFocus, setIdContactFocus] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

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
    const res = await api.getAllContact({ page, size });
    if (res) {
      setDataContact(res?.metadata?.content);
      if (isSetPagination) {
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total: res?.metadata?.totalPages,
            pageSize: tableParams.pagination.pageSize,
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

  const handleReply = async () => {
    const res = await api.replyContact({
      content: descConfirm,
      idContact: idContactFocus,
    });
    if (res) {
      toast(getToast("success", res.metadata, titleI18n["success"]));
      setIdContactFocus();
      setDescConfirm();
    }
    fetch(
      true,
      tableParams.pagination.current - 1,
      tableParams.pagination.pageSize,
      false
    );
  };

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
          placeholder={`${titleI18n["search"]} ${dataIndex}`}
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
            {titleI18n["search"]}
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            {titleI18n["reset"]}
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
            {titleI18n["filter"]}
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            {titleI18n["close"]}
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
      title: titleI18n["name"],
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
    },
    {
      title: titleI18n["email"],
      dataIndex: "email",
      key: "email",
      ...getColumnSearchProps("email"),
    },
    {
      title: titleI18n["user_replied"],
      dataIndex: "user",
      key: "user",
      render: (user, item) => {
        if (user) {
          return <div>{user.fullName}</div>;
        }
      },
    },
    {
      title: titleI18n["action"],
      dataIndex: "user",
      key: "user",
      render: (user, item) => {
        if (!user) {
          return (
            <Button
              type="primary"
              onClick={() => {
                setIdContactFocus(item.id), onOpen();
              }}
            >
              {titleI18n["reply"]}
            </Button>
          );
        }
      },
    },
  ];

  return (
    <div>
      <Table
        rowKey={(record) => record.id}
        loading={loading}
        columns={columns}
        dataSource={dataContact}
        pagination={tableParams.pagination}
        onChange={handleTableChange}
      />
      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{titleI18n["are_you_sure"]}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text mb="1rem">{titleI18n["note"]}</Text>
            <Textarea
              size="sm"
              onChange={(e) => setDescConfirm(e.target.value)}
            />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" onClick={handleReply}>
              {titleI18n["confirm"]}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default ContactMaintenance;

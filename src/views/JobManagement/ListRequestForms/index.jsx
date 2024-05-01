import { Col, Empty, Pagination, Row } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import UserProfileCard from "./UserProfileCard";
import api from "../../../services/api";
import { getToast } from "../../../utils/toast";
import {
  Button,
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
import { useLocation } from "react-router-dom";
import Loader from "../../Loader";

function ListRequestForms() {
  const location = useLocation();
  const [users, setUsers] = useState([]);
  const [userReqId, setUserReqId] = useState(null);
  const [pagination, setPagination] = useState({ page: 0, size: 10, total: 0 });
  const [action, setAction] = useState();
  const [descConfirm, setDescConfirm] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast();
  const [isLoadingNormal, setIsLoadingNormal] = useState(false);

  const fetch = useCallback(async (page = 0, size = 10) => {
    if (!location || !location?.hash) {
      toast(getToast("error", "Job not found!", "Error"));
      return;
    }
    let jobId = parseInt(location.hash.replace(/^#/, ""));
    const res = await api.getRequestNormalJobBusiness({ page, size, jobId });
    if (res) {
      setUsers(res?.metadata?.users);
      setPagination({ ...pagination, total: res?.metadata?.total });
    }
  }, []);

  useEffect(() => {
    fetch();
  }, []);

  const onChangePagination = (page, pageSize) => {
    fetch(page - 1, pageSize);
  };

  const handleRequestApply = (action) => {
    onOpen();
    setAction(action);
  };

  const handleApprove = async (jobId) => {
    setIsLoadingNormal(true);
    // const res = await api.approveNormalJob({jobId});
    // if(res){
    //   toast(getToast("success", res?.metadata, "Success"));
    //   fetch()
    // }
    setIsLoadingNormal(false);
  };

  const handleReject = async (jobId) => {
    setIsLoadingNormal(true);
    // const res = await api.rejectNormalJob({jobId});
    // if(res){
    //   toast(getToast("success", res?.metadata, "Success"));
    //   fetch()
    // }
    setIsLoadingNormal(false);
  };

  const handleConfirm = async () => {
    setIsLoadingNormal(true);
    let jobId = parseInt(location.hash.replace(/^#/, ""));
    let res = null;
    if (action == "approve") {
      res = await api.approveNormalJob({
        jobId,
        userReqId,
        description: descConfirm,
      });
    }
    if (action == "reject") {
      res = await api.rejectNormalJob({
        jobId,
        userReqId,
        description: descConfirm,
      });
    }
    if (res) {
      toast(getToast("success", res?.metadata, "Success"));
      fetch();
    }
    setIsLoadingNormal(false);
    setAction();
    setUserReqId(null);
    onClose();
  };

  return isLoadingNormal ? (
    <div style={{ marginTop: "30px" }}>
      <Loader />
    </div>
  ) : (
    <div style={{ padding: 20 }}>
      <Row></Row>
      <Row gutter={[12, 12]}>
        {users.length == 0 ? <Col style={{marginTop:'100px'}} span={24}><Empty /></Col> : ""}
        {users?.map((user, index) => (
          <Col
            xxs={24}
            xs={24}
            sm={12}
            md={12}
            lg={8}
            xl={8}
            xxl={6}
            key={user?.id}
          >
            <UserProfileCard
              user={user}
              handleRequestApply={(action) => {
                handleRequestApply(action);
                setUserReqId(user.id);
              }}
            />
          </Col>
        ))}
      </Row>
      <Row style={{ display: "flex", justifyContent: "flex-end" }}>
        <Pagination
          defaultCurrent={pagination.page}
          total={pagination.total}
          onChange={onChangePagination}
          showSizeChanger
        />
      </Row>

      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Are you sure?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text mb="1rem">Note</Text>
            <Textarea
              size="sm"
              onChange={(e) => setDescConfirm(e.target.value)}
            />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" onClick={handleConfirm}>
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
export default ListRequestForms;

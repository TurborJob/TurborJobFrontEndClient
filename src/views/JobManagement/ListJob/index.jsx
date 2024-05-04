import { Col, Empty, Pagination, Row } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import CardJob from "./CardJob";
import api from "../../../services/api";
import { getToast } from "../../../utils/toast";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useAppSelector } from "../../../reduxs/hooks";
import UserProfileCard from "../ListRequestForms/UserProfileCard";
import Loader from "../../Loader";

function ListJob() {
  // Component, System
  const { webSocketService, profile } = useAppSelector(
    (state) => state.account
  );
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [isLoadingNormal, setIsLoadingNormal] = useState(false);
  const [pagination, setPagination] = useState({ page: 0, size: 10, total: 0 });

  // Jobs
  const [jobs, setJobs] = useState([]);
  const [jobFocus, setJobFocus] = useState();

  // Request Apply
  const [users, setUsers] = useState([]);

  // Start Fetch
  const fetch = useCallback(async (isLoading = true,page = 0, size = 10, isSetPagination = true) => {
    setIsLoadingNormal(isLoading);
    const res = await api.getJob({ page, size });
    if (res) {
      setJobs(res?.metadata?.jobs);
      if(isSetPagination){
        setPagination({ ...pagination, total: res?.metadata?.total });
      }
    }
    setIsLoadingNormal(false);
  }, []);

  useEffect(() => {
    fetch();
  }, []);
  // End Fetch

  const getApplyRequest = async (jobId, page = 0, size = 30) => {
    const res = await api.getRequestNormalJobBusiness({ page, size, jobId });
    if (res) {
      setUsers(res?.metadata?.users);
    }
  };

  useEffect(() => {
    if (profile && profile?.id && webSocketService && jobFocus) {
      webSocketService.subscribePrivateGetRequestApplyJob(
        profile?.id,
        jobFocus?.id,
        (message) => {
          if (message?.isSuccess) {
            getApplyRequest(jobFocus?.id);
          }
        }
      );
    }
  }, [jobFocus]);

  const onChangePagination = async(page, pageSize) => {
    pagination.page = page;
    pagination.size = pageSize;
    setPagination(pagination)
    fetch(true ,page - 1, pageSize, false);
  };

  const handlerFindJobNormal = async (jobId) => {
    setIsLoadingNormal(true);
    const res = await api.findNormalJob({ jobId });
    if (res) {
      toast(getToast("success", res?.metadata, "Success"));
      fetch(true)
    }
    setIsLoadingNormal(false);
  };

  const handleUpdateJobToDone = async (jobId) => {
    setIsLoadingNormal(true);
    const res = await api.updateJobToDone({ jobId });
    if (res) {
      toast(getToast("success", res?.metadata, "Success"));
      fetch(true, null, null, false);
    }
    setIsLoadingNormal(false);
  };

  const handleRequestApply = async (action, userReqId) => {
    let res = null;
    if (action == "approve") {
      res = await api.approveNormalJob({
        jobId: jobFocus?.id,
        userReqId,
        description: "Approve request!",
      });
    }
    if (action == "reject") {
      res = await api.rejectNormalJob({
        jobId: jobFocus?.id,
        userReqId,
        description: "Approve request!",
      });
    }

    if (res) {
      webSocketService.sendPrivateRequestUpdateNotify(userReqId, profile?.id, "Send request update notify", jobFocus?.id);
      toast(getToast("success", res?.metadata, "Success"));
      let checkJob = await api.checkJobSuccess({ jobId: jobFocus?.id });
      if (checkJob?.metadata) {
        onClose();
        fetch(true, null, null, false);
        return;
      }
      getApplyRequest(jobFocus?.id);
    }

    return;
  };

  return isLoadingNormal ? (
    <div style={{ marginTop: "30px" }}>
      <Loader />
    </div>
  ) : (
    <div style={{ padding: 20 }}>
      <Row></Row>
      <Row gutter={[12, 12]}>
        {jobs.length == 0 ? (
          <Col style={{ marginTop: "100px" }} span={24}>
            <Empty />
          </Col>
        ) : (
          ""
        )}
        {jobs?.map((job, index) => (
          <Col
            xxs={24}
            xs={24}
            sm={12}
            md={12}
            lg={8}
            xl={8}
            xxl={6}
            key={index}
          >
            <CardJob
              job={job}
              handlerFindJobNormal={handlerFindJobNormal}
              handleUpdateJobToDone={handleUpdateJobToDone}
              openModalFindNow={() => onOpen()}
              setJobFocus={setJobFocus}
            />
          </Col>
        ))}
      </Row>
      <Row style={{ display: "flex", justifyContent: "flex-end" }}>
        {console.log("pagination2",pagination)}
        <Pagination
          current={pagination.page}
          total={pagination.total}
          pageSize={pagination.size}
          onChange={onChangePagination}
          showSizeChanger
        />
      </Row>

      <Modal
        blockScrollOnMount={false}
        isOpen={isOpen}
        onClose={onClose}
        scrollBehavior={"inside"}
        size={"xxl"}
      >
        <ModalOverlay
          bg="none"
          backdropFilter="auto"
          backdropInvert="80%"
          backdropBlur="2px"
        />
        <ModalContent style={{ width: "70%" }}>
          <ModalHeader>List Request Find Now</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Row gutter={[12, 12]}>
              {users.length == 0 ? (
                <Col style={{ marginTop: "100px" }} span={24}>
                  <Empty />
                </Col>
              ) : (
                ""
              )}
              {users?.map((user) => (
                <Col
                  xxs={24}
                  xs={24}
                  sm={24}
                  md={24}
                  lg={12}
                  xl={8}
                  xxl={8}
                  key={user?.id}
                >
                  <UserProfileCard
                    user={user}
                    handleRequestApply={(action) => {
                      handleRequestApply(action, user.id);
                    }}
                  />
                </Col>
              ))}
            </Row>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default ListJob;

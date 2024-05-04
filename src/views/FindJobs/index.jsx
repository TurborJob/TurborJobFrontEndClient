import {
  Box,
  Button,
  Center,
  Container,
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
import { Col, Empty, Pagination, Row } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import api from "../../services/api";
import { getToast } from "../../utils/toast";
import CardJob from "./CardJob";
import Loader from "../Loader";
import { useAppSelector } from "../../reduxs/hooks";

function FindJobs() {
  const { webSocketService, profile } = useAppSelector(
    (state) => state.account
  );
  const [jobs, setJobs] = useState([]);
  const [pagination, setPagination] = useState({ page: 0, size: 10, total: 0 });
  const [jobIdConfirm, setJobIdConfirm] = useState();
  const [descConfirm, setDescConfirm] = useState(null);

  const toast = useToast();
  const [isLoadingNormal, setIsLoadingNormal] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const getMyLocation = async () => {
    const location = window.navigator && window.navigator.geolocation;

    if (location) {
      location.getCurrentPosition(
        (position) => {
          return {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
        },
        (error) => {
          console.log(error);
        }
      );
    }
  };

  const fetch = useCallback(async (page = 0, size = 10, isSetPagination= true) => {
    const location = window.navigator && window.navigator.geolocation;

    if (location) {
      location.getCurrentPosition(
        async (position) => {
          let geolocation = {
            lat: position.coords.latitude,
            long: position.coords.longitude,
          };
          setIsLoadingNormal(true);
          const res = await api.getNormalJob({ page, size, ...geolocation });
          if (res) {
            setJobs(res?.metadata?.jobs);
            if(isSetPagination){
              setPagination({ ...pagination, total: res?.metadata?.total });
            }
          }
          setIsLoadingNormal(false);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }, []);

  useEffect(() => {
    fetch();
  }, []);

  const onChangePagination = (page, pageSize) => {
    pagination.page = page;
    pagination.size = pageSize;
    setPagination(pagination)
    fetch(page - 1, pageSize, false);
  };

  const handlerApplyJobNormal = async () => {
    setIsLoadingNormal(true);
    console.log("jobId", jobIdConfirm, descConfirm);
    if (!jobIdConfirm || !descConfirm) {
      toast(getToast("error", "Description is require!", "Error"));
      setIsLoadingNormal(false);
      return;
    }
    const res = await api.applyNormalJob({
      jobId: jobIdConfirm,
      description: descConfirm,
    });
    if (res) {
      toast(getToast("success", res?.metadata, "Success"));
      if(webSocketService && profile && profile?.id){
        webSocketService.sendPrivateRequestUpdateNotify(null, profile?.id, "Send request update notify",jobIdConfirm);
      }
      fetch();
    }
    onClose();
    setIsLoadingNormal(false);
  };

  return isLoadingNormal ? (
    <div style={{ marginTop: "30px" }}>
      <Loader />
    </div>
  ) : (
    <Container maxW="8xl">
      <div style={{ padding: 0 }}>
        <Row></Row>
        <Row gutter={[12, 12]}>
          {jobs.length == 0 ? (
            <Col style={{ marginTop: "100px" }} span={24}>
              <Empty />
            </Col>
          ) : (
            ""
          )}
          {jobs?.map((job) => (
            <Col
              xxs={24}
              xs={24}
              sm={12}
              md={12}
              lg={8}
              xl={8}
              xxl={6}
              key={job?.id}
            >
              <CardJob
                job={job}
                handleApply={() => {
                  onOpen();
                  setJobIdConfirm(job?.id);
                }}
              />
            </Col>
          ))}
        </Row>
        <Row
          style={{
            display: "flex",
            justifyContent: "flex-end",
            paddingTop: "20px",
          }}
        >
          <Pagination
            current={pagination.page}
            total={pagination.total}
            onChange={onChangePagination}
            showSizeChanger
          />
        </Row>
      </div>
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
            <Button colorScheme="blue" onClick={handlerApplyJobNormal}>
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
}

export default FindJobs;

import WebSocketService from "../../services/webSocket";
import { useAppSelector } from "../../reduxs/hooks";
import {
    Box,
    Button,
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

function FindJobsRealTime() {
  const { webSocketService } = useAppSelector((state) => state.account);
  const [jobs, setJobs] = useState([]);
  const [pagination, setPagination] = useState({ page: 0, size: 10, total: 0 });
  const [jobIdConfirm, setJobIdConfirm] = useState();
  const [descConfirm, setDescConfirm] = useState(null);

  const toast = useToast();
  const [isLoadingNormal, setIsLoadingNormal] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();


  useEffect(() => {
    webSocketService.subscribeToGetRequestUpdateJob((message) => {
      console.log("message",message);
    });
    fetch()
  }, []);


  const fetch = useCallback(async (page = 0, size = 10) => {
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
            setPagination({ ...pagination, total: res?.metadata?.total });
          }
          setIsLoadingNormal(false);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }, []);

  const handlerApplyJobNormal = async () => {
    setIsLoadingNormal(true);
    if (!jobIdConfirm || !descConfirm) {
      toast(getToast("error", "Invalid Parameter", "Error"));
      return;
    }
    const res = await api.applyNormalJob({
      jobId: jobIdConfirm,
      description: descConfirm,
    });
    if (res) {
      toast(getToast("success", res?.metadata, "Success"));
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
          {jobs.length == 0 ? <Col style={{marginTop:'100px'}} span={24}><Empty /></Col> : ""}
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

export default FindJobsRealTime;

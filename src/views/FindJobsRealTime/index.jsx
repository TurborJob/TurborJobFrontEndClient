import WebSocketService from "../../services/webSocket";
import { useAppSelector } from "../../reduxs/hooks";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
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
import {
  Col,
  Empty,
  Pagination,
  Row,
  Badge as BadgeAnt,
  Switch,
  Slider,
} from "antd";
import React, { useCallback, useEffect, useState } from "react";
import api from "../../services/api";
import { getToast } from "../../utils/toast";
import CardJob from "./CardJob";
import Loader from "../Loader";
function FindJobsRealTime() {
  const { webSocketService, profile, titleI18n } = useAppSelector(
    (state) => state.account
  );
  const [jobs, setJobs] = useState([]);
  const [jobIdConfirm, setJobIdConfirm] = useState();
  const [descConfirm, setDescConfirm] = useState(null);
  const [salary, setSalary] = useState([0, 1000000]);
  const [isVehicle, setIsVehicle] = useState(false);
  const [filter, setFilter] = useState({});
  const [pagination, setPagination] = useState({ page: 0, size: 10, total: 0 });


  const toast = useToast();
  const [isLoadingNormal, setIsLoadingNormal] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    webSocketService.subscribeToGetRequestUpdateJob((message) => {
      if (message?.isSuccess) {
        fetch(0, 10, false, filter);
      }
    });
    fetch();
  }, []);

  const fetch = useCallback(
    async (page = 0, size = 10, isLoading = true, filterApply = {}) => {
      const location = window.navigator && window.navigator.geolocation;

      if (location) {
        location.getCurrentPosition(
          async (position) => {
            let geolocation = {
              lat: position.coords.latitude,
              long: position.coords.longitude,
            };
            setIsLoadingNormal(isLoading);
            const res = await api.getNormalJob({
              page,
              size,
              ...geolocation,
              ...filterApply,
            });
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
    },
    []
  );

  const handlerApplyJobRunTime = async () => {
    setIsLoadingNormal(true);
    if (!profile || !profile?.id || !webSocketService) {
      toast(getToast("error", titleI18n['you_don_t_have_permission'], titleI18n['error']));
      return;
    }
    if (!jobIdConfirm || !descConfirm) {
      toast(getToast("error", titleI18n['invalid_parameter'], titleI18n['error']));
      setIsLoadingNormal(false);
      return;
    }
    const res = await api.applyNormalJob({
      jobId: jobIdConfirm,
      description: descConfirm,
    });

    webSocketService.sendPrivateToRequestApplyJob(
      profile?.id,
      jobIdConfirm,
      "Request Apply job!"
    );
    if (res) {
      toast(getToast("success", res?.metadata, "Success"));
      webSocketService.sendPrivateRequestUpdateNotify(
        null,
        profile?.id,
        "Send request update notify",
        jobIdConfirm
      );
      fetch(0, 10, false);
    }
    onClose();
    setIsLoadingNormal(false);
  };

  const handleApplyFilter = () => {
    setFilter({
      isVehicle,
      salaryFrom: salary?.[0],
      salaryTo: salary?.[1],
    });

    fetch(0, 10, true, {
      isVehicle,
      salaryFrom: salary?.[0],
      salaryTo: salary?.[1],
    });
  };

  const renderColorBadge = (distant) => {
    if(distant < 2){
      return "green"
    }
    if(distant < 4){
      return "blue"
    }
    if(distant < 5){
      return "yellow"
    }
    if(distant < 7){
      return "orange"
    }
    if(distant <= 10){
      return "purple"
    }
    if(distant > 10){
      return "black"
    }
  }

  const onChangePagination = (page, pageSize) => {
    pagination.page = page;
    pagination.size = pageSize;
    setPagination(pagination)
    fetch(page - 1, pageSize, false, filter);
  };

  return isLoadingNormal ? (
    <div style={{ marginTop: "30px" }}>
      <Loader />
    </div>
  ) : (
    <Container maxW="8xl" style={{ marginTop: "30px" }}>
      <div style={{ padding: 0 }}>
        <Row gutter={[24, 24]}>
          <Col xxs={12} xs={12} sm={12} md={12} lg={12} xl={6} xxl={6}>
            <Card variant={"elevated"}>
              <CardHeader>
                <Heading
                  p={5}
                  textTransform="uppercase"
                  textAlign={"center"}
                  as={"h1"}
                  size={"sm"}
                >
                  {titleI18n['filter']}
                </Heading>
              </CardHeader>
              <CardBody mb={20}>
                <FormControl>
                  <FormLabel mb={10}>{titleI18n['salary']}</FormLabel>
                  <Slider
                    marks={marks}
                    range
                    value={salary}
                    min={0}
                    max={10000000}
                    onChange={(val) => setSalary(val)}
                  />
                </FormControl>
                <FormControl mt={10}>
                  <FormLabel mb={5}>{titleI18n["vehicle"]}</FormLabel>
                  <Switch
                    value={isVehicle}
                    onChange={(val) => setIsVehicle(val)}
                  />
                </FormControl>
              </CardBody>
              <CardFooter justify={"center"}>
                <Button onClick={handleApplyFilter}>{titleI18n["apply"]}</Button>
              </CardFooter>
            </Card>
          </Col>
          <Col xxs={12} xs={12} sm={12} md={12} lg={12} xl={18} xxl={18}>
            <Row gutter={[24, 24]}>
              {jobs.length == 0 ? (
                <Col style={{ marginTop: "100px" }} span={24}>
                  <Empty />
                </Col>
              ) : (
                ""
              )}
              {jobs?.map((item) => (
                <Col
                  xxs={24}
                  xs={24}
                  sm={24}
                  md={24}
                  lg={24}
                  xl={12}
                  xxl={8}
                  key={item?.job?.id}
                >
                  <BadgeAnt.Ribbon
                    text={item.distance.toFixed(1) + " Km "}
                    color={renderColorBadge(item.distance)}
                  >
                    <CardJob
                      job={item?.job}
                      distance={item?.distance}
                      handleApply={() => {
                        onOpen();
                        setJobIdConfirm(item?.job?.id);
                      }}
                    />
                  </BadgeAnt.Ribbon>
                </Col>
              ))}
            </Row>
          </Col>
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
          <ModalHeader>{titleI18n["are_you_sure"]}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text mb="1rem">{titleI18n['note']}</Text>
            <Textarea
              size="sm"
              onChange={(e) => setDescConfirm(e.target.value)}
            />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" onClick={handlerApplyJobRunTime}>
              {titleI18n["confirm"]}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
}

export default FindJobsRealTime;

const marks = {
  0: "0",
  4000000: "4 triệu",
  7000000: "7 triệu",
  10000000: "10",
};

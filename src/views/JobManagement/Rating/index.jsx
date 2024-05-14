import React, { useCallback, useEffect, useState } from "react";
import Loader from "../../Loader";
import { Col, Empty, Pagination, Row } from "antd";
import { Container, useToast } from "@chakra-ui/react";
import api from "../../../services/api";
import RatingForm from "./RatingForm";
import { getToast } from "../../../utils/toast";
import { useAppSelector } from "../../../reduxs/hooks";

function RatingPage() {
  const { titleI18n } = useAppSelector((state) => state.account);

  const [isLoadingNormal, setIsLoadingNormal] = useState(false);
  const [pagination, setPagination] = useState({ page: 0, size: 10, total: 0 });
  const [userJobList, setUserJobList] = useState([]);
  const toast = useToast();

  const fetch = useCallback(async (page = 0, size = 10) => {
    const location = window.navigator && window.navigator.geolocation;

    if (location) {
      setIsLoadingNormal(true);
      const res = await api.getRate({ page, size });
      if (res) {
        setUserJobList(res?.metadata?.userJob);
        setPagination({ ...pagination, total: res?.metadata?.total });
      }
      setIsLoadingNormal(false);
    }
  }, []);

  useEffect(() => {
    fetch();
  }, []);

  const handleRating = async (rateValue, note, toUser,rateId) => {
    if (!rateValue) {
      toast(getToast("error", titleI18n['rate_value_is_require'], titleI18n['error']));
      return;
    }

    if (!note) {
      toast(getToast("error", titleI18n['your_comment_is_require'], titleI18n['error']));
      return;
    }

    if (!toUser) {
      toast(getToast("error", titleI18n['user_rate_is_require'], titleI18n['error']));
      return;
    }
    setIsLoadingNormal(true);
    const res = await api.rate({
      rateValue: parseFloat(rateValue),
      note,
      toUser,
      rateId,
    });
    if (res) {
      toast(getToast("success", res?.metadata, titleI18n['success']));
    }
    setIsLoadingNormal(false);
    fetch();
  };

  const onChangePagination = (page, pageSize) => {
    fetch(page - 1, pageSize);
  };

  return isLoadingNormal ? (
    <div style={{ marginTop: "30px" }}>
      <Loader />
    </div>
  ) : (
    <Container maxW="5xl">
      <div style={{ marginTop: "50px" }}>
        <div style={{ padding: 0 }}>
          <Row></Row>
          <Row gutter={[12, 12]}>
            {userJobList?.length == 0 ? (
              <Col style={{ marginTop: "100px" }} span={24}>
                <Empty />
              </Col>
            ) : (
              ""
            )}
            {userJobList?.map((userJob, index) => (
              <Col span={24} key={index} style={{ marginBottom: "10px" }}>
                <RatingForm
                  jobName={userJob?.jobName}
                  user={userJob?.user}
                  rateId={userJob?.rateId}
                  handleRating={handleRating}
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
              defaultCurrent={pagination.page}
              total={pagination.total}
              onChange={onChangePagination}
              showSizeChanger
            />
          </Row>
        </div>
      </div>
    </Container>
  );
}

export default RatingPage;

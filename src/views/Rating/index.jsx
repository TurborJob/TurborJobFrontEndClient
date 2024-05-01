import React, { useCallback, useEffect, useState } from 'react'
import Loader from '../Loader'
import { Col, Empty, Pagination, Row } from 'antd';
import { Container, useToast } from '@chakra-ui/react';
import api from "../../services/api";
import RatingForm from './RatingForm';
import { getToast } from '../../utils/toast';


function RatingPage() {
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

  const handleRating = async(rateValue, note, toUser) =>{
    setIsLoadingNormal(true);
      const res = await api.rate({ rateValue, note, toUser });
      if (res) {
        toast(getToast("success", res?.metadata, "Success"));
      }
      setIsLoadingNormal(false);
    fetch();
  }


  const onChangePagination = (page, pageSize) => {
    fetch(page - 1, pageSize);
  };

  return isLoadingNormal ? (
    <div style={{ marginTop: "30px" }}>
      <Loader />
    </div>
  ) : (
    <Container maxW="8xl">
    <div style={{marginTop:"50px"}}>
        <div style={{ padding: 0 }}>
        <Row></Row>
        <Row gutter={[12, 12]}>
          {userJobList?.length == 0 ? <Col style={{marginTop:'100px'}} span={24}><Empty /></Col> : ""}
          {userJobList?.map((userJob,index) => (
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
              <RatingForm
                jobName={userJob?.jobName}
                user={userJob?.user}
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
  )
}

export default RatingPage
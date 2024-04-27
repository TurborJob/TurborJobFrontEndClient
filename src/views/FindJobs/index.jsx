import { Box, Container, useToast } from '@chakra-ui/react'
import { Col, Pagination, Row } from 'antd'
import React, { useCallback, useEffect, useState } from 'react'
import api from "../../services/api";
import { getToast } from '../../utils/toast';
import CardJob from './CardJob';

function FindJobs() {
  const [jobs, setJobs] = useState([]);
  const [pagination, setPagination] = useState({page:0,size:10, total:0})

  const toast = useToast();
  const [isLoadingNormal, setIsLoadingNormal] = useState(false);

  
  const getMyLocation = async() => {
    const location = window.navigator && window.navigator.geolocation
    
    if (location) {
      location.getCurrentPosition((position) => {
        return {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }
      }, (error) => {
        console.log(error)
      })
    }

  }

  const fetch = useCallback(async (page = 0, size = 10) => {
    const location = window.navigator && window.navigator.geolocation
    
    if (location) {
      location.getCurrentPosition(async(position) => {
        let geolocation = {
          lat: position.coords.latitude,
          long: position.coords.longitude,
        }
        const res = await api.getNormalJob({ page, size, ...geolocation });
        if (res) {
        setJobs(res?.metadata?.jobs)
        setPagination({...pagination, total: res?.metadata?.total})
        }
      }, (error) => {
        console.log(error)
      })
    }    
  }, []);

  useEffect( () => {
    fetch();
  }, []);

  const onChangePagination = (page, pageSize) =>{
    fetch(page-1, pageSize);
  }

  const handlerFindJobNormal = async(jobId) =>{
    setIsLoadingNormal(true)
    // const res = await api.findNormalJob({jobId});
    // if(res){
    //   toast(getToast("success", res?.metadata, "Success"));
    //   fetch()
    // }
    setIsLoadingNormal(false);
  }

  return (
    <Container maxW='8xl'>
      <div style={{ padding: 0 }}>
      <Row></Row>
      <Row gutter={[12, 12]}>
        {jobs?.map((job, index)=>(
            <Col xxs={24} xs={24} sm={12} md={12} lg={8} xl={8} xxl={6} key={index}>
          <CardJob job={job} handlerFindJobNormal={handlerFindJobNormal}/>
        </Col>
        ))}
      </Row>
      <Row style={{display:"flex", justifyContent:"flex-end", paddingTop:"20px"}}>
       <Pagination defaultCurrent={pagination.page} total={pagination.total} onChange={onChangePagination} showSizeChanger/>
      </Row>
    </div>
</Container>
  )
}

export default FindJobs
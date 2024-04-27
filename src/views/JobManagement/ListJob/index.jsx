import { Col, Pagination, Row } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import CardJob from "./CardJob";
import api from "../../../services/api";
import { getToast } from "../../../utils/toast";
import { useToast } from "@chakra-ui/react";

function ListJob() {
  const [jobs, setJobs] = useState([]);
  const [pagination, setPagination] = useState({page:0,size:10, total:0})

  const toast = useToast();
  const [isLoadingNormal, setIsLoadingNormal] = useState(false);

  const fetch = useCallback(async (page = 0, size = 10) => {
    const res = await api.getJob({ page, size });
    if (res) {
     setJobs(res?.metadata?.jobs)
     setPagination({...pagination, total: res?.metadata?.total})
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
    const res = await api.findNormalJob({jobId});
    if(res){
      toast(getToast("success", res?.metadata, "Success"));
      fetch()
    }
    setIsLoadingNormal(false);
  }

  return (
    <div style={{ padding: 20 }}>
      <Row></Row>
      <Row gutter={[12, 12]}>
        {jobs?.map((job, index)=>(
            <Col xxs={24} xs={24} sm={12} md={12} lg={8} xl={8} xxl={6} key={index}>
          <CardJob job={job} handlerFindJobNormal={handlerFindJobNormal}/>
        </Col>
        ))}
      </Row>
      <Row style={{display:"flex", justifyContent:"flex-end"}}>
       <Pagination defaultCurrent={pagination.page} total={pagination.total} onChange={onChangePagination} showSizeChanger/>
      </Row>
    </div>
  );
}

export default ListJob;

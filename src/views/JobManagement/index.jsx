import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../reduxs/hooks";
import { Heading } from "@chakra-ui/react";
import api from "../../services/api"

function JobManagement() {
  const [isLoading, setIsLoading] = useState(false);
  const { roles } = useAppSelector((state) => state.account);

  const fetch = async() =>{
    const res = await api.getBusinessStatistic();
    console.log(res);
  }

  useEffect(() => {
    fetch()
  }, [])
  
  return (
    <div>
      <Heading as="h3" size="2xl" noOfLines={1}>
        Welcome Job management
      </Heading>
    </div>
  );
}

export default JobManagement;

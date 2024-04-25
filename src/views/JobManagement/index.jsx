import React, { useState } from "react";
import { useAppSelector } from "../../reduxs/hooks";
import { Heading } from "@chakra-ui/react";

function JobManagement() {
  const [isLoading, setIsLoading] = useState(false);
  const { roles } = useAppSelector((state) => state.account);
  return (
    <div>
      <Heading as="h3" size="2xl" noOfLines={1}>
        Welcome Job management
      </Heading>
    </div>
  );
}

export default JobManagement;

import { Spinner } from "@chakra-ui/react";
import React from "react";

function Loader() {
  return (
    <div>
      Loading...
      <Spinner
        thickness="2px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="sm"
      />
    </div>
  );
}

export default Loader;

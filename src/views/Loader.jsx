import { Center, Spinner } from "@chakra-ui/react";
import React from "react";

function Loader() {
  return (
    <div style={{minHeight:"400px", display:"flex", justifyContent:"center", alignItems:"center"}}>
      <Center>
        Loading...
        <div style={{marginLeft:"30px"}}></div>
        <Spinner
          thickness="6px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Center>
    </div>
  );
}

export default Loader;

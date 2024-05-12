import React from "react";

import DefaultHeader from "./DefaultHeader";
import DefaultFooter from "./DefaultFooter";
import DefaultAside from "./DefaultAside";
import { Container, position, useDisclosure } from "@chakra-ui/react";

function DefaultLayout({ children }) {
  const {
    isOpen: isOpenDraw,
    onOpen: onOpenDraw,
    onClose: onCloseDraw,
  } = useDisclosure();
  return (
    <>
      <div className="app ">
        <div className="app-header">
          <DefaultHeader />
        </div>
        <div className="app-body" style={{minHeight:"950px", paddingTop:"50px"}} >
            <div className="mt-4" >
              <div className="">{children}</div>
            </div>
        </div>
        <div>
          <DefaultAside isOpenDraw={isOpenDraw} onCloseDraw={onCloseDraw} />
        </div>
        <div>
          <DefaultFooter />
        </div>
      </div>
    </>
  );
}

export default DefaultLayout;

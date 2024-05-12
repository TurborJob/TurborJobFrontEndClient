import React from "react";

import { Box, Container, Flex, position, useDisclosure } from "@chakra-ui/react";
import { useAppSelector } from "../../reduxs/hooks";
import AdminHeader from "./AdminHeader";
import AdminAside from "./AdminAside";
import AdminFooter from "./AdminFooter";
import SimpleSidebarAdmin from "./SimpleSidebarAdmin";

function AdminLayout({ children }) {

  const {
    isOpen: isOpenDraw,
    onOpen: onOpenDraw,
    onClose: onCloseDraw,
  } = useDisclosure();
  return (
    <>
      <div className="app ">
        <div className="app-header">
          <AdminHeader />
        </div>
        <div className="app-body" style={{minHeight:"950px"}}>
          <Flex>
            <SimpleSidebarAdmin />
            <Box className="mt-4" style={{width:"100%"}} pt={100} px={10}>
              <div className="">{children}</div>
            </Box>
          </Flex>
        </div>

        <div>
          <AdminAside isOpenDraw={isOpenDraw} onCloseDraw={onCloseDraw} />
        </div>
        <div>
          <AdminFooter />
        </div>
      </div>
    </>
  );
}

export default AdminLayout;

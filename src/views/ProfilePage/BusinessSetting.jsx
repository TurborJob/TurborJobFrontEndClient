import { Button, Highlight, useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import api from "../../services/api";
import { getToast } from "../../utils/toast";
import { useAppSelector } from "../../reduxs/hooks";

function BusinessSetting() {
  const [isLoading, setIsLoading] = useState(false);
  const { roles } = useAppSelector((state) => state.account);
  const toast = useToast();

  const handleUpdateBusiness = async () => {
    const res = await api.updateBusiness();
    if (res) {
      toast(getToast("success", res.metadata, "Success"));
      location.reload();
    }
  };

  return (
    <div>
      <Highlight
        query="free"
        styles={{ px: "1", py: "1", bg: "orange.100", fontWeight: "bold" }}
      >
        The feature is currently free to use and may charge a fee in the future
        !
      </Highlight>
      {roles && roles?.find((role) => role.name == "Business") ? (
        <div>
        <Highlight
          query="business"
          styles={{ px: "1", py: "1", bg: "blue.100", fontWeight: "bold" }}
        >
          You were a business !
        </Highlight>
        </div>
      ) : (
        <Button my={10} colorScheme="orange" onClick={handleUpdateBusiness}>
          Upgrade to Business
        </Button>
      )}
    </div>
  );
}

export default BusinessSetting;

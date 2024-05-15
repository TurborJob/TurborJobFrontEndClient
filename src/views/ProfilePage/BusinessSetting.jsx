import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Highlight,
  Image,
  Stack,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import api from "../../services/api";
import { getToast } from "../../utils/toast";
import { useAppDispatch, useAppSelector } from "../../reduxs/hooks";
import PaymentPocket from "../PaymentPocket";

function BusinessSetting() {
  const [isLoading, setIsLoading] = useState(false);
  const { roles, titleI18n } = useAppSelector((state) => state.account);
  const dispatch = useAppDispatch();
  const toast = useToast();

  const getRoleName = async () => {
    let res = await api.getRoleName();
    if (res) {
      dispatch(setRoles(res.metadata));
    }
  };

  const handleUpdateBusiness = async () => {
    const res = await api.updateBusiness();
    if (res) {
      toast(getToast("success", res.metadata, "Success"));
      location.reload();
      getRoleName();
    }
  };

  return (
    <div>
      <Highlight
        query="free"
        styles={{ px: "1", py: "1", bg: "orange.100", fontWeight: "bold" }}
      >
        {
          titleI18n[
            "the_feature_is_currently_free_to_use_and_may_charge_a_fee_in_the_future"
          ]
        }
      </Highlight>

      {roles && roles?.find((role) => role.name == "Business") ? (
        <div>
          <Highlight
            query="business"
            styles={{ px: "1", py: "1", bg: "blue.100", fontWeight: "bold" }}
          >
            {titleI18n["you_were_a_business"]}
          </Highlight>
        </div>
      ) : (
        <Button my={10} colorScheme="orange" onClick={handleUpdateBusiness}>
          {titleI18n["upgrade_to_business"]}
        </Button>
      )}
      {roles && roles?.find((role) => role.name == "Business") && (
        <PaymentPocket />
      )}
    </div>
  );
}

export default BusinessSetting;

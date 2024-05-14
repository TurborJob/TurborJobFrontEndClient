import React from "react";
import local from "../utils/localStorage";
import { useAppDispatch, useAppSelector } from "../reduxs/hooks";
import { Select, useColorModeValue } from "@chakra-ui/react";
import { setTitleI18n } from "../reduxs/accounts/account.slice";
import { dataLang } from "../reduxs/accounts/account.slice";

function SelectLang() {
  const { titleI18n } = useAppSelector((state) => state.account);
  const dispatch = useAppDispatch();

  const handleChangeLang = (val) => {
    local.add("language", val);
    dispatch(setTitleI18n(dataLang[val]));
  };

  return (
    <Select
      size="sm"
      bg={useColorModeValue("gray.50", "gray.900")}
      value={localStorage.getItem("language") || "vn"}
      onChange={(e) => handleChangeLang(e.target.value)}
    >
      <option value="vn">VN</option>
      <option value="en">EN</option>
    </Select>
  );
}

export default SelectLang;

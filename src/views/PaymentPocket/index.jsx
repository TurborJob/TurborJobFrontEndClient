import React, { useState } from "react";
import { paymentMethods, pocketsExtend } from "../../constant";
import { Center, Stack } from "@chakra-ui/react";
import { useAppSelector } from "../../reduxs/hooks";
import MethodCard from "./MethodCard";
import PackCard from "./PackCard";
import Loader from "../Loader";

function PaymentPocket() {
  const { titleI18n } = useAppSelector((state) => state.account);
  const [focusPack, setFocusPack] = useState();
  const [loading, setLoading] = useState(false);

  return loading ? (
    <div style={{ marginTop: "30px" }}>
      <Loader />
    </div>
  ) : (
    <div>
      <Stack>
        <Center py={6}>
          {pocketsExtend.map((pack) => (
            <PackCard
              key={pack.id}
              pack={pack}
              setFocusPack={setFocusPack}
              focusPack={focusPack}
            />
          ))}
        </Center>
      </Stack>
      {focusPack && (
        <Stack>
          <Center py={6}>
            {paymentMethods?.map((method) => (
              <MethodCard
                method={method}
                pack={focusPack}
                key={method.id}
                setLoading={setLoading}
              />
            ))}
          </Center>
        </Stack>
      )}
    </div>
  );
}

export default PaymentPocket;

import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { Stack } from "@chakra-ui/react";
import { Row, Col } from "antd";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import BasicStatistics from "./Statistic";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

let defaultDoughnutDataAccount = {
  labels: ["Admin", "Business", "Worker"],
  datasets: [
    {
      label: "# of All Accounts",
      data: [0, 0, 0, 0, 0],
      backgroundColor: [
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
      ],
      borderColor: [
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

let defaultDoughnutDataContact = {
  labels: ["Replied", "Pending"],
  datasets: [
    {
      label: "# of All contact",
      data: [0, 0, 0, 0, 0],
      backgroundColor: ["rgba(54, 162, 235, 0.2)", "rgba(255, 206, 86, 0.2)"],
      borderColor: ["rgba(54, 162, 235, 1)", "rgba(75, 192, 192, 1)"],
      borderWidth: 1,
    },
  ],
};

let defaultDoughnutDataRating = {
  labels: ["Pending", "Success"],
  datasets: [
    {
      label: "# of All jobs",
      data: [0, 0, 0, 0, 0],
      backgroundColor: ["rgba(255, 206, 86, 0.2)", "rgba(75, 192, 192, 0.2)"],
      borderColor: ["rgba(255, 206, 86, 1)", "rgba(75, 192, 192, 1)"],
      borderWidth: 1,
    },
  ],
};

function Dashboard() {
  let [totalAccounts, setTotalAccounts] = useState();
  let [totalContacts, setTotalContacts] = useState();
  // let [totalDevices, setTotalDevices] = useState();
  let [totalSessions, setTotalSessions] = useState();

  // let [numAccountAdmin, setNumAccountAdmin] = useState();
  // let [numAccountBusiness, setNumAccountBusiness] = useState();
  // let [numAccountWorker, setNumAccountWorker] = useState();
  // let [numContactReplied, setNumContactReplied] = useState();

  let [doughnutDataAccount, setDoughnutDataAccount] = useState();
  let [doughnutDataContact, setDoughnutDataContact] = useState();

  const fetch = async () => {
    const res = await api.getAdminStatistic();
    if (res) {
      setTotalAccounts(res?.metadata.totalAccounts);
      setTotalContacts(res?.metadata.totalContacts);
      // setTotalDevices(res?.metadata.totalDevices);
      setTotalSessions(res?.metadata.totalSessions);

      // setNumAccountAdmin(res?.metadata.numAccountAdmin);
      // setNumAccountBusiness(res?.metadata.numAccountBusiness);
      // setNumAccountWorker(res?.metadata.numAccountWorker);
      // setNumContactReplied(res?.metadata.numContactReplied);

      defaultDoughnutDataAccount.datasets[0].data = [
        res?.metadata.numAccountAdmin,
        res?.metadata.numAccountBusiness,
        res?.metadata.numAccountWorker,
      ];

      defaultDoughnutDataContact.datasets[0].data = [
        res?.metadata.numContactReplied,
        res?.metadata.totalContacts - res?.metadata.numContactReplied,
      ];

      setDoughnutDataAccount(defaultDoughnutDataAccount);
      setDoughnutDataContact(defaultDoughnutDataContact);
    }
  };

  useEffect( () => {
    fetch();
    return () => {};
  }, []);

  return (
    <div>
      <BasicStatistics
        totalAccount={totalAccounts}
        totalContact={totalContacts}
        totalSession={totalSessions}
      />
      <Stack>
        <Row gutter={[12, 12]} style={{ padding: "20px" }}>
          <Col
            xxs={24}
            xs={24}
            sm={24}
            md={12}
            lg={12}
            xl={8}
            xxl={8}
            style={{ padding: "40px" }}
          >
            {doughnutDataAccount && (
              <Doughnut
                data={doughnutDataAccount}
                options={{
                  plugins: {
                    title: {
                      display: true,
                      text: "Accounts",
                      align: "center",
                      padding: {
                        top: 10,
                        bottom: 30,
                      },
                      position: "top",
                    },
                    legend: {
                      display: true,
                      position: "bottom",
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                      },
                    },
                  },
                }}
              />
            )}
          </Col>
          <Col
            xxs={24}
            xs={24}
            sm={24}
            md={12}
            lg={12}
            xl={8}
            xxl={8}
            style={{ padding: "40px" }}
          >
            {doughnutDataContact && (
              <Doughnut
                data={doughnutDataContact}
                options={{
                  plugins: {
                    title: {
                      display: true,
                      text: "Contacts",
                      align: "center",
                      padding: {
                        top: 10,
                        bottom: 30,
                      },
                      position: "top",
                    },
                    legend: {
                      display: true,
                      position: "bottom",
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                      },
                    },
                  },
                }}
              />
            )}
          </Col>
          <Col
            xxs={24}
            xs={24}
            sm={24}
            md={12}
            lg={12}
            xl={8}
            xxl={8}
            style={{ padding: "40px" }}
          >
            {/* {doughnutDataRating && (
              <Doughnut
                data={doughnutDataRating}
                options={{
                  plugins: {
                    title: {
                      display: true,
                      text: "Status in rating of Business",
                      align: "center",
                      padding: {
                        top: 10,
                        bottom: 30,
                      },
                      position: "top",
                    },
                    legend: {
                      display: true,
                      position: "bottom",
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                      },
                    },
                  },
                }}
              />
            )} */}
          </Col>
        </Row>
      </Stack>
    </div>
  );
}

export default Dashboard;

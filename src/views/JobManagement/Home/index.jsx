import React, { useEffect, useState } from "react";
import Statistics from "../Home/Statistic";
import api from "../../../services/api";
import { Stack } from "@chakra-ui/react";
import { Row, Col } from "antd";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useAppSelector } from "../../../reduxs/hooks";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

let defaultDoughnutDataJobs = {
  labels: ["Fail", "Processing", "InActive", "Success", "Done"],
  datasets: [
    {
      label: "# of All jobs",
      data: [0, 0, 0, 0, 0],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

let defaultDoughnutDataRequest = {
  labels: ["Reject", "Pending", "Approve"],
  datasets: [
    {
      label: "# of All apply request",
      data: [0, 0, 0, 0, 0],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(75, 192, 192, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(75, 192, 192, 1)",
      ],
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

function HomeBusiness() {
  const { titleI18n } = useAppSelector((state) => state.account);

  const [businessStatistic, setBusinessStatistic] = useState();
  const [doughnutDataJobs, setDoughnutDataJobs] = useState();
  const [doughnutDataRequest, setDoughnutDataRequest] = useState();
  const [doughnutDataRating, setDoughnutDataRating] = useState();

  const fetch = async () => {
    const res = await api.getBusinessStatistic();
    if (res) {
      setBusinessStatistic(res?.metadata);
      defaultDoughnutDataJobs.datasets[0].data = [
        res?.metadata?.numJobFail,
        res?.metadata?.numJobProcessing,
        res?.metadata?.numJobInActive,
        res?.metadata?.numJobSuccess,
        res?.metadata?.numJobDone,
      ];

      defaultDoughnutDataRequest.datasets[0].data = [
        res?.metadata?.numWorkerReject,
        res?.metadata?.numWorkerPending,
        res?.metadata?.numWorkerApprove,
      ];

      defaultDoughnutDataRating.datasets[0].data = [
        res?.metadata?.numRatingPending,
        res?.metadata.totalRating - res?.metadata?.numRatingPending,
      ];

      setDoughnutDataJobs(defaultDoughnutDataJobs);
      setDoughnutDataRequest(defaultDoughnutDataRequest);
      setDoughnutDataRating(defaultDoughnutDataRating);
    }
  };

  useEffect(() => {
    fetch();
  }, []);
  return (
    <div>
      <Statistics
        totalJob={businessStatistic?.totalJob}
        totalRequestApply={businessStatistic?.totalWorkerReqApply}
        totalRating={businessStatistic?.totalRating}
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
            {doughnutDataJobs && (
              <Doughnut
                data={doughnutDataJobs}
                options={{
                  plugins: {
                    title: {
                      display: true,
                      text: titleI18n['status_in_jobs_of_business'],
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
          <Col xxs={24} xs={24} sm={24} md={12} lg={12} xl={8} xxl={8} 
            style={{ padding: "40px" }}
            >
            {doughnutDataRequest && (
              <Doughnut
                data={doughnutDataRequest}
                options={{
                  plugins: {
                    title: {
                      display: true,
                      text: titleI18n['status_in_apply_requests_of_business'],
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
          <Col xxs={24} xs={24} sm={24} md={12} lg={12} xl={8} xxl={8}
            style={{ padding: "40px" }}
            >
            {doughnutDataRating && (
              <Doughnut
                data={doughnutDataRating}
                options={{
                  plugins: {
                    title: {
                      display: true,
                      text: titleI18n['status_in_rating_of_business'],
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
        </Row>
      </Stack>
    </div>
  );
}

export default HomeBusiness;

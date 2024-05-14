import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import AccountSetting from "./AccountSetting";
import ProfileSetting from "./ProfileSetting";
import BusinessSetting from "./BusinessSetting";
import { useAppSelector } from "../../reduxs/hooks";

export default function TabInfo() {
  const { titleI18n } = useAppSelector((state) => state.account);
  function DataTabs({ data }) {
    return (
      <Tabs style={{ fontFamily: "Poppins" }}>
        <TabList>
          {data.map((tab, index) => (
            <Tab key={index}>{tab.label}</Tab>
          ))}
        </TabList>
        <TabPanels>
          {data.map((tab, index) => (
            <TabPanel p={6} key={index}>
              {tab.content}
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    );
  }

  // 2. Create an array of data
  const tabData = [
    {
      label: titleI18n['account_setting'],
      content: <AccountSetting />,
    },
    {
      label: titleI18n['profile_setting'],
      content:
        <ProfileSetting />,
    },
    {
      label: titleI18n['business_setting'],
      content:
        <BusinessSetting />,
    },
    // {
    //   label: "Notification",
    //   content:
    //     "Perhaps the surest dish ever invented but fills the stomach more than rice.",
    // },
  ];

  // 3. Pass the props and chill!
  return <DataTabs data={tabData} />;
}

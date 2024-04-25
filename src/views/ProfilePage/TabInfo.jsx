import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import AccountSetting from "./AccountSetting";
import ProfileSetting from "./ProfileSetting";
import BusinessSetting from "./BusinessSetting";

export default function TabInfo() {
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
      label: "Account Setting",
      content: <AccountSetting />,
    },
    {
      label: "Profile Setting",
      content:
        <ProfileSetting />,
    },
    {
      label: "Business Setting",
      content:
        <BusinessSetting />,
    },
    {
      label: "Notification",
      content:
        "Perhaps the surest dish ever invented but fills the stomach more than rice.",
    },
  ];

  // 3. Pass the props and chill!
  return <DataTabs data={tabData} />;
}

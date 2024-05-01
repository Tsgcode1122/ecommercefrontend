import React from "react";
import { Tabs } from "antd";
import CreateSalesPercentage from "../components/CreateSalesPercentage";
import PercentageList from "../components/PercentageList";

const { TabPane } = Tabs;

const PercentageManagement = () => {
  return (
    <Tabs defaultActiveKey="1">
      <TabPane tab="Create Sales Percentage" key="1">
        <CreateSalesPercentage />
      </TabPane>
      <TabPane tab="Apply Percentage" key="2">
        <PercentageList />
      </TabPane>
    </Tabs>
  );
};

export default PercentageManagement;

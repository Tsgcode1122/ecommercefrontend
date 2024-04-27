import React from "react";
import { Tabs } from "antd";

import EditSalesPop from "../components/EditSalesPop";
import CreateSalesPop from "../components/CreateSalesPop";
import OnSaleMotionSlide from "../components/OnSaleMotionSlide";
import EditSaleMotion from "../components/EditSaleMotion";

const { TabPane } = Tabs;

const SalePopupManagement = () => {
  return (
    <Tabs defaultActiveKey="1">
      <TabPane tab="Create Sale Popup" key="1">
        <CreateSalesPop />
      </TabPane>
      <TabPane tab="Edit Sale Popup" key="2">
        <EditSalesPop />
      </TabPane>
      <TabPane tab="Create Sale Motion" key="3">
        <OnSaleMotionSlide />
      </TabPane>
      <TabPane tab="Edit Sale Motion" key="4">
        <EditSaleMotion />
      </TabPane>
    </Tabs>
  );
};

export default SalePopupManagement;

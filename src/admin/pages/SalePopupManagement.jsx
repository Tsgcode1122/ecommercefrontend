import React from "react";
import { Tabs } from "antd";

import EditSalesPop from "../components/EditSalesPop";
import CreateSalesPop from "../components/CreateSalesPop";

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
    </Tabs>
  );
};

export default SalePopupManagement;

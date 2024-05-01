import React from "react";
import { Tabs } from "antd";

import CouponList from "../components/CouponList";
import CreateCoupon from "../components/CreateCoupon";

const { TabPane } = Tabs;

const DiscountManagement = () => {
  return (
    <Tabs defaultActiveKey="1">
      <TabPane tab="Create Coupon" key="1">
        <CreateCoupon />
      </TabPane>
      <TabPane tab="Coupon List" key="2">
        <CouponList />
      </TabPane>
    </Tabs>
  );
};

export default DiscountManagement;

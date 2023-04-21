import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { PublicRouteLayout } from "../layouts/PublicRouteLayout";
import {
  getCredByProviderIdAndCourseCode,
  listAllCredsAsync,
} from "../services/cred.service";

const PriceReport = () => {
  useEffect(() => {
    const loadData = async () => {
      const allCreds = await listAllCredsAsync();
      const tasks =
        allCreds.response?.map(async (cred) => {
          const { provider, id, courseCode, title } = cred;
          const data = await getCredByProviderIdAndCourseCode(provider, id);
          return {
            ...data.response,
            provider,
            title,
            courseCode,
          };
        }) || [];

      const results = [] as any[];

      for await (const task of tasks) {
        const { discountDesc, price, discountIndicator, priceGstIndicator } =
          task.data || {};

        const { provider, title, courseCode } = task;
        results.push({
          provider,
          title,
          courseCode,
          price,
          priceGstIndicator,
          discountDesc,
          discountIndicator,
        });
      }

      console.log("results", results);
    };
    loadData();
  }, []);
  return (
    <PublicRouteLayout title="Create Providers Bulk">
      <Box>PriceReport</Box>
    </PublicRouteLayout>
  );
};

export default PriceReport;

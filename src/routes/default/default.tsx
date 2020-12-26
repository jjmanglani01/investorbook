import { Box, Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";

import { useGetInvestorsQuery } from "../../generated/graphql";
import Loader from "../../components/loader";
import ProductName from "../../components/product-name";
import Investors from "../investors/investors";

export default function DefaultRoute() {
  const { data, loading } = useGetInvestorsQuery();

  if (loading) {
    return <Loader type="table" />;
  }

  if (data) {
    return (
      <Box padding={10}>
        <ProductName />
        <Tabs isLazy={true} mt={4}>
          <TabList>
            <Tab>Investors</Tab>
            <Tab>Companies</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Investors />
            </TabPanel>
            <TabPanel>Implement Company</TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    );
  }
  return null;
}

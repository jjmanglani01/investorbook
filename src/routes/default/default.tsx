import { Box, Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";

import ProductName from "../../components/product-name";
import Investors from "../investors/investors";
import Companies from "../companies/companies";

export default function DefaultRoute() {
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
          <TabPanel>
            <Companies />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}

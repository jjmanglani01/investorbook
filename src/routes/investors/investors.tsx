import { Heading, Box, Button, Icon, Table, Thead, Tbody, Tr, Th, Td, Avatar, Text } from "@chakra-ui/react";

import { useGetInvestorsQuery } from "../../generated/graphql";
import Loader from "../../components/loader";

export default function Investors() {
  const { data, loading } = useGetInvestorsQuery();

  if (loading) {
    return <Loader type="table" />;
  }

  function renderInvestor(investor: any) {
    return (
      <Tr key={investor.id}>
        <Td>
          <Avatar name={investor.name} src={investor.photo_thumbnail} />
          <Text fontWeight="bold">{investor.name}</Text>
        </Td>
        <Td>
          <Text color="#6C6C6C">
            {investor.investments.map((investment: any) => investment.company.name).join(",")}
          </Text>
        </Td>
      </Tr>
    );
  }

  if (data) {
    return (
      <Box pt={4}>
        <Box display="flex">
          <Box>
            <Heading>Investors</Heading>
            <Button varaint="outline" variantColor="brand.300">
              Add Investor
            </Button>
          </Box>
          <Box>
            {/*TODO: add search icon*/}
            <Icon />
          </Box>
        </Box>
        <Box>
          <Table>
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Investments</Th>
              </Tr>
            </Thead>
            <Tbody>{data.investor.map(renderInvestor)}</Tbody>
          </Table>
        </Box>
      </Box>
    );
  }
  return null;
}

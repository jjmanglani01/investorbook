import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Heading, Box, Button, Icon, Table, Thead, Tbody, Tr, Th, Td, Avatar, Text, Stack } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";

import { useGetInvestorsQuery } from "../../generated/graphql";
import Loader from "../../components/loader";
import TablePagination from "../../components/table-pagination";

export default function Investors() {
  const history = useHistory();
  const [limit, setLimit] = useState<number>(6);
  const [page, setPage] = useState<number>(0);
  const { data, loading } = useGetInvestorsQuery({
    variables: {
      limit,
      offset: page * limit,
    },
  });

  function onNextPage() {
    setPage(page + 1);
  }

  function onPreviousPage() {
    setPage(page - 1);
  }

  function onNumberOfRowChange(row: number) {
    setLimit(row);
  }

  function onInvestorClick(investorId: number) {
    history.push(`investor/${investorId}`);
  }

  if (loading) {
    return <Loader type="table" />;
  }

  function renderInvestor(investor: any) {
    return (
      <Tr key={investor.id} cursor="pointer" onClick={onInvestorClick.bind(null, investor.id)}>
        <Td width="20%">
          <Box display="flex" alignItems="center">
            <Avatar name={investor.name} src={investor.photo_thumbnail} mr={2} />
            <Text fontWeight="bold">{investor.name}</Text>
          </Box>
        </Td>
        <Td width="80%" wordBreak="break-all">
          <Box>
            <Text color="#6C6C6C">
              {investor.investments.map((investment: any) => investment.company.name).join(", ")}
            </Text>
          </Box>
        </Td>
      </Tr>
    );
  }

  if (data) {
    return (
      <Box pt={4}>
        <Box display="flex" justifyContent="space-between" my={4}>
          <Stack isInline spacing={4}>
            <Heading>Investors</Heading>
            <Button variant="outline" colorScheme="blue">
              Add Investor
            </Button>
          </Stack>
          <Box>
            <Icon as={FaSearch} />
          </Box>
        </Box>
        <Box my={4}>
          <Table>
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Investments</Th>
              </Tr>
            </Thead>
            <Tbody>{data.investor.map(renderInvestor)}</Tbody>
          </Table>
          <TablePagination
            totalCount={data.investor_aggregate?.aggregate?.count ?? 0}
            offset={page * limit}
            limit={limit}
            onPreviousPage={onPreviousPage}
            onNextPage={onNextPage}
            onNumberOfRowChange={onNumberOfRowChange}
          />
        </Box>
      </Box>
    );
  }
  return null;
}

import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Heading, Box, Button, Icon, Table, Thead, Tbody, Tr, Th, Td, Text, Stack } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";

import { useGetCompaniesQuery } from "../../generated/graphql";
import Loader from "../../components/loader";
import TablePagination from "../../components/table-pagination";

export default function Companies() {
  const [limit, setLimit] = useState<number>(6);
  const [page, setPage] = useState<number>(0);
  const history = useHistory();
  const { data, loading } = useGetCompaniesQuery({
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

  function onCompanyClick(id: number) {
    history.push(`/company/${id}`);
  }

  if (loading) {
    return <Loader type="table" />;
  }

  function renderCompany(company: any) {
    return (
      <Tr key={company.id} onClick={onCompanyClick.bind(null, company.id)} cursor="pointer">
        <Td width="20%">
          <Text fontWeight="bold">{company.name}</Text>
        </Td>
        <Td width="80%" wordBreak="break-all">
          <Text color="#6C6C6C">
            {company.investments.map((investment: any) => investment.investor.name).join(", ")}
          </Text>
        </Td>
      </Tr>
    );
  }

  if (data) {
    return (
      <Box pt={4}>
        <Box display="flex" justifyContent="space-between" my={4}>
          <Stack isInline spacing={4}>
            <Heading>Companies</Heading>
            <Button variant="outline" colorScheme="blue">
              Add Company
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
            <Tbody>{data.company.map(renderCompany)}</Tbody>
          </Table>
          <TablePagination
            totalCount={data.company_aggregate?.aggregate?.count ?? 0}
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

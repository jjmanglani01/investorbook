import { useParams, useHistory } from "react-router-dom";
import { Heading, Box, IconButton, Icon, Button, Table, Thead, Tbody, Tr, Th, Td, Text, Stack } from "@chakra-ui/react";
import { MdChevronLeft, MdEdit, MdDelete, MdAdd } from "react-icons/md";

import { useGetCompanyQuery } from "../../generated/graphql";
import Loader from "../../components/loader";
import { currencyFormatter } from "../../util/formatter";

export default function Company() {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  /*TODO: show error toast or redirect to error page*/
  if (!id) {
    return null;
  }
  const companyId = parseInt(id, 10);
  const { data, loading } = useGetCompanyQuery({
    variables: {
      id: companyId,
    },
  });

  function onGoBack() {
    history.goBack();
  }

  function onEditCompany() {
    console.log("Edit company");
  }

  function onRemoveCompany() {
    console.log("Remove company");
  }

  function onAddInvestor() {
    console.log("Add investor");
  }

  function renderInvestor(investment: any) {
    return (
      <Tr key={investment.investor.id}>
        <Td>
          <Text fontWeight="bold">{investment.investor.name}</Text>
        </Td>
        <Td>
          <Box>
            <Text>{currencyFormatter.format(investment?.amount ?? 0)}</Text>
          </Box>
        </Td>
        <Td>
          <Stack isInline spacing={4}>
            <IconButton icon={<MdEdit />} aria-label="Edit Investor" variant="unstyled" />
            <IconButton icon={<MdDelete />} aria-label="Delete Investor" variant="unstyled" />
          </Stack>
        </Td>
      </Tr>
    );
  }

  if (loading) {
    return <Loader type="content" />;
  }

  if (data) {
    return (
      <Box padding={10}>
        <Box display="flex" justifyContent="space-between" my={4}>
          <Stack isInline spacing={4} alignItems="center" flex={0}>
            <IconButton aria-label="Go back" onClick={onGoBack} icon={<MdChevronLeft size={40} />} variant="unstyled" />
            <Heading>{data.company_by_pk?.name ?? ""}</Heading>
          </Stack>
          <Stack isInline spacing={4}>
            <Button variant="unstyled" onClick={onEditCompany}>
              <Icon as={MdEdit} mr={2} />
              Edit Name
            </Button>
            <Button variant="unstyled" onClick={onRemoveCompany}>
              <Icon as={MdDelete} mr={2} />
              Remove Company
            </Button>
          </Stack>
        </Box>
        <Box pl={14}>
          <Box display="flex" alignItems="center">
            <Text fontWeight="bold">Investors</Text>
            <Button onClick={onAddInvestor} colorScheme="blue" variant="ghost">
              <Icon as={MdAdd} />
              Add Investor
            </Button>
          </Box>
          <Box my={4}>
            <Table>
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>Amount</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>{data.company_by_pk?.investments.map(renderInvestor)}</Tbody>
            </Table>
          </Box>
        </Box>
      </Box>
    );
  }
  return null;
}

import { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Box, IconButton, Icon, Button, Table, Thead, Tbody, Tr, Th, Td, Text, Stack, Avatar } from "@chakra-ui/react";
import { MdChevronLeft, MdEdit, MdDelete, MdAdd } from "react-icons/md";

import { useGetInvestorQuery } from "../../generated/graphql";
import Loader from "../../components/loader";
import { currencyFormatter } from "../../util/formatter";
import { AddInvestmentModal } from "./add-investment";

export default function Investor() {
  const { id } = useParams<{ id: string }>();
  const [showAddInvestment, setShowAddInvestment] = useState(false);
  const history = useHistory();
  /*TODO: show error toast or redirect to error page*/
  if (!id) {
    return null;
  }
  const investorId = parseInt(id, 10);
  const { data, loading, refetch } = useGetInvestorQuery({
    variables: {
      id: investorId,
    },
  });

  function onGoBack() {
    history.goBack();
  }

  function onEditInvestor() {
    console.log("Edit Investor");
  }

  function onRemoveInvestor() {
    console.log("Remove Investor");
  }

  function onAddInvestment() {
    setShowAddInvestment(true);
  }

  async function closeInvestment(shouldRefetch?: boolean) {
    setShowAddInvestment(false);
    if (!!shouldRefetch) {
      await refetch();
    }
  }

  function renderInvestment(investment: any) {
    return (
      <Tr key={investment.id}>
        <Td>
          <Text fontWeight="bold">{investment.company.name}</Text>
        </Td>
        <Td>
          <Box>
            <Text>{currencyFormatter.format(investment?.amount ?? 0)}</Text>
          </Box>
        </Td>
        <Td>
          <Stack isInline spacing={4}>
            <IconButton icon={<MdEdit />} aria-label="Edit Investment" variant="unstyled" />
            <IconButton icon={<MdDelete />} aria-label="Delete Investment" variant="unstyled" />
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
        <AddInvestmentModal investorId={investorId} isOpen={showAddInvestment} onClose={closeInvestment} />
        <Box display="flex" justifyContent="space-between" my={4}>
          <Stack isInline spacing={4} alignItems="center" flex={0}>
            <IconButton aria-label="Go back" onClick={onGoBack} icon={<MdChevronLeft size={40} />} variant="unstyled" />
            <Box display="flex" width="300px" alignItems="center">
              <Avatar name={data.investor_by_pk?.name ?? ""} src={data.investor_by_pk?.photo_thumbnail ?? ""} mr={2} />
              <Box>
                <Text fontWeight="bold" fontSize="lg">
                  {data.investor_by_pk?.name ?? ""}
                </Text>
                <Text fontWeight="bold">
                  {currencyFormatter.format(data.investor_by_pk?.investments_aggregate?.aggregate?.sum?.amount ?? 0)}
                </Text>
              </Box>
            </Box>
          </Stack>
          <Stack isInline spacing={4}>
            <Button variant="unstyled" onClick={onEditInvestor}>
              <Icon as={MdEdit} mr={2} />
              Edit Name
            </Button>
            <Button variant="unstyled" onClick={onRemoveInvestor}>
              <Icon as={MdDelete} mr={2} />
              Remove Investor
            </Button>
          </Stack>
        </Box>
        <Box pl={14}>
          <Box display="flex" alignItems="center">
            <Text fontWeight="bold">Investments</Text>
            <Button onClick={onAddInvestment} colorScheme="blue" variant="ghost">
              <Icon as={MdAdd} />
              Add Investment
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
              <Tbody>{data.investor_by_pk?.investments.map(renderInvestment)}</Tbody>
            </Table>
          </Box>
        </Box>
      </Box>
    );
  }
  return null;
}

import { useState } from "react";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  FormControl,
  NumberInput,
  NumberInputField,
  useToast,
  Stack,
  Box,
  Button,
} from "@chakra-ui/react";

import Loader from "../../components/loader";
import { useCreateInvestmentMutation } from "../../generated/graphql";
import CompanySelector from "../../common/company-selector/company-selector";
import { currencyFormatter, currencyParser } from "../../util/formatter";

interface Props {
  investorId: number;
  isOpen: boolean;
  onClose: (refetch?: boolean) => void;
}

export function AddInvestmentModal(props: Props) {
  const { onClose, isOpen, investorId } = props;
  const [companyId, setCompanyId] = useState<number | null>();
  const [amount, setAmount] = useState<number>();
  const toast = useToast();
  const [createInvestment, { loading }] = useCreateInvestmentMutation();

  async function onAdd() {
    const response = await createInvestment({
      variables: {
        input: {
          amount,
          company_id: companyId,
          investor_id: investorId,
        },
      },
    });

    if (response.data?.insert_investment_one?.investor.id) {
      onClose(true);
      toast({
        title: "Success",
        description: "Investment added successfully!",
      });
    }
  }

  function onCompanySelected(companyId?: number | null) {
    setCompanyId(companyId);
  }

  function onAmountChange(value: string) {
    if (!!value) {
      setAmount(parseInt(currencyParser(value), 10));
    } else {
      setAmount(0);
    }
  }

  return (
    <Modal onClose={onClose} isOpen={isOpen} size="md">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Investment</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {loading && <Loader type="content" />}
          {!loading && (
            <Stack spacing={4}>
              <FormControl>
                <CompanySelector onCompanySelected={onCompanySelected} selectedCompanyId={companyId} />
              </FormControl>
              <FormControl>
                <NumberInput onChange={onAmountChange} value={currencyFormatter.format(amount ?? 0)}>
                  <NumberInputField />
                </NumberInput>
              </FormControl>
              <Box mt={4} display="flex" justifyContent="flex-end">
                <Button onClick={onClose.bind(null, false)} mr={4} variant="ghost" color="brand.400">
                  Cancel
                </Button>
                <Button onClick={onAdd} variant="solid" bg="brand.400" color="white">
                  Add Investment
                </Button>
              </Box>
            </Stack>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

import { Button, Text, Box, Select, Icon, Stack } from "@chakra-ui/react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface Props {
  totalCount: number;
  offset: number;
  limit: number;
  onPreviousPage: () => void;
  onNextPage: () => void;
  onNumberOfRowChange: (row: number) => void;
}

export default function TablePagination(props: Props) {
  const { totalCount, offset, limit, onPreviousPage, onNextPage, onNumberOfRowChange } = props;

  if (totalCount === 0) {
    return null;
  }

  const isPaginationRequired = totalCount > limit;

  function onRowChange(event: React.ChangeEvent<HTMLSelectElement>) {
    onNumberOfRowChange(parseInt(event.target.value, 10));
  }

  if (!isPaginationRequired) {
    return (
      <Box display="flex" justifyContent="flex-end" alignItems="center">
        <Box display="flex">
          <Text fontWeight="bold" mr={2}>
            Rows per page
          </Text>
          <Select onChange={onRowChange}>
            <option value={6}>6</option>
            <option value={10}>10</option>
          </Select>
        </Box>
        <Text>
          <strong>{totalCount}</strong> total item
          {totalCount > 1 ? "s" : ""}
        </Text>
      </Box>
    );
  }

  return (
    <Box display="flex" justifyContent="flex-end">
      <Stack isInline spacing={4} alignItems="center" width="250px" mr={4}>
        <Text fontWeight="bold" mr={2} width="100%">
          Rows per page
        </Text>
        <Select onChange={onRowChange} variant="unstyled" value={limit}>
          <option value={6}>6</option>
          <option value={10}>10</option>
        </Select>
      </Stack>
      <Stack isInline spacing={4} alignItems="center">
        <Text>
          {offset + 1} - {Math.min(offset + limit, totalCount)} of {totalCount}
        </Text>
        <Button
          variant="ghost"
          aria-label="Previous page"
          marginRight={1}
          isDisabled={offset === 0}
          onClick={() => {
            onPreviousPage();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <Icon as={FaChevronLeft} />
        </Button>
        <Button
          variant="ghost"
          aria-label="Next page"
          marginRight={2}
          isDisabled={totalCount < offset + limit + 1}
          onClick={() => {
            onNextPage();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <Icon as={FaChevronRight} />
        </Button>
      </Stack>
    </Box>
  );
}

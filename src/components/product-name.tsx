import { Stack, Heading } from "@chakra-ui/react";

export default function ProductName() {
  return (
    <Stack isInline>
      <Heading color="brand.400" fontSize="xl" letterSpacing={4}>
        INVESTOR
      </Heading>
      <Heading ml={0} fontSize="xl" letterSpacing={4}>
        BOOK
      </Heading>
    </Stack>
  );
}

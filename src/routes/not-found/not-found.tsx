import { Box, Text, Link, Button } from "@chakra-ui/react";
import { Global } from "@emotion/react";

export default function NotFound() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems={{ xs: "flex-start", lg: "center" }}
      height="100vh"
      paddingTop={4}
    >
      <Global styles={{ body: { backgroundColor: "#63D9A7" } }} />
      <Box p={4} mt={1} width={{ xs: 350, lg: 675 }} borderRadius={4}>
        <Box marginBottom={2} textAlign="center">
          <Text as="h1" fontSize="4xl" fontWeight="bold">
            Uh oh...
          </Text>
        </Box>
        <Box textAlign="center">
          <Text>Looks like you might be lost. You have tried to reach a page that doesn&apos;t exist.</Text>
          <Box marginTop={10}>
            <Link href="/">
              <Button>Back to App</Button>
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

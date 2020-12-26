import React, { useState, useEffect } from "react";
import ContentLoader from "react-content-loader";
import { Text, Flex, Spinner } from "@chakra-ui/react";

type LoaderType = "content" | "table" | "fullView";

interface Props {
  large?: boolean;
  message?: string;
  type?: LoaderType;
}

interface FullViewLoaderProps {
  message?: string;
}

interface Style {
  opacity: number;
}

interface TableLoaderProps {
  key: number;
  style: Style;
}

function TableRow(props: TableLoaderProps) {
  const random = Math.random() * (1 - 0.7) + 0.7;
  return (
    <ContentLoader height={20} width={1060} speed={2} style={props.style}>
      <rect x="34" y="13" rx="3" ry="3" width={200 * random} height="5" />
      <rect x="300" y="13" rx="3" ry="3" width={78 * random} height="5" />
      <rect x="450" y="13" rx="3" ry="3" width={78 * random} height="5" />
      <rect x="603" y="13" rx="3" ry="3" width={78 * random} height="5" />
      <rect x="755" y="13" rx="3" ry="3" width={117 * random} height="5" />
      <rect x="938" y="13" rx="3" ry="3" width={83 * random} height="5" />
    </ContentLoader>
  );
}

function TableLoader() {
  return (
    <>
      {Array(5)
        .fill("")
        .map((e, i) => (
          <TableRow key={i} style={{ opacity: Number(2 / i + 1) }} />
        ))}
    </>
  );
}

function CardContentLoader() {
  return (
    <ContentLoader height={80} width={400} speed={2}>
      <rect x="0" y="0" rx="3" ry="3" width="250" height="3" />
      <rect x="20" y="10" rx="3" ry="3" width="220" height="3" />
      <rect x="20" y="20" rx="3" ry="3" width="170" height="3" />
      <rect x="0" y="30" rx="3" ry="3" width="250" height="3" />
      <rect x="20" y="40" rx="3" ry="3" width="200" height="3" />
      <rect x="20" y="50" rx="3" ry="3" width="80" height="3" />
    </ContentLoader>
  );
}

function FullViewLoader({ message }: FullViewLoaderProps) {
  return (
    <Flex
      position="absolute"
      width="100%"
      height="100vh"
      justifyContent="center"
      alignItems="center"
      backgroundColor="rgba(0,0,0,0.5)"
    >
      <Flex alignItems="center">
        <Spinner size="xl" />
        {message && <Text marginLeft={6}>{message}</Text>}
      </Flex>
    </Flex>
  );
}

export default function Loader(props: Props) {
  const [shouldShow, setShouldShow] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShouldShow(true);
    }, 300);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  if (!shouldShow) {
    return null;
  }

  const { large, message, type } = props;
  if (type === "table") {
    return <TableLoader />;
  }
  if (type === "content") {
    return <CardContentLoader />;
  }
  if (type === "fullView") {
    return <FullViewLoader message={message} />;
  }
  return (
    <Text fontSize={large ? "lg" : "md"}>
      <Spinner />
      {message}
    </Text>
  );
}

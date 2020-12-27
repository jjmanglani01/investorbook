import { useState } from "react";
import { InputProps } from "@chakra-ui/react";

import { AutoCompleteInput } from "../../components/autocomplete-input";
import { useCompaniesForSelectorQuery } from "../../generated/graphql";

interface Props extends InputProps {
  selectedCompanyId?: number | null;
  onCompanySelected: (companyId: number | null) => void;
  isClearable?: boolean;
}

export default function CompanySelector(props: Props) {
  const { selectedCompanyId, onCompanySelected, placeholder, isClearable, ...rest } = props;
  const [search, setSearch] = useState("");

  const { data } = useCompaniesForSelectorQuery({
    variables: {
      query: `%${search}%`,
    },
    fetchPolicy: "network-only",
  });

  const options = data?.company.map((node) => ({
    value: `${node.id}`,
    label: `${node.name}`,
  }));

  function onSearchValueChange(value: string) {
    setSearch(value);
  }

  function onSelectedValueChange(value: string | null) {
    if (!!value) {
      onCompanySelected(parseInt(value, 10));
    } else {
      onCompanySelected(null);
    }
  }

  return (
    <AutoCompleteInput
      items={options ?? []}
      onSelectedValueChanged={onSelectedValueChange}
      onInputChanged={onSearchValueChange}
      selectedValue={selectedCompanyId ? `${selectedCompanyId}` : undefined}
      placeholder={placeholder ?? "Select a Comapny"}
      isClearable={isClearable}
      size="md"
      suggestionBoxMaxHeight={200}
      {...rest}
    />
  );
}

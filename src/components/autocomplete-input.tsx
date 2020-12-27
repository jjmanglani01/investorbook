import React, { useEffect, useState } from "react";
import { InputProps, InputGroup, Input, InputRightElement, Button, Box, Text, Stack, Icon } from "@chakra-ui/react";
import { MdArrowDropDown, MdClose } from "react-icons/md";
import { useCombobox } from "downshift";

import { useMeasure } from "../util/use-measure";

interface Props extends InputProps {
  onInputChanged?: (value: string) => void;
  onSelectedValueChanged?: (value: string | null) => void;
  selectedValue?: string | null;
  items: AutoCompleteOption[];
  suggestionBoxMaxHeight?: number;
  isClearable?: boolean;
}

export interface AutoCompleteOption {
  label: string;
  value: string;
}

export function AutoCompleteInput(props: Props) {
  const {
    items,
    selectedValue,
    isClearable,
    suggestionBoxMaxHeight,
    onSelectedValueChanged,
    onInputChanged,
    ...inputProps
  } = props;
  const [isInitialized, setIsInitialized] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [inputRef, useMeasureResult] = useMeasure<HTMLDivElement>();

  const selectedItem = items.find((x) => x.value === selectedValue) ?? null;

  const {
    isOpen,
    getMenuProps,
    getItemProps,
    getToggleButtonProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    openMenu,
    closeMenu,
  } = useCombobox({
    items,
    selectedItem: selectedItem as any,
    onSelectedItemChange: (change) => {
      if (change.selectedItem) {
        onSelectedValueChanged?.(change.selectedItem.value);
        setInputValue(change.selectedItem.label);
      }
    },
    itemToString: (item: AutoCompleteOption | null) => item?.label ?? "",
  });

  // This fills in the input when the component is first loaded with a selected value
  useEffect(() => {
    if (!!selectedItem && !isInitialized) {
      setInputValue(selectedItem.label);
      setIsInitialized(true);
    }
  }, [selectedItem]);

  return (
    <>
      <Box ref={inputRef}>
        <Box {...getComboboxProps()}>
          <InputGroup>
            <Input
              {...inputProps}
              {...getInputProps()}
              value={inputValue}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setInputValue(e.target.value);
                onInputChanged?.(e.target.value);
                if (!isOpen) {
                  openMenu();
                }
              }}
              onBlur={() => {
                const matchingItem = items.find((x) => x.label === inputValue);
                if (matchingItem) {
                  onSelectedValueChanged?.(matchingItem.value);
                }
                setInputValue(selectedItem?.label ?? "");
              }}
              onFocus={() => {
                if (!isOpen) {
                  openMenu();
                }
              }}
            />
            <InputRightElement width="5rem">
              <Box width="5rem" textAlign="right" marginRight={2}>
                <Stack spacing={2} isInline justifyContent="flex-end">
                  {isClearable && !!selectedValue && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        setInputValue("");
                        onSelectedValueChanged?.(null);
                        onInputChanged?.("");
                        closeMenu();
                      }}
                    >
                      <Icon as={MdClose} />
                    </Button>
                  )}
                  <Button {...getToggleButtonProps()} size="sm" variant="ghost">
                    <Icon as={MdArrowDropDown} boxSize={6} />
                  </Button>
                </Stack>
              </Box>
            </InputRightElement>
          </InputGroup>
        </Box>
      </Box>
      <Box
        backgroundColor="white"
        border={`1px solid #E2E8F0`}
        borderRadius={4}
        marginTop={1}
        width={useMeasureResult.width}
        display={isOpen ? "block" : "none"}
        {...getMenuProps()}
        position="relative"
        zIndex={100}
        {...(suggestionBoxMaxHeight && {
          maxHeight: suggestionBoxMaxHeight,
          overflow: "auto",
        })}
      >
        {items.map((item, index) => (
          <Box
            key={`${item.value}${index}`}
            {...getItemProps({ item, index })}
            padding={2}
            transition="250ms"
            backgroundColor={highlightedIndex === index ? "#EDF2F7" : undefined}
            cursor="pointer"
          >
            <Text fontSize="md">{item.label}</Text>
          </Box>
        ))}
      </Box>
    </>
  );
}

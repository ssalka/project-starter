'use client';

import { Check, ChevronsUpDown } from 'lucide-react';
import * as React from 'react';

import { Button, type ButtonProps } from '@ssalka/ui/components/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@ssalka/ui/components/command';
import { Popover, PopoverContent, PopoverTrigger } from '@ssalka/ui/components/popover';
import { cn } from '@ssalka/ui/utils';

interface ComboboxProps<T> {
  options: T[];
  value?: T | null;
  getId: (value: T) => string;
  getValue: (value: T) => string;
  isFocused?: boolean;
  onChange?: (value: T | null) => void;
  offset?: number;
  size?: ButtonProps['size'];
  testId?: string;
}

export function Combobox<T>({
  isFocused,
  value,
  options,
  onChange,
  getId,
  getValue,
  size,
  offset = -40,
  testId,
}: ComboboxProps<T>) {
  const [open, setOpen] = React.useState(false);
  const valueId = value ? getId(value) : null;
  const valueText = value ? getValue(value) : null;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          data-testid={`combobox-button${testId ? `-${testId}` : ''}`}
          variant="outline"
          role="combobox"
          size={size}
          aria-expanded={open}
          className={cn('w-[200px] justify-between', isFocused && 'border-sky-300 bg-sky-50')}
        >
          {valueText ?? 'Select option...'}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" sideOffset={offset} data-no-drag>
        <Command>
          <CommandInput placeholder="Search..." />
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup data-testid={`combobox-options-${testId}`}>
            {options.map(option => {
              const optionKey = getId(option);
              const optionLabel = getValue(option);

              return (
                <CommandItem
                  data-testid={`combobox-option-${optionKey}`}
                  key={optionKey}
                  value={optionKey}
                  onSelect={selectedValue => {
                    onChange?.(selectedValue === valueId ? null : option);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      valueId === optionKey ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                  {optionLabel}
                </CommandItem>
              );
            })}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

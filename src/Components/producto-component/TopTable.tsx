import {Button, Input} from "@nextui-org/react";
import { FaPlus } from "react-icons/fa";
import React from "react";

type SearchInputProps = {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onOpen: () => void;
};

export const TopTable: React.FC<SearchInputProps> = ({ value, onChange, onOpen }) => {
  return (
    <div className="flex justify-between gap-3 items-end">
      <Input
        type='text'
        placeholder='Buscar...'
        value={value}
        onChange={onChange}
        aria-label="Buscar"
        classNames={{
          base: "w-full sm:max-w-[44%]",
          inputWrapper: "border-1",
        }}
      />
      <Button
        color='primary' onClick={onOpen}  endContent={<FaPlus />} size="sm"> Crear
      </Button>
    </div>
  );
}
import {Button} from "@nextui-org/react";
import {FaPlus} from "react-icons/fa";
import React from "react";

type SearchInputProps = {
  onOpen: () => void;
};
export const TopTableMovimeintos: React.FC<SearchInputProps> = ({ onOpen }) => {
  return (
    <>
      <div className="flex justify-between gap-3 items-end">
        <span>Movimientos</span>
        <Button
          color='primary' onClick={onOpen}  endContent={<FaPlus />} size="sm"> Crear
        </Button>
      </div>
    </>
  );
}
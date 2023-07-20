import React from "react";

type SelectorProps = {
  item: string;
  selectedItem: string;
  onClick: () => void;
  children?: React.ReactNode;
};

const Selector: React.FC<SelectorProps> = ({
  item,
  selectedItem,
  onClick,
  children,
}) => {
  return (
    <button
      type="button"
      className={`py-2 px-4 text-center border border-black rounded-lg ${
        selectedItem === item ? "bg-blue-500 text-white" : "bg-transparent"
      }`}
      onClick={onClick}
    >
      {children || item}
    </button>
  );
};

export default Selector;

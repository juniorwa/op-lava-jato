import React from "react";

type SelectorProps = {
  item: string;
  selectedItem: string;
  onClick: () => void;
};

const Selector: React.FC<SelectorProps> = ({ item, selectedItem, onClick }) => {
  return (
    <button
      type="button"
      className={`py-2 px-4 text-center border border-black rounded-lg ${
        selectedItem === item ? "bg-blue-500 text-white" : "bg-transparent"
      }`}
      onClick={onClick}
    >
      {item}
    </button>
  );
};

export default Selector;

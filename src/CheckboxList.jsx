import React from "react";

const CheckboxList = ({ data, checkedState, onCheckboxChange, searchQuery }) => {
  const filteredData = data.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ul className="checkbox-list">
      {filteredData.map((item) => (
        <li key={item.id}>
          <input
            type="checkbox"
            checked={!!checkedState[item.id]}
            onChange={() => onCheckboxChange(item.id)}
          />
          <label>{item.title}</label>
        </li>
      ))}
    </ul>
  );
};

export default CheckboxList;

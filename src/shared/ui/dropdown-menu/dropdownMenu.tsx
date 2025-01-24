"use client";

import React from "react";
import { typeDropdownProps } from "./types";
import cn from "classnames";
import classes from "./styles.module.scss";

export const DropdownMenu: React.FC<typeDropdownProps> = (props) => {
  const { variant, dataList, setValue, value } = props;

  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedValues, setSelectedValues] = React.useState<string[]>([]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Tab") {
      setIsOpen(true);
    }
  };

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    label: string,
  ) => {
    event.stopPropagation();
    setSelectedValues((prevSelected) => {
      if (prevSelected.includes(label)) {
        return prevSelected.filter((item) => item !== label);
      } else {
        return [...prevSelected, label];
      }
    });
  };

  React.useEffect(() => {
    setValue(selectedValues.join(", "));
  }, [selectedValues, setValue]);

  return (
    <div
      className={cn(classes.selectbox, classes[variant], {
        [classes.enabled]: isOpen,
      })}
      onClick={toggleDropdown}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <button className={cn(classes[variant], classes.button)}>
        <p className="small">{value || "Select options"}</p>
      </button>
      <div
        className={cn(classes.options, classes[variant], {
          [classes.enabled]: isOpen,
        })}
      >
        {dataList.map((option, index) => (
          <label
            key={index}
            className={cn(classes.option, classes[variant])}
            onClick={(event) => event.stopPropagation()}
          >
            <input
              type="checkbox"
              checked={selectedValues.includes(option.label)}
              onChange={(event) => handleCheckboxChange(event, option.label)}
            />
            <p className="small">{option.label}</p>
          </label>
        ))}
      </div>
    </div>
  );
};

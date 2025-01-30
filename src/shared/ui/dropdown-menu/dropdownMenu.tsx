"use client";

import React from "react";
import { typeDropdownProps } from "./types";
import cn from "classnames";
import classes from "./styles.module.scss";
import { useMediaQuery } from "../../lib/useMediaQuery";

export const DropdownMenu: React.FC<typeDropdownProps> = (props) => {
  const { variant, dataList, setValue, title } = props;

  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedValues, setSelectedValues] = React.useState<string[]>([]);
  const dropdownRef = React.useRef<HTMLInputElement>(null);

  const isMobile = useMediaQuery("(max-width: 675px)");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Tab") {
      setIsOpen(false);
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setIsOpen(!isOpen);
    } else if (event.key === "Escape") {
      setIsOpen(false);
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

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  React.useEffect(() => {
    setValue(selectedValues);
  }, [selectedValues, setValue]);

  return (
    <div
      className={cn(classes.selectbox, classes[variant], {
        [classes.enabled]: isOpen,
      })}
      onClick={toggleDropdown}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      ref={dropdownRef}
    >
      {!isMobile ? (
        <button className={cn(classes[variant], classes.button)}>
          <p className="small">{title}</p>
        </button>
      ) : (
        <h3>{title}</h3>
      )}
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
              className={cn(
                classes.inputItem,
                option.color && classes[option.color],
              )}
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

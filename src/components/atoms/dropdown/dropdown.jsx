import React, { useRef, useEffect } from "react";
import { DropdownContainer } from "./styles";

const Dropdown = ({ showDropdown, setShowDropdown, children }) => {
  const dropdownRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef, setShowDropdown]);

  if (showDropdown) {
    return <DropdownContainer ref={dropdownRef}>{children}</DropdownContainer>;
  }

  return null;
};

export default Dropdown;

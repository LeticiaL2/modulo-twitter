import React, { useEffect, useRef } from 'react';
import { Container } from './styles';

const DropdownMenu = ({ showDropdown, setShowDropdown, children }) => {
  const dropdownRef = useRef();

  useEffect(() => {
    let handler = (e) => {
      if (dropdownRef.current !== e.target) {
        setShowDropdown(false)
      }
    }
    document.addEventListener("click", handler);

    return () => {
      document.removeEventListener("click", handler);
    };
  }, [setShowDropdown])

  if (showDropdown) {
    return (
      <Container ref={dropdownRef}>
        {children}
      </Container>
    )
  }

  return null
}

export default DropdownMenu
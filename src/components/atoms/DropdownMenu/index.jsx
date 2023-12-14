import React, { useRef } from 'react';
import { Container } from './styles';

const DropdownMenu = ({ showDropdown, setShowDropdown, children }) => {
  const dropdownRef = useRef();

  function closeDropdown(e) {
    if (dropdownRef.current.contains(e.target)) {
      // console.log(dropdownRef.current)

      setShowDropdown(false)
    }
  }

  if (showDropdown) {
    return (
      <Container ref={dropdownRef} onClick={closeDropdown}>
        {children}
      </Container>
    )
  }

  return null
}

export default DropdownMenu
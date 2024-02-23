import React from "react";
import { useSelector } from "react-redux";
import { StyledSnackbar, StyledMessage } from "./styled";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { closeSnackbar } from "../../../redux/ducks/snackbar";

function SnackBarComponent() {
  const { open, message } = useSelector((state) => state.snackbar);
  const dispatch = useDispatch();

  useEffect(() => {
    if (open) {
      const timeout = setTimeout(() => {
        dispatch(closeSnackbar());
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [open, dispatch]);

  return (
    <StyledSnackbar open={open} message={message}>
      <StyledMessage>{message}</StyledMessage>
    </StyledSnackbar>
  );
}

export default SnackBarComponent;

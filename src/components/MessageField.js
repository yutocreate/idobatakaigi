import React from "react";
import { TextField } from "@material-ui/core";

import { pushMessage } from "../firebase";

const MessageField = ({ name, setText, text, inputEl }) => {
  return (
    <TextField
      autoFocus
      fullWidth={true}
      inputRef={inputEl}
      onChange={(e) => {
        setText(e.target.value);
      }}
      onKeyDown={(e) => {
        const text = e.target.value;
        if (text === "") return;

        if (e.key === "Enter") {
          pushMessage({ name , text });
          setText("");
          e.preventDefault();
        }
      }}
      value={text}
    />
  );
};

export default MessageField;

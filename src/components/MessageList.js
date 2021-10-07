import React, { useEffect, useState } from "react";
import { List } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { messagesRef } from "../firebase";
import MessageItem from "./MessageItem";

const useStyles = makeStyles({
  root: {
    gridRow: 1,
    width: "100%",
    overflow: "auto",
  },
});

const MessageList = () => {
  const [messages, setMessages] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    messagesRef
      .orderByKey()
      .limitToLast(30)
      .on("value", (snapshot) => {
        const messages = snapshot.val();
        if (messages === null) return;
        const entries = Object.entries(messages);
        const newMessages = entries.map((entry) => {
          const [key, nameAndText] = entry;
          return { key, ...nameAndText };
        });
        setMessages(newMessages);
      });
  }, []);

  const length = messages.length;

  return (
    <List
      className={classes.root}
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
    >
      {messages.map(({ key, name, text }, index) => {
        const isLastItem = length === index + 1;

        return (
          <MessageItem
            key={key}
            name={name}
            text={text}
            isLastItem={isLastItem}
          />
        );
      })}
    </List>
  );
};

export default MessageList;

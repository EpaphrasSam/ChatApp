"use client";

import useConversation from "@/hooks/useConversation";
import { FullMessageType } from "@/types/ConversationType";
import React, { useEffect, useRef, useState } from "react";
import MessageBox from "./MessageBox";
import axios from "axios";

type MessageBodyProps = {
  initialMessages: FullMessageType[];
};

const MessageBody = ({ initialMessages }: MessageBodyProps) => {
  const [messages, setMessages] = useState<FullMessageType[]>(initialMessages);
  const bottomRef = useRef<HTMLDivElement>(null);

  const { conversationId } = useConversation();

  useEffect(() => {
    const seen = async () => {
      await axios.post(`/api/conversations/${conversationId}/seen`, {});
    };

    seen();
  }, [conversationId]);

  return (
    <div className="flex-1 overflow-y-auto">
      {messages.map((message, i) => (
        <MessageBox
          key={message.id}
          data={message}
          isLast={i === messages.length - 1}
        />
      ))}

      <div ref={bottomRef} className="pt-24" />
    </div>
  );
};

export default MessageBody;

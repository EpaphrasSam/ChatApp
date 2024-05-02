import Header from "@/components/conversations/Header";
import MessageBody from "@/components/conversations/MessageBody";
import SendMessageForm from "@/components/conversations/SendMessageForm";
import EmptyState from "@/components/EmptyState";
import ErrorToast from "@/components/global/ErrorToast";
import { getConversationById } from "@/utils/actions/conversations.action";
import { getMessages } from "@/utils/actions/message.action";
import React from "react";

export default async function MainConversation({
  params: { id: conversationId },
}: {
  params: { id: string };
}) {
  const { conversation, error } = await getConversationById(conversationId);
  const { messages, error: errorMessages } = await getMessages(conversationId);

  if (!conversation) {
    return (
      <div className="lg:pl-80 h-full">
        {error && errorMessages && (
          <ErrorToast errors={[error, errorMessages]} />
        )}
        <div className="h-full flex flex-col">
          <EmptyState />
        </div>
      </div>
    );
  }

  return (
    <div className="lg:pl-80 h-full">
      {error && errorMessages && <ErrorToast errors={[error, errorMessages]} />}
      <div className="h-full flex flex-col">
        <Header conversation={conversation} />
        <MessageBody />
        <SendMessageForm />
      </div>
    </div>
  );
}

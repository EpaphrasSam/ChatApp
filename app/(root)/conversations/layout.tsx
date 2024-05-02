import ConversationList from "@/components/conversations/ConversationList";
import ErrorToast from "@/components/global/ErrorToast";
import { getConversations } from "@/utils/actions/conversations.action";

export default async function ConversationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { conversations, error } = await getConversations();

  return (
    <div>
      {error && <ErrorToast errors={[error]} />}
      <ConversationList initialItems={conversations} />
      {children}
    </div>
  );
}

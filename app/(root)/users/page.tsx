import EmptyState from "@/components/EmptyState";
import ErrorToast from "@/components/global/ErrorToast";
import UsersList from "@/components/users/UsersList";
import { getUsers } from "@/utils/actions/users.action";

export default async function Users() {
  const { users, error } = await getUsers();

  return (
    <div className="hidden lg:block lg:pl-80 h-full">
      {error && <ErrorToast errors={[error]} />}
      <UsersList users={users} />
      <EmptyState />
    </div>
  );
}

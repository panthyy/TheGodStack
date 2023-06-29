import { useQuery } from 'react-query';
import { trpc } from '../../utils/trpc';

export const UserList = () => {
  const { data, isLoading } = useQuery(['users.list'], () =>
    trpc.example.getUsers.query()
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {data?.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

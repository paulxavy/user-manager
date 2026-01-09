import UserList from '@/components/userList'; 
import UserFilters from '@/components/userFilter';

export default function HomePage() {
  return (
    <main>
       <UserFilters />
       <UserList />
    </main>
  );
}
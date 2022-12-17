import { useState } from 'react';
import { User } from '../Model/User';

const users: User[] = [
  { id: '', name: '[春之樱]嫣然的不知曲谱' },
  { id: '1', name: '[四季生]嫣然的不知曲谱' },
];

const useUser = () => {
  const [selectedUser, setSelectedUser] = useState(users[0]);

  const selectUserById = (id: string) => {
    setSelectedUser(users.find((user) => user.id === id) || users[0]);
  };

  return { selectedUser, users, selectUserById };
};

export default useUser;

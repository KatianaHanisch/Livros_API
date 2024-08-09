import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

interface UserProps {
  id: string;
  name: string;
  email: string;
  password: string;
}

const users: UserProps[] = [
  { id: uuidv4(), name: "teste", email: "teste@gmail.com", password: "123" },
];

const getAllUsers = () => users;

const getUserById = (id: string) => users.find((user) => user.id === id);

const getUserByEmail = (email: string) =>
  users.find((user) => user.email === email);

const createUser = (name: string, email: string, password: string) => {
  const userAlredyExists = users.find((user) => user.email === email);

  if (userAlredyExists) return null;

  const newUser = {
    id: uuidv4(),
    name,
    email,
    password: bcrypt.hashSync(password, 10),
  };

  users.push(newUser);

  return newUser;
};

export const usersModel = {
  getAllUsers,
  getUserById,
  getUserByEmail,
  createUser,
};

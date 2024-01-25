import {sort} from "fast-sort";
import Link from "next/link";
import React from "react";

type Props = {
  sortBy: string;
};

type User = {
  name: string;
  email: string;
  id: number;
};

const UserTable = async ({sortBy}: Props) => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users", {
    cache: "no-store",
  });
  const users: User[] = await res.json();

  const sortedUsers = sort(users).asc(
    sortBy === "email" ? (user) => user.email : (user) => user.name
  );

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th className="">
              <Link href="/users?sortBy=name">Name</Link>
            </th>
            <th className="bg-primary">
              <Link href="/users?sortBy=email">Email</Link>
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default UserTable;

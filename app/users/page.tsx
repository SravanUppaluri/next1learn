import React, {Suspense} from "react";
import UserTable from "./UserTable";
import Link from "next/link";
import Image from "next/image";

type Props = {
  searchParams: {
    sortBy: string;
  };
};

const UsersPage = async ({searchParams: {sortBy}}: Props) => {
  return (
    <>
      <h1>UsersPage</h1>
      <Link href="/users/new" className="btn btn-secondary">
        + New User
      </Link>
      <UserTable sortBy={sortBy} />
      <Image
        src="https://bit.ly/react-cover"
        alt="react"
        width={300}
        height={200}
      />
    </>
  );
};

export default UsersPage;

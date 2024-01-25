import {notFound} from "next/navigation";
import React from "react";

type Props = {
  params: {id: number};
};

const UserDetailPage = ({params: {id}}: Props) => {
  {
    id > 10 && notFound();
  }
  return <div>UserDetailPage {id}</div>;
};

export default UserDetailPage;

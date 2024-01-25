import React from "react";

type Props = {
  params: {
    id: number;
    photoId: number;
  };
};

const PhotoDetails = ({params: {id, photoId}}: Props) => {
  return (
    <div>
      PhotoDetails {id} {photoId}
    </div>
  );
};

export default PhotoDetails;

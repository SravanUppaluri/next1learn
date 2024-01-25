"use client";

interface CloudinaryResult {
  public_id: string;
}

import {CldUploadWidget, CldImage} from "next-cloudinary";
import React, {useState} from "react";

const UploadPage = () => {
  const [publicId, setPublicId] = useState("");
  return (
    <>
      {publicId && (
        <CldImage src={publicId} alt="my image" width={200} height={400} />
      )}
      <CldUploadWidget
        uploadPreset="prbbenhh"
        onUpload={(result, widget) => {
          if (result.event !== "success") {
            return;
          }
          const info = result.info as CloudinaryResult;
          setPublicId(info.public_id);
        }}
      >
        {({open}) => {
          return <button onClick={() => open()}>Upload an Image</button>;
        }}
      </CldUploadWidget>
    </>
  );
};

export default UploadPage;

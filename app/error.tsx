"use client";
import React from "react";

interface Props {
  error: Error;
  reset: () => void;
}

const ErrorPage = ({error, reset}: Props) => {
  return (
    <>
      <div>ErrorPage: {error.message}</div>
      <button
        onClick={() => {
          reset();
        }}
        className="btn btn-primary"
      >
        reset
      </button>
    </>
  );
};

export default ErrorPage;

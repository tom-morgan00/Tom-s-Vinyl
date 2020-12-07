import React from 'react';

export default function ErrorMessage({ message }) {
  return (
    <div className="mx-auto mt-4 alert alert-danger" width="60%" role="alert">
      {message}
    </div>
  );
}

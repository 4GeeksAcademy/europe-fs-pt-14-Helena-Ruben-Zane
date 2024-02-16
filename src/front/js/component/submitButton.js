import React, { useState, useContext } from "react";
export const SubmitButton = () => {



  return (
    <button
      type="button"
      className="user-location-button btn btn-success btn-sm"
      onClick={() => {
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }}
    >
      Submit
    </button>
  );

}; 
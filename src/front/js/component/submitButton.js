import React, { useState, useContext } from "react";
export const SubmitButton = () => {

   

    return (
        <button
  type="button"
  className="btn btn-success btn-sm"
  onClick={() => {
    setTimeout(() => {
      window.location.reload();
    },  1000); 
  }}
>
  Submit
</button>
    );
   
}; 
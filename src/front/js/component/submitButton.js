import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
export const SubmitButton = () => {

    const { store, actions } = useContext(Context)
    const [active, setActive] = useState(true)
    const [pending, setPending] = useState(false);
  

    const handleSubmit = async () => {

        try {

            if (store.manual_start_time && store.manual_finish_time &&  store.location && store.liters){
                actions.submit_manual_data();
                
            } 
            if  (store.start_time && store.finish_time &&  store.location && store.liters){
                actions.submitData();
            }
            
           
        } catch (error) {
            console.error("An error occurred while submitting data: ", error);
        } finally {
            setPending(false);
        }
    };

    return (
        <button type="button" className="user-location-button btn btn-success btn-sm" disabled={!active} onClick={handleSubmit}>
            SUBMIT 
        </button>
    );
   
}; 
 
import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";

export const ShowUserImpact = () => {
    const { store, actions } = useContext(Context);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const handleUserImpactData = async () => {
            console.log("handleUserImpactData");
            await actions.getUserImpact();
        }

        handleUserImpactData();
    }, []);

    const { total_time, total_liters, average_time, average_liters } = store;

    return isLoading ?
        (
            <p> Smile.. your impact is upgrading </p>
        ) : (

            <div className="text-start ms-4 me-4 mb-3">
                <h3> Sandsmile impact </h3>
                <p>Total time and liters:{total_time}, {total_liters} </p>
                <p>Average time and liters per session: {average_time}, {average_liters}</p>
            </div>
        );


}; 
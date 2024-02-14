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

    const { total_time, total_liters, total_days, average_time, average_liters } = store;
    console.log(store.total_time)

    return (
        <div className="user-total-impact-data">
            <h3 className="user-impact"> YOUR IMPACT </h3>
            <div>
                <p><strong>TOTAL</strong></p>
                <p>Time <strong> {store.total_time}</strong> & Amount of <strong>{store.total_liters}</strong>L </p>
            </div>
            <div>
                <p><strong>AVERAGE</strong></p>
                <p>Time <strong>{store.average_time}</strong> & <strong>{store.average_liters}</strong>L per session </p>
            </div>
        </div>
    );
}; 
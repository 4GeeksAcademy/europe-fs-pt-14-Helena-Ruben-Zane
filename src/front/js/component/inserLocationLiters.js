import React, { useContext } from "react";
import { Context } from "../store/appContext";

export const InsertLocationLiters = () => {

    const { store, actions } = useContext(Context)


    return (
        <div className="card container-fluid col-sm-8 col-md-8 col-lg-8 bg-body-tertiary text-center p-1">
                <form className="form-floating">
                    <input type="location" className="form-control" id="floatingInputValue" placeholder="location" value={store.location} onChange={(e) => actions.setNewLocation(e.target.value)} />
                    <label htmlFor="floatingInputValue">Location</label>
                </form>
                <form className="form-floating">
                    <input type="liters" className="form-control" id="floatingInputValue" placeholder="liters" value={store.liters} onChange={(e) => actions.setNewLiters(e.target.value)} />
                    <label htmlFor="floatingInputValue">Liters</label>
                </form>
            </div>
        );
    
};  
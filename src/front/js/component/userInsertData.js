import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";

export const UserInsertData = () => {
    const [startDateTime, setStartDateTime] = useState('');
    const [endDateTime, setEndDateTime] = useState('');
    const [newLocation, setNewLocation] = useState('');
    const [liters, setLiters] = useState('');
    const { store, actions } = useContext(Context)

    const handleSubmit = (e) => {
        e.preventDefault();

        setStartDateTime([...startDateTime, { label: startDateTime, done: false }]);
        setStartDateTime("");
        actions.start_time();

        setEndDateTime([...endDateTime, { label: endDateTime, done: false }]);
        setEndDateTime("");
        actions.finish_time();

        setNewLocation([...newLocation, { label: newLocation, done: false }]);
        setNewLocation("");
        actions.set_location();
        setLiters([...liters, { label: liters, done: false }]);
        setLiters("");
        actions.set_liters();
    };


    const handleChange = (e) => {
        if (e.key === "Enter") {
            handleSubmit(e);
        } else {
            setStartDateTime(e.target.value);
            setEndDateTime(e.target.value);
            setNewLocation(e.target.value);
            setLiters(e.target.value);
        }
    };

    const handleaDateTimeHours= (e) => {
        e.preventDefault ()
        const currentDateTime = new Date();
        setStartDateTime(currentDateTime);
        setEndDateTime(currentDateTime);
    }

    const handleLocation = (e) => {
        e.preventDefault()
        actions.set_location(newLocation)
    }

    const handleLiter = (e) => {
        e.preventDefault()
        actions.set_liters(liters)
    }


    return (
        <div className="userInsertData container-fluid">

            <div className="input-group input-group-sm mb-3 ol-sm-8">

                <input
                    type="datetime-local"
                    id="collecting_time"
                    className="form-control"
                    aria-describedby="button-addon2"
                    value={startDateTime}
                    onChange={(e) => setStartDateTime(e.target.value)}


                />


                <input
                    type="datetime-local"
                    id="complete_collecting_time"
                    className="form-control"
                    aria-describedby="button-addon2"
                    value={endDateTime}
                    onChange={(e) => setEndDateTime(e.target.value)}
                />
                <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={handleaDateTimeHours}>
                    Add
                </button>
            </div>

            <div className="input-group input-group-sm mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Location"
                    aria-label="Location"
                    aria-describedby="button-addon2"
                    onChange={(e) => setNewLocation(e.target.value)}
                />
                <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={handleLocation}>
                    Add
                </button>

            </div>

            <div className="input-group input-group-sm mb-3">

                <input
                    type="number"
                    className="form-control"
                    placeholder="Liters"
                    aria-label="Liters"
                    step="0.1" min="0"
                    aria-describedby="button-addon2"
                    value={liters}
                    onChange={(e) => setLiters(e.target.value)}
                />
                <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={handleLiter}>
                    Add
                </button>
            </div>

        </div>
    )
}; 

import React from "react";

const Counter = (props) => {

    return (

        <div className="card container-fluid col-sm-8 col-md-8 col-lg-8 bg-body-tertiary text-center p-1">
            <div className="card-header">
            </div>
            <div className="card-body d-flex flex-row justify-content-center bg-info bg-opacity-25 fs-1 text-light" style={{ height: "8rem" }}>
                <div className="Watcher col-sm-1 col-md-1 col-lg-1 bg-dark rounded border border-info-subtle position-relative py-3 px-6 ">
                    <i className="fa-brands fa-watchman-monitoring fa-spin" style={{ color: "#4cddbf4" }}></i>
                </div>
                <div className="digitThree col-sm-1 col-md-1 col-lg-1 bg-dark rounded border border-info-subtle position-relative py-3 px-3 ">{props.digitThree}</div>
                <div className="digitTwo col-sm-1 col-md-1 col-lg-1 bg-dark rounded border border-info-subtle position-relative py-3 px-3 ">{props.digitTwo}</div>
                <div className="digitOne col-sm-1 col-md-1 col-lg-1 bg-dark rounded border border-info-subtle position-relative py-3 px-3 ">{props.digitOne}</div>
            </div>
            <div className="card-footer text-light-emphasis fw-lighter">


                <div className="buttons text-light-emphasis fw-lighter">  
                <button type="button" className="btn btn-info btn-sm me-2" onClick={start}>
                    Start </button>
                <button type="button" className="btn btn-info btn-sm me-2"onClick={pause}>
                   Pause </button>
        
                <button type="button" className="btn btn-info btn-sm me-2" onClick={submit}>
                   Completed </button>
                 </div>

            </div>
        </div>

    )
};

export default Counter;


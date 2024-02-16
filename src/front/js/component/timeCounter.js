import React, { useState, useEffect, useContext, useRef } from "react";
import { Context } from "../store/appContext";
import { SubmitButton } from "./submitButton";

export const TimeCounter = () => {
  const [timer, setTime] = useState(0)
  const [active, setActive] = useState(false)
  const [buttonText, setButtonText] = useState("Begin tracking")
  const { store, actions } = useContext(Context)
  const [pending, setPending] = useState(false)
  const clockHandRef = useRef(null);
  useEffect(() => {
    let intervalId;

    if (active) {
      intervalId = setInterval(() => {
        setTime((value) => value + 1);
      }, 1000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [timer, active, setTime]);

  const startStop = () => {
    setActive((prevActive) => !prevActive);
    setButtonText((prevText) => (prevText === "Begin tracking" ? "Stop tracking" : "Begin tracking"))
    if (!pending) actions.start_time()
    setPending(true)
  };

  const hours = Math.floor(timer / 3600);
  const minutes = Math.floor(timer % 3600 / 60);
  const seconds = timer % 60;

  return (
    <div className="time-counter-container container-fluid">
      <h4 className="time-counter-header"><strong>IMPACT TRACKER</strong></h4>
      <div className="counter-body fs-1">
        <div className="digit col-sm-1 col-md-1 col-lg-1">
          {Math.floor(hours / 10) % 10}
        </div>
        <div className="digit col-sm-1 col-md-1 col-lg-1">
          {Math.floor(hours % 10)}
        </div>
        <div className="digit col-sm-1 col-md-1 col-lg-1">
          <span ref={clockHandRef} className="clock-hand">:</span>
        </div>
        <div className="digit col-sm-1 col-md-1 col-lg-1">
          {Math.floor((minutes / 10) % 10)}
        </div>
        <div className="digit col-sm-1 col-md-1 col-lg-1">
          {Math.floor(minutes % 10)}
        </div>
        <div className="digit col-sm-1 col-md-1 col-lg-1">
          <span ref={clockHandRef} className="clock-hand">:</span>
        </div>
        <div className="digit col-sm-1 col-md-1 col-lg-1">
          {Math.floor((seconds / 10) % 10)}
        </div>
        <div className="digit col-sm-1 col-md-1 col-lg-1">
          {seconds % 10}
        </div>
      </div>
      <div className="counter-footer">
        <div className="time-counter-cta typing-animation">
          <span>Every second you spent collecting the waste, does matter...</span>
        </div>
        <button type="buttonStart" className="counter-button btn btn-info btn-sm me-2" onClick={startStop}>
          {buttonText}
        </button>
      </div>
    </div>
  );
};
import React, { useState, useEffect } from "react";

import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";

import "./firebase-config";

const SignIn = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [otpSent, setOtpSent] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            sendOtp();
          },
        },
        auth
      );
    }
  }, [otp]);

  const sendOtp = () => {
    const fullPhoneNumber = `+91${phoneNumber}`;
    console.log("Sending OTP to:", fullPhoneNumber);

    const appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(getAuth(), fullPhoneNumber, appVerifier)
      .then((result) => {
        console.log("OTP sent successfully");
        setConfirmationResult(result);
        setOtpSent(true);
      })
      .catch((error) => {
        console.error("Error during signInWithPhoneNumber", error);
        alert("Error sending OTP. Please try again.");
      });
  };

  const verifyOtp = () => {
    if (!otp) {
      alert("Please enter the OTP");
      return;
    }
    confirmationResult
      .confirm(otp)
      .then((result) => {
        const user = result.user;
        // const accessToken = user.accessToken;
        console.log("User is signed in", user);
        // setAccessToken(accessToken);
        // navigate("/");
      })
      .catch((error) => {
        console.error("Error during OTP verification", error);
        alert("Invalid OTP. Please try again.");
      });
  };

  return (
    <div className="container">
      <h1>Sign In</h1>
      <div id="recaptcha-container"></div>
      <div>
        {!otpSent ? (
          <>
            <div className={"mb-3"}>
              <label className={"form-label"} htmlFor="phone-number">
                Phone Number
              </label>
              <div style={{ display: "flex" }}>
                <input
                  type="tel"
                  id="phone-number-fixed"
                  name="phone-number-fixed"
                  value={"+91"}
                  className="form-control"
                  style={{ width: "60px" }}
                  disabled
                />
                <input
                  type="tel"
                  id="phone-number"
                  name="phone-number"
                  value={phoneNumber}
                  className="form-control"
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
            </div>
            <div className={"mb-3"}>
              <button className="btn btn-success" onClick={sendOtp}>
                Send OTP
              </button>
            </div>
          </>
        ) : (
          <>
            <div className={"mb-3"}>
              <p className={"form-label"}>OTP sent to: {phoneNumber}</p>
              <input
                type="text"
                id="otp"
                name="otp"
                value={otp}
                className="form-control"
                placeholder="OTP"
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>
            <button className="btn btn-success" onClick={verifyOtp}>
              Verify OTP
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default SignIn;

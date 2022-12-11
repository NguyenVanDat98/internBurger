import { Col, Row } from "antd";
import {
  RecaptchaVerifier,
  signInWithEmailAndPassword,
  signInWithPhoneNumber
} from "firebase/auth";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getUserEmail } from "../apiMethod/apiMethod";
import FormLogin from "../components/feature_login/FormLogin";
import FormOtp from "../components/feature_login/FormOtp";
import FormSignInByPhone from "../components/feature_login/FormSignInByPhone";
import { auth } from "../firebaseCfg";
import { setUser } from "../redux/actionUser";

function LoginPage(props) {
  const [inputEmail, setEmail] = useState("");
  const [isphone, setIsPhone] = useState(true);
  const [isOTP, setIsOTP] = useState(false);
  const [phone, setPhone] = useState("");
  const navi = useNavigate();
  const param = useLocation();
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    // login by email and password
    if (isphone) {
      try {
        const signIn = await signInWithEmailAndPassword(
          auth,
          values.email,
          values.password
        );
        signIn && navi("/internBurger/");
        await getUserEmail(values.email).then((_) => {
          dispatch(setUser(_[0]));
        });
      } catch (error) {
        console.log(error.message);
      }
    } else {
      ///login by phone number
      const phoneNumber = values.phone;
      await setUpReCaptcha();
      const appVerifier = window.recaptchaVerifier;
      signInWithPhoneNumber(auth, phoneNumber, appVerifier)
        .then((confirmationResult) => {
          // SMS sent. Prompt user to type the code from the message, then sign the
          // user in with confirmationResult.confirm(code).
          window.confirmationResult = confirmationResult;
          setIsOTP(true)
          console.log("OTP is sent");
          // ...
        })
        .catch((error) => {
          console.log(error, "uiyui");
          // Error; SMS not sent
          // ...
        });
    }
    function setUpReCaptcha() {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "normal",
          callback: (response) => {
            console.log("sent");
            onFinish();
          },
          "expired-callback": () => {
            // Response expired. Ask user to solve reCAPTCHA again.
            // ...
          },
        },
        auth
      );
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  /////////////////////////////////////////////////////
  const onSubmit = (values) => {
    let otpInput = values.otp;
    let optConfirm = window.confirmationResult;
    // console.log(codee);
    optConfirm
      .confirm(otpInput)
      .then(function (result) {
        // User signed in successfully.
        // console.log("Result" + result.verificationID);
        let user = result.user;
      })
      .catch(function (error) {
        console.log(error);
        alert("Incorrect OTP");
      });
  };
  const errSubmit = (error) => {
    console.log(error);
  };
  return (
    <Row>
      <Col
        span={8}
        xs={{ span: 20, offset: 2 }}
        md={{ span: 12, offset: 6 }}
        lg={{ span: 8, offset: 8 }}
        offset={8}
      >
        {/* {form login by email and password} */}
        {isphone ? (
          <FormLogin
            onFinish={onFinish}
            handleLoginByPhone={()=>setIsPhone(false)}
            changeEmail={(e) => {
              setEmail(e.target.value);
            }}
            onFinishFailed={onFinishFailed}
            cancel={() => {
              navi(-1);
            }}
            login={() => {
              navi({ pathname: "/internBurger/signUp", hash: param.hash });
            }}
            inputEmail={inputEmail}
          />
        ) : (
          <FormSignInByPhone
            onChange={(e) => {
              setPhone(e.target.value);
            }}
            onClick={()=>setIsPhone(true)}
            phone={phone}
          />
        )}

         {isOTP &&<FormOtp onSubmit={onSubmit} errSubmit={errSubmit} />}
      </Col>
    </Row>
  );
}

export default LoginPage;

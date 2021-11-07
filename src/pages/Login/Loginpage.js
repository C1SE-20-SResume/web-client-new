import React, { useState } from "react";
import { Link } from "react-router-dom";
import isEmpty from "validator/lib/isEmpty";
import isEmail from "validator/lib/isEmail";
import isStrongPassword from "validator/lib/isStrongPassword";
import { useCookies } from "react-cookie";

function Loginpage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationMsg, setValidationMsg] = useState("");

  const [cookies, setCookie] = useCookies(["user"]);

  const validateAll = () => {
    const msg = {};
    if (isEmpty(email)) {
      msg.email = "please input your email !";
    } else if (!isEmail(email)) {
      msg.email = " your email is incorrect !";
    }
    if (isEmpty(password)) {
      msg.password = "please input your password ";
    } else if (!isStrongPassword(password)) {
      msg.password = "Your password is incorrect !";
    }
    setValidationMsg(msg);
    if (Object.keys(msg).length > 0) return false;
    return true;
  };
  const onSubmitLogin = (event) => {
    event.preventDefault();
    const isValid = validateAll();
    if (!isValid) return;
    fetch(`${process.env.REACT_APP_API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === true) {
          setCookie("user", data.api_token);
          window.location.reload();
        } else {
          setValidationMsg(data.message);
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <div>
        <div className="back-to-home rounded d-none d-sm-block">
          <a
            href="index.html"
            className="text-white rounded d-inline-block text-center"
          >
            <i className="mdi mdi-home" />
          </a>
        </div>
        <section
          className="vh-100"
          style={{
            background:
              'url("https://via.placeholder.com/2000X1333//88929f/5a6270C/O https://placeholder.com/") center center',
          }}
        >
          <div className="home-center">
            <div className="home-desc-center">
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-lg-4 col-md-6">
                    <div className="login-page bg-white shadow rounded p-4">
                      <div className="text-center">
                        <h4 className="mb-4">Login</h4>
                      </div>
                      <form className="login-form">
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="form-group position-relative">
                              <label>
                                Your Email{" "}
                                <span className="text-danger">*</span>
                              </label>
                              <input
                                type="email"
                                className="form-control"
                                placeholder="Email"
                                name="email"
                                autoComplete="email"
                                id="email"
                                onChange={(event) =>
                                  setEmail(event.target.value)
                                }
                              />

                              <i
                                style={{ color: "red", fontSize: "10px" }}
                                id="msg-error"
                              >
                                {validationMsg.email}
                              </i>
                            </div>
                          </div>
                          <div className="col-lg-12">
                            <div className="form-group position-relative">
                              <label>
                                Password <span className="text-danger">*</span>
                              </label>
                              <input
                                type="password"
                                id="password"
                                className="form-control"
                                placeholder="Password"
                                autoComplete="current-password"
                                onChange={(event) =>
                                  setPassword(event.target.value)
                                }
                              />
                              <i
                                style={{ color: "red", fontSize: "10px" }}
                                id="msg-error"
                              >
                                {validationMsg.password}
                              </i>
                            </div>
                          </div>
                          <div className="col-lg-12">
                            <p className="float-right forgot-pass">
                              <a
                                href="recovery_passward.html"
                                className="text-dark font-weight-bold"
                              >
                                Forgot password ?
                              </a>
                            </p>
                            <div className="form-group">
                              <div className="custom-control m-0 custom-checkbox">
                                <input
                                  type="checkbox"
                                  className="custom-control-input"
                                  id="customCheck1"
                                />
                                <label
                                  className="custom-control-label"
                                  htmlFor="customCheck1"
                                >
                                  Remember me
                                </label>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-12 mb-0">
                            <button
                              type="submit"
                              onClick={onSubmitLogin}
                              className="btn btn-primary w-100"
                            >
                              Sign in
                            </button>
                          </div>
                          <div className="col-lg-12 mt-4 text-center">
                            <h6>Or Login With</h6>
                            <ul className="list-unstyled social-icon mb-0 mt-3">
                              <li className="list-inline-item">
                                <a
                                  href="javascript:void(0)"
                                  className="rounded"
                                >
                                  <i
                                    className="mdi mdi-facebook"
                                    title="Facebook"
                                  />
                                </a>
                              </li>
                              <li className="list-inline-item">
                                <a
                                  href="javascript:void(0)"
                                  className="rounded"
                                >
                                  <i
                                    className="mdi mdi-google-plus"
                                    title="Google"
                                  />
                                </a>
                              </li>
                              <li className="list-inline-item">
                                <a
                                  href="javascript:void(0)"
                                  className="rounded"
                                >
                                  <i
                                    className="mdi mdi-github-circle"
                                    title="Github"
                                  />
                                </a>
                              </li>
                            </ul>
                          </div>
                          <div className="col-12 text-center">
                            <p className="mb-0 mt-3">
                              <small className="text-dark mr-2">
                                Don't have an account ?
                              </small>{" "}
                              <Link
                                to="/SignUp"
                                className="text-dark font-weight-bold"
                              >
                                Sign Up
                              </Link>
                            </p>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Loginpage;

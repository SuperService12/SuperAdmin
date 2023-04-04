import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/LoadingError/Loading";
import Toast from "../components/LoadingError/Toast";
import { register } from "../Redux/Actions/userActions";
import Message from "../components/LoadingError/Error";
import { Link } from "react-router-dom";
import * as filestack from "filestack-js";

const Register = ({ history }) => {
  window.scrollTo(0, 0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [password, setPassword] = useState("");
  const [password1, setPassword1] = useState("");
  const [errorP, seterrorP] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo } = userLogin;

  const client = filestack.init("Ax90XusSQLu9eIdeZ88ISz");

  useEffect(() => {
    if (userInfo) {
      history.push("/");
    }
  }, [userInfo, history]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== password1) return seterrorP(true);
    dispatch({ type: "USER_LOGIN_REQUEST" });
    client
      .upload(image)
      .then((data) => {
        dispatch(register({ name, email, password, image: data.url }));
      })
      .catch(() => {
        dispatch({
          type: "USER_LOGIN_FAIL",
        });
      });
  };
  return (
    <>
      <Toast />
      <div
        className="card shadow mx-auto"
        style={{ maxWidth: "380px", marginTop: "100px" }}
      >
        <div className="card-body">
          {error && <Message variant="alert-danger">{error}</Message>}
          {errorP && (
            <Message variant="alert-danger">Password Does't Match</Message>
          )}
          {loading && <Loading />}
          <h4 className="card-title mb-4 text-center">
            Sign Up as Professional
          </h4>
          <form onSubmit={submitHandler}>
            <div className="mb-3">
              <input
                className="form-control"
                placeholder="Name"
                type="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                className="form-control"
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                className="form-control"
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                className="form-control"
                placeholder="Confirm Password"
                type="password"
                value={password1}
                onChange={(e) => setPassword1(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Upload Certificate</label>
              <input
                className="form-control"
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
                required
              />
            </div>
            <div className="mb-4">
              <button type="submit" className="btn btn-primary w-100">
                Register
              </button>
            </div>
            <p className="text-center">
              <Link
                to={"/login"}
                style={{
                  fontSize: ".9rem",
                  color: "#7a7a7a",
                  textDecoration: "none",
                  textAlign: "center",
                }}
              >
                I Have Account <strong>Login</strong>
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;

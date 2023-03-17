import React from "react";
import { useState, useEffect } from "react";
import { Form, message } from "antd";
import Input from "antd/lib/input/Input";
import { Link, useNavigate } from "react-router-dom";
import "../style/authentication.css";
import axios from "axios";
import Spinner from "../components/Spinner";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(true);
  const onFinish = async (values) => {
    try {
      setLoading(true);
      await axios.post(
        "https://todomaster-app.onrender.com/api/users/register",
        values
      );
      message.success("Registration Successfull");
      navigate("/login");
      setLoading(false);
    } catch (error) {
      message.error("Something went wrong");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("todomaster-user_info")) {
      navigate("/");
    }
  }, []);

  return (
    <>
      <div className="auth">
        {loading && <Spinner />}
        <div className="row justify-content-center align-items-center w-100 h-100">
          <div className="col-md-5">
            <div className="lottie">
              <lottie-player
                src="https://assets8.lottiefiles.com/packages/lf20_mf5j5kua.json"
                background="transparent"
                speed="1"
                loop
                autoplay
              ></lottie-player>
            </div>
          </div>
          <div className="col-md-4">
            <Form layout="vertical" onFinish={onFinish}>
              <h1>TodoMaster - Register</h1>
              <Form.Item label="Name" name="name">
                <Input type="text" />
              </Form.Item>
              <Form.Item label="Email" name="email">
                <Input type="email" />
              </Form.Item>
              <Form.Item label="Password" name="password">
                <Input type="password" />
              </Form.Item>
              <div className="d-flex justify-content-between align-items-center">
                <Link to="/login">
                  Already Registered , Click Here To Login
                </Link>
                <button className="secondary" type="submit">
                  REGISTER
                </button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;

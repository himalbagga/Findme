import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

const Login = () => {
  const form = useRef();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    // Username validation
    if (!formData.username) {
      newErrors.username = "Username is required";
    }

    // Password validation
    if (!formData.password) {
        newErrors.password = "Password is required";
      } else if (formData.password.length < 6) {
        newErrors.password = "Password must be at least 6 characters";
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };

      return (
        <div>

            <h1>Login</h1>

            <form action="POST">
                <input type="text" onChange={(e)=>{}} name=""></input>
            </form>

            <h1>
                We are working on it
            </h1>

        </div>
      )
    }
    
    export default Login
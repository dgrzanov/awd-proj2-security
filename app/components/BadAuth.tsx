import { Checkbox } from "@mui/joy";
import axios from "axios";
import React, { useState } from "react";

type FormDataType = {
  username: string;
  password: string;
};

const BadAuth = () => {
  const [unsafe, setUnsafe] = useState(false);
  const [formData, setFormData] = useState<FormDataType>({
    username: "",
    password: "",
  });
  const [message, setMessage] = useState<string | undefined>(undefined);
  const [error, setError] = useState(false);
  const [counter, setCounter] = useState(0);

  const handleChange = (
    evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = evt.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (evt: React.FormEvent) => {
    evt.preventDefault();

    axios
      .post(unsafe ? "api/login/unsafe" : "api/login/safe", formData)
      .then((res) => {
        console.log("res: ", res);
        const { data } = res;
        if (data.success === false) {
          setCounter(counter + 1);
          setError(true);
        } else {
          setError(false);
        }
        setMessage(data.message);
      });
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl">Losa autentifikacija</h2>
      <p>Tu imamo primjer Lose autentifikacije.</p>
      <Checkbox
        onChange={(evt) => {
          setUnsafe(evt.target.checked);
        }}
        label="Ukljuci ranjivost"
        sx={{ color: "white" }}
      />
      <hr />
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <div className="flex justify-start gap-3">
          <label className="w-20">Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="bg-slate-600"
          />
        </div>
        <div className="flex justify-start gap-3">
          <label className="w-20">Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="bg-slate-600"
          />
        </div>
        <button type="submit" className="border hover:bg-slate-500">
          Login
        </button>
        {error && message ? <p className="text-red-600">{message}</p> : null}
        {!error && message ? <p className="">{message}</p> : null}
      </form>
    </div>
  );
};

export default BadAuth;

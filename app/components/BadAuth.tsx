import { Checkbox } from "@mui/joy";
import axios from "axios";
import React, { useState } from "react";

const BadAuth = () => {
  const [safe, setSafe] = useState(false);
  const [formData, setFormData] = useState<UserFormDataType>({
    username: "",
    password: "",
  });

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

    axios.post(safe ? "api/find-user/safe" : "api/find-user/unsafe", formData);
  };

  return (
    <div>
      <h2>Bad Auth</h2>
      <p>Tu imamo primjer Lose autentifikacije.</p>
      <Checkbox
        onChange={(evt) => {
          setSafe(evt.target.checked);
        }}
        label="Ukljuci ranjivost"
        sx={{ color: "white" }}
      />
      <hr />
      <form
        onSubmit={handleSubmit}
        method="POST"
        action={"api/competition/generate"}
        className="flex flex-col gap-5"
      >
        <div className="flex justify-between gap-3">
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="bg-slate-600"
          />
        </div>
        <div className="flex justify-between gap-3">
          <label>Password:</label>
          <input
            name="competitorList"
            type="password"
            value={formData.password}
            onChange={handleChange}
            className="bg-slate-600"
          />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default BadAuth;

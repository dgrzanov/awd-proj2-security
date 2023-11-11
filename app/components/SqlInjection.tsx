import { Checkbox } from "@mui/joy";
import axios from "axios";
import React, { useEffect, useState } from "react";

type FormDataType = {
  username: string;
};

type ResponseDataType = {
  username: string;
  first_name: string;
  last_name: string;
};

const SqlInjection = () => {
  const [unsafe, setUnsafe] = useState(false);
  const [formData, setFormData] = useState<FormDataType>({
    username: "",
  });
  const [responseData, setResponseData] = useState([]);

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
      .post(unsafe ? "api/find-user/unsafe" : "api/find-user/safe", formData)
      .then((res) => {
        console.log("res: ", res.data);
        setResponseData(res.data);
      });
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl">SQL injekcija</h2>
      <p>
        Tu imamo primjer SQL injekcije. Ako ukljucimo ranjivost i u polje
        "Username" napisemo <i>john_doe' or ''='</i> napravili smo SQL injekciju
        tautologijom. Medutim, ako ugasimo ranjivost, tekst iz polja ce se
        provjeriti te nece proci provjeru.
      </p>
      <Checkbox
        onChange={(evt) => {
          setUnsafe(evt.target.checked);
        }}
        label="Ukljuci ranjivost"
        sx={{ color: "white" }}
      />
      <hr />
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
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
        <button type="submit" className="border hover:bg-slate-500">
          Find
        </button>
      </form>
      <h2 className="text-xl">Output:</h2>
      {responseData.map((x: ResponseDataType) => (
        <p key={x.username}>{JSON.stringify(x)}</p>
      ))}
    </div>
  );
};

export default SqlInjection;

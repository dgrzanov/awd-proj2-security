import { Checkbox } from "@mui/joy";
import axios from "axios";
import React, { useState } from "react";
import LoginForm from "./LoginForm";

export type FormDataType = {
  username: string;
  password: string;
};

const BadAuth = () => {
  const [unsafe, setUnsafe] = useState(false);
  const [formData, setFormData] = useState<FormDataType>({
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

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl">Losa autentifikacija</h2>
      <p>
        Tu imamo primjer Lose autentifikacije. Kad je ranjivost iskljucena,
        aplikacija kaze tocno je li krivo korisnicko ime ili lozinka. Nema
        ogranicenja za krive pokusaje. Kad je ranjivost iskljucena aplikacija
        nakon 3 kriva pokusaja blokira unos na 30 sekundi.
      </p>
      <Checkbox
        onChange={(evt) => {
          setUnsafe(evt.target.checked);
        }}
        label="Ukljuci ranjivost"
        sx={{ color: "white" }}
      />
      <hr />
      <LoginForm
        formData={formData}
        unsafe={unsafe}
        handleChange={handleChange}
      />
    </div>
  );
};

export default BadAuth;

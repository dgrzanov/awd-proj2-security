import {
  Accordion,
  AccordionDetails,
  AccordionGroup,
  AccordionSummary,
  Checkbox,
  accordionClasses,
} from "@mui/joy";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { CodeBlock, CopyBlock, dracula } from "react-code-blocks";

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
        Tu imamo primjer SQL injekcije. Klikom na checkbox ukljucujemo i
        iskljucujemo ranjivost. Dolje imamo primjere napada koje mozemo
        isprobati.
      </p>
      <AccordionGroup
        sx={{
          [`& .${accordionClasses.root}`]: {
            '& button:not([aria-expanded="true"])': {
              color: "white",
            },
            "& button:hover": {
              background: "transparent",
            },
          },
          [`& .${accordionClasses.root}.${accordionClasses.expanded}`]: {
            bgcolor: "background.level1",
            borderRadius: "md",
            borderBottom: "1px solid",
            borderColor: "background.level2",
          },
          '& [aria-expanded="true"]': {
            boxShadow: (theme) =>
              `inset 0 -1px 0 ${theme.vars.palette.divider}`,
          },
        }}
      >
        <Accordion>
          <AccordionSummary sx={{ color: "white" }}>
            Tautologija
          </AccordionSummary>
          <AccordionDetails>
            Ako ukljucimo ranjivost i u polje "Username" napisemo
            <CopyBlock
              theme={dracula}
              // @ts-ignore
              text={"john_doe' or ''='"}
              showLineNumbers={false}
              codeBlock
            />
            napravili smo SQL injekciju tautologijom. Medutim, ako ugasimo
            ranjivost, tekst iz polja ce se provjeriti te nece proci provjeru.
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary sx={{ color: "white" }}>
            Union upiti
          </AccordionSummary>
          <AccordionDetails>
            <p>
              Ako ukljucimo ranjivost i u polje "Username" napisemo jedan od
              sljedecih odsjecaka koda
            </p>
            <CopyBlock
              theme={dracula}
              // @ts-ignore
              text={`' or 0=0 union select null, version(), null; --`}
              showLineNumbers={false}
              codeBlock
            />
            <CopyBlock
              theme={dracula}
              // @ts-ignore
              text={`' or 0=0 union select null, table_name, null from information_schema.tables; -- `}
              showLineNumbers={false}
              codeBlock
            />
            <p>
              napravili smo SQL injekciju UNION upitom. Na taj nacin mozemo doci
              do informacija koje nam ne bi trebale biti dostupne. Medutim, ako
              ugasimo ranjivost, tekst iz polja ce se provjeriti te nece proci
              provjeru.
            </p>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary sx={{ color: "white" }}>
            Ulancani upiti
          </AccordionSummary>
          <AccordionDetails>
            Ako ukljucimo ranjivost i u polje "Username" napisemo
            <CopyBlock
              theme={dracula}
              // @ts-ignore
              text={
                "john_doe'; insert into proj2.users_unsafe(username) values ('ubaceno_injekcijom'); --"
              }
              showLineNumbers={false}
              codeBlock
            />
            napravili smo SQL injekciju ulancanim upitom. Ubacili smo podatak u
            tablicu proj2.user_unsafe. Na ovaj nacin mozemo izvrsiti bilo koju
            SQL naredbu u bazi. Medutim, ako ugasimo ranjivost, tekst iz polja
            ce se provjeriti te nece proci provjeru.
          </AccordionDetails>
        </Accordion>
      </AccordionGroup>

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

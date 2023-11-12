import axios from "axios";
import React, { FC, useEffect, useState } from "react";
import { FormDataType } from "./BadAuth";
import { CircularProgress } from "@mui/joy";

type LoginFormProps = {
  unsafe: boolean;
  handleChange: (
    evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  formData: FormDataType;
};

const TIMEOUT_LEN = 30000;

const LoginForm: FC<LoginFormProps> = (props) => {
  const [counter, setCounter] = useState(0);
  const [message, setMessage] = useState<string | undefined>(undefined);
  const [error, setError] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [timer, setTimer] = useState<NodeJS.Timeout | undefined>(undefined);
  const [timeoutVar, setTimeoutVar] = useState<NodeJS.Timeout | undefined>(
    undefined
  );

  const { unsafe, handleChange, formData } = props;

  useEffect(() => {
    if (counter >= 3 && !unsafe) {
      setBlocked(true);

      const timeout = setTimeout(() => {
        resetStates();
      }, TIMEOUT_LEN);
      setTimeoutVar(timeout);

      const interval = setInterval(() => {
        setCountdown((prevProgress) =>
          prevProgress >= 100 ? 0 : prevProgress + 1
        );
      }, TIMEOUT_LEN / 100);
      setTimer(interval);
    }
  }, [counter]);

  useEffect(() => {
    resetStates();
  }, [unsafe]);

  const resetStates = () => {
    clearInterval(timer);
    clearTimeout(timeoutVar);
    setBlocked(false);
    setCounter(0);
    setError(false);
    setMessage(undefined);
    setCountdown(0);
    setTimer(undefined);
    setTimeoutVar(undefined);
  };

  const handleSubmit = (evt: React.FormEvent) => {
    evt.preventDefault();
    axios
      .post(unsafe ? "api/login/unsafe" : "api/login/safe", formData)
      .then((res) => {
        console.log("res: ", res);
        const { data } = res;
        if (data.success === false) {
          !unsafe ? setCounter(counter + 1) : null;
          setError(true);
        } else {
          setError(false);
        }
        setMessage(data.message);
      });
  };
  if (blocked) {
    return (
      <div className="flex flex-col justify-center items-center gap-3">
        <p className="text-xl">
          Premasen broj pokusaja. Molimo pricekajte 30 sekundi.
        </p>
        <CircularProgress
          size="lg"
          sx={{ "--CircularProgress-progressColor": "#ffffff" }}
          variant="plain"
          determinate
          value={countdown}
        >
          <a className="text-white">
            {30 - Math.floor(30 * (countdown / 100))} s
          </a>
        </CircularProgress>
      </div>
    );
  }
  return (
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
      {error && message ? (
        <p className="text-red-600">
          {message}
          {!unsafe ? ` Preostali broj pokusaja: ${counter}/3` : null}
        </p>
      ) : null}
      {!error && message ? <p className="">{message}</p> : null}
    </form>
  );
};

export default LoginForm;

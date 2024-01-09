"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { usernameAtom } from "../../../state/atoms";
import { useAtom, atom } from "jotai";

const passwordAtom = atom<string>('');
const confPasswordAtom = atom<string>('');

const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  /*
  if (!setup.username) {
    alert("Please provide a username");
  } else {
    router.push(`/game/${setup.username}`);
  }
  */
};

export default function Register() {
  const router = useRouter();
  const [username, setUserName] = useAtom(usernameAtom);
  const [password, setPassword] = useAtom(passwordAtom);
  const [confPassword, setConfPassword] = useAtom(confPasswordAtom);

  return (
    <section className="mydiv">
      <div className=" flex flex-col gap-5 items-center">
        <h3>Register</h3>
        <form className=" flex flex-col gap-5 items-center"
          onSubmit={handleFormSubmit}
        >
          <label htmlFor="username" hidden>
            Username
          </label>
          <input
            className="input"
            type="text"
            value={username || ""}
            onChange={(e) => setUserName(e.currentTarget.value )}
            name="username"
            id="username"
            placeholder="username"
          />
          <input
            className="input"
            type="text"
            value={password || ""}
            onChange={(e) => setPassword(e.currentTarget.value)}
            name="password"
            id="password"
            placeholder="password"
          />
          <input
            className="input"
            type="text"
            value={confPassword || ""}
            onChange={(e) => setConfPassword(e.currentTarget.value)}
            name="confpassword"
            id="confpassword"
            placeholder="confirm password"
          />

          <button className="btn btn-wide">register</button>
        </form>
        <button
          className="link"
          onClick={() => {
            router.push("/");
          }}
        >
          or login now
        </button>
      </div>
    </section>
  )
}

"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { userAtom } from "../../../state/atoms";
import { useAtom, atom } from "jotai";

//const passwordAtom = atom<string>('');
const confPasswordAtom = atom<string | null>(null);

export default function Register() {
  const router = useRouter();
  //const [username, setUserName] = useAtom(userAtom);
  //const [password, setPassword] = useAtom(passwordAtom);
  const [user, setUser] = useAtom(userAtom);
  const [confPassword, setConfPassword] = useAtom(confPasswordAtom);

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!user.name) {
      alert("Please provide a username!");
    }
    else if (!user.password) {
      alert("Please provide a password!");
      /*
      return (
        <div role='alert' className="alert alert-error h-min text-center rounded-md">
          <span>😎</span>
          <span> All pairs found!</span>
        </div>
      )
      */
    }
    else if (!confPassword) {
      alert("Please confirm your password!");
    }
    else if (user.password !== confPassword) {
      alert("Passwords do not match!");
    }
    else {
      router.push('/');
    }
  };

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
            value={user.name || ""}
            onChange={(e) => setUser({ name: e.currentTarget.value, password: user.password })}
            name="username"
            id="username"
            placeholder="username"
          />
          <input
            className="input"
            type="password" // password is hidden
            minLength={8}
            value={user.password || ""}
            onChange={(e) => setUser({ name: user.name, password: e.currentTarget.value })}
            name="password"
            id="password"
            placeholder="password"
          />
          <input
            className="input"
            type="password" // password is hidden          
            value={confPassword || ""}
            onChange={(e) => setConfPassword(e.currentTarget.value)}
            name="confpassword"
            id="confpassword"
            placeholder="confirm password"
          />
          {/*}
  TODO: add register functionality
{*/}
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

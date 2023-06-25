import React, { useState } from "react";
import Input from "../../components";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";

export default function Form({ isSignPage = false }) {
  const [formData, setFormData] = useState({
    ...(!isSignPage && {
      name: "",
    }),

    email: "",
    password: "",
  });

  const navigate = useNavigate();

  return (
    <div className="bg-white w-[600px] h-[800px] shadow-lg rounded-lg flex flex-col justify-center items-center">
      <div className="text-4xl font-extrabold">
        Welcome{isSignPage && "Back"}
      </div>
      <div className="text-xl font-light mb-14">
        {isSignPage ? "Sign in to get explored" : "Sign up now to get started"}
      </div>
      <form
        onSubmit={() => console.log("Submitted")}
        className="flex flex-col items-center justify-center w-full"
      >
        {!isSignPage && (
          <Input
            label="Full Name"
            name="name"
            placeholder="Enter your full name"
            className="mb-6"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        )}
        <Input
          label="Email"
          name="email"
          placeholder="Enter your email"
          className="mb-6"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <Input
          label="Password"
          name="password"
          placeholder="Enter your password"
          className="mb-14"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />

        <Button
          label={isSignPage ? "Sign in" : "Sign Up"}
          className="mb-2"
          type="submit"
        />
      </form>
      <div>
        {isSignPage ? "Don't have an account? " : "Already have an account? "}
        <span className="underline cursor-pointer text-primary" onClick={()=>navigate(`/users/${isSignPage ? 'sign-up' : 'sign-in'}`)}>
          {isSignPage ? "Sign up" : "Sign in"}
        </span>
      </div>
    </div>
  );
}

import React from "react";

export interface LoginFieldProps {
  label: string;
  icon: string;
  children: React.ReactElement;
}

export const LoginField = (props: LoginFieldProps) => {
  return (
    <div className="field">
      <label className="label">{props.label}</label>
      <div className="control has-icons-left">
        {props.children}
        <span className="icon is-small is-left">
          <i className={props.icon}></i>
        </span>
      </div>
    </div>
  );
}

export const LoginCheckbox = () => {
  return (
    <div className="field">
      <label className="checkbox">
        <input type="checkbox" /> Remember me
    </label>
    </div>
  );
}

export interface LoginButtonProps {
  error: boolean;
}

export const LoginButton = (props: LoginButtonProps) => {
  const statusClass = props.error ? 'is-danger' : 'is-success';
  return (
    <div className="field">
      <button
        className={'button ' + statusClass}
        type="submit" >
        Login
    </button>
    </div>
  );
}

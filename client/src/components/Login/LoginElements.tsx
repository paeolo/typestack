
export interface LoginFieldProps {
  label: string;
  type: string;
  placeholder: string;
  icon: string;
}

export const LoginField = (props: LoginFieldProps) => {
  return (
    <div className="field">
      <label className="label">{props.label}</label>
      <div className="control has-icons-left">
        <input className="input"
          type={props.type}
          placeholder={props.placeholder}
          required />
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
        <input type="checkbox" required /> Remember me
    </label>
    </div>
  );
}

export const LoginButton = () => {
  return (
    <div className="field">
      <button className="button is-success">
        Login
    </button>
    </div>
  );
}

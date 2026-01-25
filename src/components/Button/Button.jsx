import clsx from "clsx";
import css from "./Button.module.css";

const Button = ({ children, type = "button" }) => {
  return (
    <button type={type} className={clsx(css.heroBtn)}>
      {children}
    </button>
  );
};

export default Button;

import PropTypes from "prop-types";
import styles from "./Button.module.scss";

export const Button = ({ onClick }) => {
  return (
    <div className={styles.buttonContainer}>
      <button className={styles.button} onClick={onClick}>
        Load more
      </button>
    </div>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};

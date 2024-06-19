import { Component } from "react";
import PropTypes from "prop-types";
import styles from "./Modal.module.scss";

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown = (event) => {
    if (event.code === "Escape") {
      this.props.onClose();
    }
  };

  handleClick = (event) => {
    if (event.target === event.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    const { image } = this.props;

    if (!image) {
      return null;
    }

    return (
      <div className={styles.overlay} onClick={this.handleClick}>
        <div className={styles.modal}>
          <img src={image.largeImageURL} alt={image.tags} />
        </div>
      </div>
    );
  }
}
Modal.proptypes = {
  image: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

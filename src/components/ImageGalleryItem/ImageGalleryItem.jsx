import { Component } from "react";
import PropTypes from "prop-types";
import styles from "./ImageGalleryItem.module.scss";

export class ImageGalleryItem extends Component {
  render() {
    const { image, onItemClick } = this.props;

    return (
      <li className={styles.imageGalleryItem}>
        <img
          className={styles.imageGalleryItemImage}
          src={image.webformatURL}
          alt={image.tags}
          onClick={onItemClick}
        />
      </li>
    );
  }
}

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired,
  onItemClick: PropTypes.func,
};

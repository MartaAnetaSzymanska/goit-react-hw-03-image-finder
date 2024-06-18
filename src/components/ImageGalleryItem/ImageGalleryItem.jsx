import { Component } from "react";
import PropTypes from "prop-types";
import styles from "./ImageGalleryItem.module.scss";

export class ImageGalleryItem extends Component {
  staticPropTypes = {
    largeImageURL: PropTypes.string.isRequired,
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  };

  render() {
    const { webformatURL, tags } = this.props;

    return (
      <li className={styles.imageGalleryItem}>
        <img
          className={styles.imageGalleryItemImage}
          src={webformatURL}
          alt={tags}
        />
      </li>
    );
  }
}

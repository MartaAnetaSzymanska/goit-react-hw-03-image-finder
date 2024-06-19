import { ImageGalleryItem } from "../ImageGalleryItem/ImageGalleryItem";
import PropTypes from "prop-types";
import styles from "./ImageGallery.module.scss";

export const ImageGallery = ({ images, onImageClick }) => {
  return (
    <ul className={styles.imageGallery}>
      {images.map((image) => (
        <ImageGalleryItem
          key={image.id}
          image={image}
          onItemClick={onImageClick}
        />
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    }),
  ).isRequired,
  onImageClick: PropTypes.func.isRequired,
};

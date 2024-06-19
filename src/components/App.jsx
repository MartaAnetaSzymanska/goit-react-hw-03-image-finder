import { Component } from "react";
import { Searchbar } from "./SearchBar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Button } from "./Button/Button";
import { Loader } from "./Loader/Loader";
import { getApi } from "./pixabay-api";
import toast, { Toaster } from "react-hot-toast";
import styles from "./App.module.scss";

export class App extends Component {
  state = {
    query: "",
    page: 1,
    images: [],
    loading: false,
    error: false,
    end: false,
    showModal: false,
    largeImageURL: "",
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { query } = this.state;
    const newQuery = e.target.query.value;
    if (newQuery !== query) {
      this.setState({ query: newQuery, page: 1, images: [] });
    }
  };

  fetchImages = async (query, page) => {
    try {
      this.setState({ loading: true });

      // fetch data from API:
      const fetchedImages = await getApi(query, page);
      const { hits, totalHits } = fetchedImages;

      if (totalHits === 0) {
        toast(
          "Sorry, There are no images matching your search query. Please try again.",
        );
        return;
      }
      if (totalHits > 0) {
        toast(`Hooray!We found ${totalHits} images`);
      }
      if (page === totalHits / 12) {
        this.setState({ end: true });
        toast("We're sorry, but you've reached the end of search results.");
      }
      this.setState((prevState) => ({
        images: [...prevState.images, ...hits],
      }));
    } catch {
      this.setState({ error: true });
    } finally {
      this.setState({ loading: false });
    }
  };

  componentDidUpdate = async (_prevProps, prevState) => {
    const { query, page } = this.state;

    if (prevState.query !== query || prevState.page !== page) {
      await this.fetchImages(query, page);
    }
  };

  handleButtonClick = () => {
    this.setState((prevState) => ({ page: prevState.page + 1 }));
  };

  render() {
    const { images, loading, error, showModal, largeImageURL } = this.state;
    return (
      <div className={styles.app}>
        <Searchbar onSubmit={this.handleSubmit}></Searchbar>
        <ImageGallery images={images}></ImageGallery>
        {images.length > 0 && (
          <Button onClick={this.handleButtonClick}></Button>
        )}
        {loading && <Loader></Loader>}
        {error && toast.error("Oops, something went wrong! Reload this page!")}
      </div>
    );
  }
}
export default App;

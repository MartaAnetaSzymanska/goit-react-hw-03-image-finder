import { Component } from "react";
import { Searchbar } from "./SearchBar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { getApi } from "./pixabay-api";
import toast from "react-hot-toast";
import styles from "./App.module.scss";

export class App extends Component {
  state = {
    query: "",
    page: 1,
    images: [],
    loading: false,
    error: false,
    selectedImage: null,
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
      this.setState({ isLoading: true });

      // fetch data from API:
      const fetchedImages = await getApi(query, page);
      const { hits, totalHits } = fetchedImages;

      if (totalHits === 0) {
        toast.error(
          "Sorry, There are no images matching your search query. Please try again.",
        );
        return;
      }
      if (page === 1) {
        toast.success(`Hooray!We found ${totalHits} images`);
      }
      if (page * 12 >= totalHits) {
        this.setState({ isEnd: true });
        toast("We are're sorry, but you've reached the end of search results.");
      }
      this.setState((prevState) => ({
        images: [...prevState.images, ...hits],
      }));
    } catch {
      this.setState({ isError: true });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  componentDidUpdate = async (_prevProps, prevState) => {
    const { query, page } = this.state;

    if (prevState.query !== query || prevState.page !== page) {
      await this.fetchImages(query, page);
    }
  };

  handleClick = () => {
    this.setState((prevState) => ({ page: prevState.page + 1 }));
  };

  render() {
    const { images, isLoading, isError, isEnd } = this.state;
    return (
      <div className={styles.app}>
        <Searchbar onSubmit={this.handleSubmit}></Searchbar>
        {/* Render ImageGallery when there is at least 1 image */}
        {images.length >= 1 && <ImageGallery images={images}></ImageGallery>}
      </div>
    );
  }
}
export default App;

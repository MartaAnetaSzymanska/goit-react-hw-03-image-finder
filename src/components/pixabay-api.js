import axios from "axios";

const apiKey = "43560822-853d258fb61c3d5dd4d985685";

export async function getApi(query, page) {
  const url = `https://pixabay.com/api/?q=${query}&page=${page}&?key=${apiKey}&image_type=photo&orientation=horizontal&per_page=12`;

  const response = await axios.get(url);

  return response.data;
}

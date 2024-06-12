import axios from 'axios';

const GOOGLE_BOOKS_API_URL = 'https://www.googleapis.com/books/v1/volumes';

export const fetchBookInfo = async (externalId: string) => {
  try {
    const response = await axios.get(`${GOOGLE_BOOKS_API_URL}?q=${externalId}`);
    if (response.data.items && response.data.items.length > 0) {
      return response.data.items[0].volumeInfo;
    }
    return null;
  } catch (error) {
    console.error('Error fetching book info from Google Books API', error);
    throw new Error('Error fetching book info from Google Books API');
  }
};

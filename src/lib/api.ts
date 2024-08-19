const fetchGistData = async () => {
  try {
    const response = await fetch(
      "https://api.github.com/gists/5e7c48768af1eb721d9e2e1d874cd9a0"
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching gist data:", error);
    throw error;
  }
};
export const fetchJsonContent = async () => {
  const gistData = await fetchGistData();
  const fileUrl = gistData.files["serverResponse.json"].raw_url;
  const response = await fetch(fileUrl);
  const jsonData = await response.json();
  return jsonData;
};

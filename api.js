export async function fetchAmiibos(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.amiibo;
  } catch (error) {
    throw new Error('Failed to fetch amiibos');
  }
}
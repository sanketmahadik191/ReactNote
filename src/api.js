const cache = new Map();

export const fetchData = async (start, limit) => {
  const url = `https://jsonplaceholder.typicode.com/todos?_start=${start}&_limit=${limit}`;
  if (cache.has(url)) return cache.get(url);
  
  const response = await fetch(url);
  const data = await response.json();
  const uniqueData = Array.from(new Map(data.map(item => [item.title, item])).values());
  cache.set(url, uniqueData);
  return uniqueData;
};
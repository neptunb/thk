document.getElementById('fetchData').addEventListener('click', async () => {
  const response = await fetch('/api');
  const data = await response.json();
  document.getElementById('response').innerText = data.message;
});

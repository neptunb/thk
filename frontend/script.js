document.getElementById('fetchData').addEventListener('click', async () => {
  const url = "https://www.tcmb.gov.tr/kurlar/today.xml";
  const response = await fetch(url);
  const data = await response.json();
  document.getElementById('response').innerText = data.message;
});

document.getElementById('fetchData').addEventListener('click', async () => {

  const url = `/api/currency`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.error) {
      document.getElementById('response').innerText = `Error: ${data.error}`;
    } else {
      // Render currency rates
      const ratesList = data.rates.map(
        (rate) =>{
          console.log("Rate: ", rate.code);
          if (rate.code === 'USD') {
          return `${rate.name} (${rate.code}): Buying - ${rate.forexBuying}, Selling - ${rate.forexSelling}`
          }
        }
      );
      document.getElementById('response').innerText = ratesList.join('\n');
    }
  } catch (error) {
    document.getElementById('response').innerText = 'Error fetching data.';
  }
});

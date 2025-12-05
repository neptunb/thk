// Set h1 message based on port
const port = window.location.port;
const portMessage = document.getElementById('portMessage');
if (port === '8080') {
  portMessage.innerText = 'Raises CORS Error on 8080';
} else if (port === '3000') {
  portMessage.innerText = 'No CORS Error on 3000';
} else {
  portMessage.innerText = `Running on port ${port || '80'}`;
}

// document.getElementById('fetchData').addEventListener('click', async () => {
//   const response = await fetch('/api');
//   const data = await response.json();
//   document.getElementById('response').innerText = data.message;
// });


// This causes CORS error - fetching directly from TCMB is not allowed from browser
// document.getElementById('fetchData').addEventListener('click', async () => {
//   const url = "https://www.tcmb.gov.tr/kurlar/today.xml";
//   const response = await fetch(url);
//   const data = await response.json();
//   document.getElementById('response').innerText = data.message;
// });

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

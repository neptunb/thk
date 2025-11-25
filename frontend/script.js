// 1. Worker'ı başlatma (Ayrı bir iş parçacığı oluşturma)
const fibonacciWorker = new Worker('fibonacci.js');

let startTime = null;
let intervalId = null;
const counterDisplay = document.querySelector('#counterDisplay');
const fibonacciResult = document.querySelector('#fibonacciResult');

// 2. Worker'dan gelen mesajı dinleme (İşlem tamamlandığında)
fibonacciWorker.onmessage = e => {
    // Interval'ı durdur
    if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
    }
    
    // Son süreyi göster
    const elapsedTime = Math.round(performance.now() - startTime);
    counterDisplay.textContent = `${elapsedTime} ms`;
    
    // Sonucu sağ tarafta göster
    fibonacciResult.textContent = `${e.data.result}`;
    fibonacciResult.innerHTML += `<div style="font-size: 16px; color: #666; margin-top: 10px;">Hesaplama süresi: ${e.data.time}ms</div>`;
    console.log("Sonuç ana iş parçacığına ulaştı.");
};

// 3. İşlemi Worker'a gönderme
const calculateFibonacciInWorker = () => {
    const number = parseInt(document.querySelector('#inputNumber').value);
    
    if (isNaN(number) || number < 0) {
        alert("Lütfen geçerli bir sayı girin!");
        return;
    }
    
    // Başlangıç zamanını kaydet ve sonucu sıfırla
    startTime = performance.now();
    counterDisplay.textContent = '0 ms';
    fibonacciResult.textContent = 'Hesaplanıyor...';
    
    // Interval ile geçen süreyi güncelle (tek bir elementte güncelle)
    intervalId = setInterval(() => {
        const elapsedTime = Math.round(performance.now() - startTime);
        counterDisplay.textContent = `${elapsedTime} ms`;
    }, 10); // Her 10ms'de bir güncelle (daha akıcı görünüm için)
    
    // Ağır görevi Worker'a postMessage ile gönderiyoruz
    const workerStartTime = performance.now();
    fibonacciWorker.postMessage({ number, startTime: workerStartTime });
    console.log("İşlem Worker'a devredildi, ana iş parçacığı serbest.");
};

// 4. Butona tıklama olayını dinleme
document.querySelector('#fibonacciButton').addEventListener('click', calculateFibonacciInWorker);

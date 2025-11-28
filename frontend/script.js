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
    // Önceki interval'ı durdur
    if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
    }
    
    const inputElement = document.querySelector('#inputNumber');
    let number = parseInt(inputElement.value);
    
    // If input is empty, use 44 as default
    if (isNaN(number) || inputElement.value.trim() === '') {
        number = 44;
        inputElement.value = 44;
    }
    
    if (number < 0) {
        alert("Lütfen geçerli bir sayı girin!");
        return;
    }
    
    // Başlangıç zamanını kaydet ve sıfırla
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

// ==================== BLOCKING ÖRNEĞİ (Main Thread) ====================

// Ağır işi yapan senkron fonksiyon - Recursive Fibonacci (main thread'de)
function fibonacciBlocking(n) {
    if (n <= 1) {
        return n;
    }
    // Bu recursive çağrı, main thread'de çalışır ve UI'ı bloklar.
    return fibonacciBlocking(n - 1) + fibonacciBlocking(n - 2);
}

let startTimeBlocking = null;
let intervalIdBlocking = null;
const counterDisplayBlocking = document.querySelector('#counterDisplayBlocking');
const fibonacciResultBlocking = document.querySelector('#fibonacciResultBlocking');

// Blocking versiyonu - Fibonacci main thread'de çalışır
const calculateFibonacciBlocking = () => {
    // Önceki interval'ı durdur
    if (intervalIdBlocking) {
        clearInterval(intervalIdBlocking);
        intervalIdBlocking = null;
    }
    
    const inputElement = document.querySelector('#inputNumberBlocking');
    let number = parseInt(inputElement.value);
    
    // If input is empty, use 44 as default
    if (isNaN(number) || inputElement.value.trim() === '') {
        number = 44;
        inputElement.value = 44;
    }
    
    if (number < 0) {
        alert("Lütfen geçerli bir sayı girin!");
        return;
    }
    
    // Başlangıç zamanını kaydet ve sıfırla
    startTimeBlocking = performance.now();
    counterDisplayBlocking.textContent = '0 ms';
    fibonacciResultBlocking.textContent = 'Hesaplanıyor...';
    
    // Interval ile geçen süreyi güncelle (ama bu blocking olduğu için çalışmayacak)
    intervalIdBlocking = setInterval(() => {
        const elapsedTime = Math.round(performance.now() - startTimeBlocking);
        counterDisplayBlocking.textContent = `${elapsedTime} ms`;
    }, 10);
    
    // Ağır görevi main thread'de direkt çalıştır (UI donacak)
    const workerStartTime = performance.now();
    const result = fibonacciBlocking(number);
    const endTime = performance.now();
    const time = Math.round(endTime - workerStartTime);
    
    // Interval'ı durdur
    if (intervalIdBlocking) {
        clearInterval(intervalIdBlocking);
        intervalIdBlocking = null;
    }
    
    // Son süreyi göster
    const elapsedTime = Math.round(performance.now() - startTimeBlocking);
    counterDisplayBlocking.textContent = `${elapsedTime} ms`;
    
    // Sonucu göster
    fibonacciResultBlocking.textContent = `${result}`;
    fibonacciResultBlocking.innerHTML += `<div style="font-size: 16px; color: #666; margin-top: 10px;">Hesaplama süresi: ${time}ms</div>`;
    console.log("Blocking hesaplama tamamlandı.");
};

// Blocking butona tıklama olayını dinleme
document.querySelector('#fibonacciButtonBlocking').addEventListener('click', calculateFibonacciBlocking);

// Sıfırlama fonksiyonu
const resetBlocking = () => {
    // Interval'ı durdur
    if (intervalIdBlocking) {
        clearInterval(intervalIdBlocking);
        intervalIdBlocking = null;
    }
    
    // Süre ve sonuçları sıfırla
    counterDisplayBlocking.textContent = '0 ms';
    fibonacciResultBlocking.textContent = '-';
    startTimeBlocking = null;
};

// Sıfırlama butonuna tıklama olayını dinleme
document.querySelector('#resetButtonBlocking').addEventListener('click', resetBlocking);

// Ağır işi yapan senkron fonksiyon - Recursive Fibonacci (yavaş, test için)
function fibonacci(n) {
    if (n <= 1) {
        return n;
    }
    // Bu recursive çağrı, Web Worker'da çalışır ve ana thread'i bloklamaz.
    return fibonacci(n - 1) + fibonacci(n - 2);
}

// Worker'a ana iş parçacığından mesaj geldiğinde
onmessage = e => {
    const { number, startTime } = e.data;
    
    // Fibonacci hesaplamasını yap
    const result = fibonacci(number);
    
    // Süreyi hesapla
    const endTime = performance.now();
    const time = Math.round(endTime - startTime);
    
    // Sonucu geri gönderir
    postMessage({ result, time });
};


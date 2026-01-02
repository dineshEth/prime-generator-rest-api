const primeCheckerBySQRTWithoutFindingSqrt = (num) => {
    if (num<2) return false;
    for(let i=2;i*i<=num;i++){
        if(num % i == 0) return false;
    }
    return true;
}

const fastestSqrt = (start,end) => {
    let primes = [];
    let num = start;

    if(start<= 2 & end >= 2){
        primes[0]=2
    }
    
    // start is even then make it odd by adding 1
    if(start%2==0){
        num = num + 1;
    }
    
    while(num <= end){
        let isPrime = primeCheckerBySQRTWithoutFindingSqrt(num);
        if(isPrime) {
            primes.push(num);
            num=num+2;
        } else {
            num=num+2;
        }
    }
    return primes;
}

export {fastestSqrt}
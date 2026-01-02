const primeCheckerByHalf = (num) => {
    if (num < 2) return false
    for(let i=2;i<=num/2;i++){
        if(num % i == 0) return false 
    }
    return true;
}

// checks only odd numbers
const fastestHalfNumbers = (start,end) => {
    let primes = [];
    // start is even make it odd by adding 1
    let num = start;
    
    if(start<= 2 && end >= 2){
        primes[0]=2
    }

    if(start%2==0){
        num = num + 1;
    }
    
    while(num <= end){
        let isPrime = primeCheckerByHalf(num);
        if(isPrime) {
            primes.push(num);
            num=num+2;
        } else {
            num=num+2;
        }
    }
    return primes;
}

export {fastestHalfNumbers};
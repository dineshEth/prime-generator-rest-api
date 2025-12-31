const primeCheckerByHalf = (num) => {
    // edge cases
    if (num<2) return false;

    // check for factors from 2 to num/2
    for(let i=2;i<=num/2;i++){
        if(num % i == 0) return false 
    }
    return true;
}


const primeBtwnStartEndHALF = (start,end) => {
    let primes = []; // stores prime numbers
    let num = start; 
    // loop from start to end
    while(num <= end){
        // check if num is prime
        let isPrime = primeCheckerByHalf(num);
        if(isPrime) {
            // if prime, add to primes array
            primes.push(num);
            num++; // increment num
        } else {
            num++;
        }
    }
    return primes;
}

export { primeBtwnStartEndHALF };
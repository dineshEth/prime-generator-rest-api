const primeCheckerBySQRTWithoutFindingSqrt = (num) => {
    if (num < 2) return false;
    for(let i=2;i*i<=num;i++){
        if(num % i == 0) return false;
    }
    return true;
}

const primeBtwnStartEndSQRT = (start,end) => {
    let primes = [];
    let num = start;
    while(num <= end){
        let flag = primeCheckerBySQRTWithoutFindingSqrt(num);
        if(flag) {
            primes.push(num);
            num++;
        } else {
            num++;
        }
    }
    return primes;
}

export { primeBtwnStartEndSQRT };
function primeBtwnStartSEIVE(start=1,end){
    // create an array of (end+1) length
    // store true, assume all are prime
    let isPirme = new Array(end+1).fill(true)
    // 0, 1 are not prime 
    isPirme[0] = false;
    isPirme[1] = false;
    
    // traverse each number, if the number is true then
    // it's a prime number, and update
    // it's all multiples to false as they are not prime

    // start the loop from 2 upto n
    for(let i = 2;i*i<=end;i++){
        if(isPirme[i]==true){
            for(let j=i*i;j<=end;j=j+i){
                isPirme[j]=false
            }
        }
    }

    let primes = [];
    for(let i = start; i<=end;i++){
        if(isPirme[i]){
            primes.push(i)
        }
    }
    return primes;
}

export { primeBtwnStartSEIVE };
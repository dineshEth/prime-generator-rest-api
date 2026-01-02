// primes number generatir using Sieve of Eratosthenes for only odd numbers

function fastestSOE(start=1,end){
    // create an array of (end+1) length
    // store true, assume all are prime
    let isPirme = new Array(end+1).fill(true)
    // 0, 1 are not prime 
    isPirme[0] = false;
    isPirme[1] = false;
    // 2 is prime
    if(end>=2){
        isPirme[2] = true;
    }
    // starts by 3 and increment by +2
    for(let i = 3;i*i<=end;i=i+2){
        if(isPirme[i]==true){
            for(let j=i*i;j<=end;j=j+i*2){
                isPirme[j]=false
            }
        }
    }
    let primes = [];

    if(start<= 2 && end >= 2){
        primes[0]=2
    }

    if(start%2==0){
        start = start + 1;
    }
    
    for(let i = start; i<=end;i=i+2){
        if(isPirme[i]){
            primes.push(i)
        }
    }
    return primes;
}

export { fastestSOE }
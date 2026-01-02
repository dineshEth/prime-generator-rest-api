import {fastestHalfNumbers,fastestSOE,fastestSqrt,primeBtwnStartEndHALF,primeBtwnStartEndSQRT,primeBtwnStartSEIVE} from '../methods/index.js'

// const Strategies = ["By Half Number","By Sqrt NUmber", "Sieve of Eratosthenes","fastes BHN","fatest BSN","fastest SOE"]

const strategySelector = (start,end,strategy=1)=>{
    let primes = []
    let startTime;
    let endTime;
    // Here you would call the appropriate prime generation function based on strategy
    switch(strategy){
        case '1':
            startTime = performance.now();
            primes = primeBtwnStartEndHALF(Number(start), Number(end));
            endTime = performance.now();
            break;
        case '2':
            startTime = performance.now();
            primes = primeBtwnStartEndSQRT(Number(start), Number(end));
            endTime = performance.now();
            break;
        case '3':
            startTime = performance.now();
            primes = primeBtwnStartSEIVE(Number(start), Number(end));
            endTime = performance.now();
            break;
        case '4':
            startTime = performance.now();
            primes = fastestHalfNumbers(Number(start), Number(end));
            endTime = performance.now();
            break;
        case '5':
            startTime = performance.now();
            primes = fastestSqrt(Number(start), Number(end));
            endTime = performance.now();
            break;
        case '6':
            startTime = performance.now();
            primes = fastestSOE(Number(start), Number(end));
            endTime = performance.now();
            break;
        default:
            startTime = performance.now();
            primes = primeBtwnStartEndHALF(Number(start), Number(end));
            endTime = performance.now();
            break;
    }
    return { 
        timeElapsed:`${(endTime-startTime).toFixed(3)}`, 
        primeCount: primes.length, 
    }
}

export {strategySelector}

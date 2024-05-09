
const divisionwithoutRemainderCount = ({arr, delim}) => {
    let cnt = 0;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] % delim === 0) {
            cnt += 1;
        };  
    }    
    return cnt;
};

module.exports = divisionwithoutRemainderCount;

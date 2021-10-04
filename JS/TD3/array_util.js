//Fonction 1
export function getSum (arr) {
    return arr.reduce((sum, n) => sum + n);
  }

//Fonction 2
export function getNumberOfEven (arr) {
    return arr.filter(n => n % 2 === 0).length;
  }  

//Fonction 5
export let max=(...values)=>{
  let max=0;
  values.forEach(number => {
      if(number%2===0 && number > max)
          max=number;
  });
  return max;
}

//Fonction dichotomique
export function dichotomique (arr, element) {
  let result = -1;
  let start = 0;
  let end = arr.length;
  while (start <= end && result === -1) {
    const half = Math.round((end + start) / 2);
    if (element === arr[half]) {
      result = half;
    } else if (element > arr[half]) {
      start = half + 1;
    } else {
      end = half - 1;
    }
  }
  return result;
}

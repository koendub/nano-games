
export function shuffleInPlace<T>(array: T[], seed: number) {
  let currentIndex = array.length, temporaryValue, randomIndex;

  let random = function() {
    var x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  };
  
  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(random() * currentIndex);
    currentIndex -= 1;
    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

export function uniqueUserId() {
  const storedUuid = localStorage.getItem("user-id");
  if (storedUuid) return parseInt(storedUuid);
  const uuidNum = Math.floor(Math.random() * (2 << 30));
  localStorage.setItem("user-id", uuidNum.toString());
  return uuidNum;
}

interface ArrayIterTracker {
  name: string;
  fullLoops: number;
  currentIdx: number;
}

export function arrayRandomUniqueIterator<T>(name: string, array: T[], amount: number) {
  const storageKey = `array-iter-tracker-${name}`;
  const storedTracker = localStorage.getItem(storageKey);
  const iterTracker = storedTracker ? JSON.parse(storedTracker) : {
    name: name, fullLoops: 0, currentIdx: 0
  };
  const { newTracker, slice } = _arrayRandomUniqueIteratorFromTracker(iterTracker, array, amount);
  localStorage.setItem(storageKey, JSON.stringify(newTracker));
  return slice;
}

function _arrayRandomUniqueIteratorFromTracker<T>(iterTracker: ArrayIterTracker, array: T[], amount: number): { newTracker: ArrayIterTracker, slice: T[] } {
  // First shuffle the array based on a unique ID of the user + the amount of times we have gone over the whole array
  const shuffled = shuffleInPlace([...array], uniqueUserId() + iterTracker.fullLoops);
  // Then just skip however many we already had
  const rest = shuffled.slice(iterTracker.currentIdx);
  if (rest.length >= amount) {
    const newTracker = { ...iterTracker, currentIdx: iterTracker.currentIdx + amount };
    return { newTracker, slice: rest.slice(0, amount) };
  }
  const secondPartTracker = { ...iterTracker, fullLoops: iterTracker.fullLoops + 1, currentIdx: 0 };
  const { newTracker, slice } = _arrayRandomUniqueIteratorFromTracker(secondPartTracker, array, amount - rest.length);
  return { newTracker, slice: [...rest, ...slice] };
}

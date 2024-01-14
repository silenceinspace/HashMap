class HashMap {
  constructor() {
    this.hashMap = this.#createMainBucket();
    this.capacity = this.hashMap.length;
    this.loadFactor = 0.75;
  }

  #createMainBucket() {
    const arr = Array(16).fill(null);
    return arr;
  }

  #checkBucketCapacity() {
    let usedCapacity = 0;
    this.hashMap.forEach((bucket) => {
      if (bucket) {
        usedCapacity += 1;
      }
    });

    const threshold = Math.floor(this.capacity * this.loadFactor);
    if (threshold < usedCapacity) {
      return true;
    } else {
      return false;
    }
  }

  hash(value) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < value.length; i++) {
      hashCode = primeNumber * hashCode + value.charCodeAt(i);
    }

    // To avoid too large values for hash codes, take only 2 first and last digits of the original hash code and multiply them;
    hashCode = hashCode.toString();
    const firstTwoDigits = hashCode.substr(0, 2);
    const lastTwoDigits = hashCode.substr(-2);
    hashCode = firstTwoDigits * lastTwoDigits;

    console.log(hashCode);
    return hashCode.toString();
  }

  // Key should be of type string, e.g. "313"
  set(key, value) {
    const data = { hashCode: key, value: value };

    let keyExists = false;
    let indexOfKey = -1;
    this.hashMap.forEach((bucket, index) => {
      if (bucket && bucket.hashCode === key) {
        keyExists = true;
        indexOfKey = index;
      }
    });

    if (keyExists) {
      // Overwrite the value
      this.hashMap[indexOfKey].value = value;
    } else {
      // Find the first available empty bucket
      const firstAvailableBucket = this.hashMap.indexOf(null);
      this.hashMap[firstAvailableBucket] = data;

      const growthIsRequired = this.#checkBucketCapacity();
      if (growthIsRequired) {
        this.hashMap.push(null);
        this.capacity += 1;
        console.log('Bucket has been expanded.');
      }
    }
  }

  get(key) {
    let value = null;
    this.hashMap.forEach((bucket) => {
      if (bucket && bucket.hashCode === key) {
        value = bucket.value;
      }
    });
    return value;
  }

  has(key) {
    this.hashMap.forEach;
  }
}

const hashTable = new HashMap();
// const one = hashTable.hash('Anton');
// const two = hashTable.hash('anton');
// const three = hashTable.hash('dj');
// hashTable.set(one, 'Anton');
// hashTable.set(two, 'anton');
// hashTable.set(three, 'dj');

// for (let i = 0; i < 12; i++) {
//   hashTable.set(`${i}`, `Anton-${i}`);
// }
// hashTable.set('158', 'Anton');
hashTable.set('19', 'good');

console.log(hashTable.hashMap);

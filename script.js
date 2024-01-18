import { LinkedList, Node } from './linked_list';

class HashMap {
  constructor(size) {
    this.hashMap = this.#createHashMapOfSize(size);
    this.capacity = this.hashMap.length;
    this.loadFactor = 0.75;
  }

  #createHashMapOfSize(length = 16) {
    const arr = Array(length).fill(null);
    return arr;
  }

  #checkBucketCapacity() {
    let usedCapacity = 0;
    let bucketContainsFourCollisions = false;

    this.hashMap.forEach(bucket => {
      if (bucket) {
        usedCapacity += 1;

        if (bucket.size > 3) {
          bucketContainsFourCollisions = true;
        }
      }
    });

    const threshold = Math.floor(this.capacity * this.loadFactor);
    if (threshold < usedCapacity || bucketContainsFourCollisions) {
      return true;
    } else {
      return false;
    }
  }

  #growTheMainBucket() {
    const storedKeysAndValues = this.entries();
    this.hashMap = this.#createHashMapOfSize(this.capacity * 2);
    this.capacity = this.capacity * 2;

    storedKeysAndValues.forEach(pair => {
      const key = pair.at(0);
      const value = pair.at(1);
      this.set(key, value);
    });
  }

  hash(key) {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      // BigInt() will take care of numbers that cannot be stored as primitive numbers to avoid accuracy issues
      hashCode = BigInt(primeNumber) * BigInt(hashCode) + BigInt(key.charCodeAt(i));
    }

    const bigIntHash = BigInt(hashCode) % BigInt(this.hashMap.length);
    const numberHash = Number(bigIntHash);
    return numberHash;
  }

  set(key, value) {
    const index = this.hash(key);
    const bucket = this.hashMap[index];
    const newPair = new Node(key, value);

    if (!bucket) {
      const linkedList = new LinkedList();
      this.hashMap[index] = linkedList;
      linkedList.append(newPair);
    } else {
      const linkedList = this.hashMap[index];
      const keyIsFound = linkedList.find(key);

      if (keyIsFound) {
        keyIsFound.value = value;
      } else {
        linkedList.append(newPair);
      }
    }

    const isTimeToGrowBucket = this.#checkBucketCapacity();
    if (isTimeToGrowBucket) {
      this.#growTheMainBucket();
    }

    return this.hashMap;
  }

  get(key) {
    const index = this.hash(key);
    const bucket = this.hashMap[index];

    if (!bucket) return null;

    const keyIsFound = bucket.find(key);
    if (keyIsFound) {
      return keyIsFound.value;
    } else return null;
  }

  has(key) {
    const index = this.hash(key);
    const bucket = this.hashMap[index];

    if (!bucket) return false;

    const keyIsFound = bucket.find(key);
    if (keyIsFound) {
      return true;
    } else return false;
  }

  remove(key) {
    const index = this.hash(key);
    const bucket = this.hashMap[index];

    if (!bucket) return false;

    const keyToBeRemoved = bucket.find(key);
    if (!keyToBeRemoved) {
      return false;
    } else {
      bucket.remove(key);
      if (bucket.size === 0) {
        this.hashMap[index] = null;
      }
      return true;
    }
  }

  length() {
    let length = 0;
    this.hashMap.forEach(bucket => {
      if (bucket) {
        length += bucket.size;
      }
    });
    return length;
  }

  keys() {
    const array = [];
    this.hashMap.forEach(bucket => {
      if (bucket) {
        let node = bucket.head;
        while (node) {
          array.push(node.key);
          node = node.next;
        }
      }
    });
    return array;
  }

  values() {
    const array = [];
    this.hashMap.forEach(bucket => {
      if (bucket) {
        let node = bucket.head;
        while (node) {
          array.push(node.value);
          node = node.next;
        }
      }
    });
    return array;
  }

  entries() {
    const array = [];
    this.hashMap.forEach(bucket => {
      if (bucket) {
        let node = bucket.head;
        while (node) {
          array.push([node.key, node.value]);
          node = node.next;
        }
      }
    });
    return array;
  }

  clear() {
    this.hashMap = this.#createHashMapOfSize(this.hashMap.length);
    return true;
  }
}

const hashTable = new HashMap(8);
console.log(hashTable);

// ***
// console.log(hashTable.hashMap[6]);
// console.log(hashTable.hashMap[16]);
//  Should I implement this restriction on a prototype of my class' array hashMap?
// const accessBucketThroughIndex = (mainBucket, index) => {
//   if (index < 0 || index >= mainBucket.hashMap.length) {
//     throw new Error('Trying to access index out of bound');
//   }
// };

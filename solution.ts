// Problem 1: formatValue
const formatValue = (value: string | number | boolean) => {
    if (typeof value === 'string') {
        return value.toUpperCase();
    } else if (typeof value === 'number') {
        return value * 10;
    }

    return !value;
}

// Problem 2: getLength
const getLength = (value: string | any) => {
    return value.length;
}

// Problem 3: Person class
class Person {
    name: string;
    age: number;

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }

    getDetails() {
        return `Name: ${this.name}, Age: ${this.age}`;
    }
}

// Problem 4: filterByRating
const filterByRating = (array: Array<{title: string, rating: number}>) => {
    return array.filter(arr => arr.rating >= 4.0 && arr);
}

// Problem 5: filterActiveUsers
type User = {
    id: number,
    name: string,
    email: string,
    isActive: boolean
}

const filterActiveUsers = (array: User[]) => {
    return array.filter(arr => arr.isActive && arr);
}

// Problem 6: printBookDetails
interface Book {
    title: string,
    author: string,
    publishedYear: number,
    isAvailable: boolean,
}

const printBookDetails = (book: Book): string => {
    return `Title: ${book.title}, Author: ${book.author}, Published: ${book.publishedYear}, Available: ${book.isAvailable}`;
}

// Problem 7: getUniqueValues
function getUniqueValues<T extends string | number>(arr1: T[], arr2: T[]): T[] {
    const result: T[] = [];

    const exists = (value: T): boolean => {
        for (let i = 0; i < result.length; i++) {
            if (result[i] === value) {
                return true;
            }
        }
        return false;
    }

    for (let i = 0; i < arr1.length; i++) {
        if (!exists(arr1[i])) {
            result.push(arr1[i]);
        }
    }

    for (let i = 0; i < arr2.length; i++) {
        if (!exists(arr2[i])) {
            result.push(arr2[i]);
        }
    }

    return result;
}

// Problem 8: calculateTotalPrice
type Products = {
    name: string,
    price: number,
    quantity: number,
    discount?: number
}
 
const calculateTotalPrice = (products: Products[]): number => {
    return products.reduce((acc, prod) => {
        const price = prod.price * prod.quantity
        if (prod?.discount) {
            acc = price - price * prod.discount / 100 + acc;
        } else {
            acc = price;
        }

        return acc; 
    }, 0);
}

# TypeScript: Interface এবং Type এর মধ্যে পার্থক্য এবং keyof কীওয়ার্ড

## প্রশ্ন ১: Interface এবং Type এর মধ্যে পার্থক্য কী?

TypeScript এ `interface` এবং `type` দুটি শক্তিশালী টুল যা আমরা আমাদের কোডে টাইপ সংজ্ঞায়িত করতে ব্যবহার করি। যদিও এরা অনেক ক্ষেত্রে অনুরূপ, তবুও তাদের মধ্যে কিছু গুরুত্বপূর্ণ পার্থক্য রয়েছে।

### প্রধান পার্থক্যগুলো:

#### ১. **সংজ্ঞা এবং সম্প্রসারণ (Declaration Merging)**
- **Interface**: একই নাম দিয়ে একাধিক interface সংজ্ঞায়িত করা যায়, এবং সেগুলো স্বয়ংক্রিয়ভাবে একত্রিত হয়।
  
  ```typescript
  interface User {
    name: string;
  }

  interface User {
    age: number;
  }

  // উভয় properties একসাথে একত্রিত হয়
  const user: User = { name: "আহসান", age: 25 };
  ```

- **Type**: একই নাম দিয়ে পুনঃসংজ্ঞায়িত করা যায় না। এটি একটি ত্রুটি হবে।
  
  ```typescript
  type User = {
    name: string;
  }

  type User = {  // ❌ Error: Duplicate identifier 'User'
    age: number;
  }
  ```

#### ২. **ইনহেরিটেন্স (Inheritance)**
- **Interface**: `extends` কীওয়ার্ড ব্যবহার করে অন্য interface থেকে প্রসারিত হতে পারে।
  
  ```typescript
  interface Animal {
    name: string;
  }

  interface Dog extends Animal {
    breed: string;
  }
  ```

- **Type**: `&` (intersection) অপারেটর ব্যবহার করে অন্য type এর সাথে সংমিশ্রণ করা যায়।
  
  ```typescript
  type Animal = {
    name: string;
  }

  type Dog = Animal & {
    breed: string;
  }
  ```

#### ৩. **ইউনিয়ন টাইপ (Union Types)**
- **Interface**: ইউনিয়ন টাইপ সমর্থন করে না।
  
  ```typescript
  interface Result = string | number; // ❌ সম্ভব নয়
  ```

- **Type**: ইউনিয়ন টাইপ সমর্থন করে।
  
  ```typescript
  type Result = string | number; // ✅ সম্ভব
  ```

#### ৪. **Primitive টাইপ (Primitive Types)**
- **Interface**: শুধুমাত্র object shapes সংজ্ঞায়িত করতে পারে।
  
  ```typescript
  interface Age = number; // ❌ সম্ভব নয়
  ```

- **Type**: যেকোনো প্রকার টাইপ সংজ্ঞায়িত করতে পারে।
  
  ```typescript
  type Age = number; // ✅ সম্ভব
  type Status = "active" | "inactive"; // ✅ সম্ভব
  ```

#### ৫. **Tuple এবং অন্যান্য জটিল টাইপ**
- **Interface**: tuple তৈরি করা জটিল এবং সীমিত।
  
  ```typescript
  interface Tuple {
    0: string;
    1: number;
  }
  ```

- **Type**: সহজেই tuple তৈরি করা যায়।
  
  ```typescript
  type Tuple = [string, number]; // ✅ সহজ এবং পরিষ্কার
  ```

#### ৬. **Performance**
- **Interface**: সামান্য ভালো performance দেয় কারণ এটি compile করার সময় optimize করা হয়।
- **Type**: performance এ কোনো বিশেষ পার্থক্য নেই।

---

## প্রশ্ন ২: TypeScript এ `keyof` কীওয়ার্ড কী এবং এর ব্যবহার কী?

`keyof` কীওয়ার্ড TypeScript এ একটি অপারেটর যা কোনো object type এর সমস্ত keys কে একটি union type হিসেবে নিষ্কাশন করে। এটি আমাদের type-safe কোড লিখতে সাহায্য করে।

### `keyof` এর ব্যবহার:

#### উদাহরণ ১: সাধারণ Object

```typescript
interface User {
  id: number;
  name: string;
  email: string;
}

type UserKeys = keyof User; // "id" | "name" | "email"

// এখন শুধুমাত্র এই keys গুলো ব্যবহার করা যাবে
const key: UserKeys = "name"; // ✅ সম্ভব
const wrongKey: UserKeys = "age"; // ❌ Error: Type '"age"' is not assignable
```

#### উদাহরণ ২: Generic Type এর সাথে

```typescript
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = {
  id: 1,
  name: "রহিম",
  email: "rahim@example.com"
};

const nameValue = getProperty(user, "name"); // ✅ সম্ভব
// const ageValue = getProperty(user, "age"); // ❌ Error
```

#### উদাহরণ ৩: Dynamic Property Access

```typescript
interface Product {
  id: number;
  title: string;
  price: number;
}

function updateProduct<K extends keyof Product>(
  product: Product,
  field: K,
  value: Product[K]
): void {
  product[field] = value;
}

const product: Product = {
  id: 1,
  title: "লাপটপ",
  price: 50000
};

updateProduct(product, "title", "ডেস্কটপ"); // ✅ সম্ভব
// updateProduct(product, "title", 123); // ❌ Error: price হওয়া উচিত
```

#### উদাহরণ ৪: Conditional Type এর সাথে

```typescript
type KeyWithStringValue<T> = {
  [K in keyof T]: T[K] extends string ? K : never;
}[keyof T];

interface Settings {
  theme: string;
  fontSize: number;
  language: string;
}

type StringKeys = KeyWithStringValue<Settings>; // "theme" | "language"
```

#### উদাহরণ ৫: Mapped Type

```typescript
interface Role {
  admin: boolean;
  user: boolean;
  guest: boolean;
}

type RolePermissions = {
  [K in keyof Role]: Role[K]
}

// এটি নিম্নলিখিত এর সমান:
type RolePermissions = {
  admin: boolean;
  user: boolean;
  guest: boolean;
}
```

### `keyof` এর সুবিধা:

✅ **Type Safety**: ভুল property names দেওয়া থেকে রক্ষা করে।
✅ **Autocomplete**: IDE তে ভালো autocomplete সমর্থন পাওয়া যায়।
✅ **Refactoring**: property names পরিবর্তন করলে TypeScript স্বয়ংক্রিয়ভাবে ত্রুটি দেখাবে।
✅ **Generic Functions**: আরও নমনীয় এবং পুনঃব্যবহারযোগ্য functions তৈরি করতে সাহায্য করে।

---

## সংক্ষিপ্ত তুলনা সারণী

| বৈশিষ্ট্য | Interface | Type |
|----------|-----------|------|
| Declaration Merging | ✅ সমর্থন করে | ❌ সমর্থন করে না |
| Union Types | ❌ সমর্থন করে না | ✅ সমর্থন করে |
| Intersection | `extends` ব্যবহার করে | `&` অপারেটর ব্যবহার করে |
| Primitive Types | ❌ সম্ভব নয় | ✅ সম্ভব |
| Tuple | জটিল | সহজ |
| Performance | সামান্য ভালো | সাধারণ |

---

## উপসংহার

- **Interface** ব্যবহার করুন যখন আপনি object shapes সংজ্ঞায়িত করছেন এবং declaration merging প্রয়োজন।
- **Type** ব্যবহার করুন যখন আপনার union, intersection, বা অন্যান্য জটিল type definitions প্রয়োজন।
- **keyof** ব্যবহার করুন যখন আপনি type-safe property access চান এবং generic functions তৈরি করতে চান।

এই সরঞ্জামগুলো সঠিকভাবে ব্যবহার করে আমরা আরও নিরাপদ এবং রক্ষণাবেক্ষণযোগ্য TypeScript কোড লিখতে পারি।
showHello('greeting', 'TypeScript');

function showHello(divName: string, name: string) {
  const elt = document.getElementById(divName);
  elt.innerText = `Hello from ${name}`;
}

//-----------------------------------------------

enum Category { JavaScript, CSS, HTML, TypeScript, Anguar };

function getAllBooks(): readonly object[] { //сделать массив константой, привели к типу const
  const books = <const>[
    { id: 1, title: 'Refactoring JavaScript', author: 'Evan Burchard', available: true, category: Category.JavaScript },
    { id: 2, title: 'JavaScript Testing', author: 'Liang Yuxian Eugene', available: false, category: Category.JavaScript },
    { id: 3, title: 'CSS Secrets', author: 'Lea Verou', available: true, category: Category.CSS },
    { id: 4, title: 'Mastering JavaScript Object-Oriented Programming', author: 'Andrea Chiarelli', available: true, category: Category.JavaScript }
  ]

  return books;
}

function logFirstAvailable(books: readonly any[] = getAllBooks()): void {
  const booksLength: number = books.length;
  let title = '';

  for(const book of books) {
    if(book.available) {
      title = book.title;
      break;
    }
  }

  console.log(`Total number of books: ${booksLength}`);
  console.log(`First availbale book: ${title}`);
} 

// logFirstAvailable(getAllBooks());
logFirstAvailable();

function getBookTitlesByCategory(category: Category = Category.JavaScript): string[]  {
  const array = getAllBooks().filter((item: any) => item.category === category);
  const titles = array.map((item: any) => item.title);

  return titles;
}

function logBookTitles(titles: string[]): void {
  for (const title of titles) {
    console.log(`Title: ${title}`);
  }
}

// logBookTitles(getBookTitlesByCategory(Category.JavaScript));

function getBookAuthorByIndex(index: number): [string, string] { //возвращает tuple, т.е. пару ключ и значение (каждый со своим типом)
  const books: readonly any[] = getAllBooks();
  const { title, author } = books[index]; //деструктуризация объекта
  return [title, author];
}

// console.log(getBookAuthorByIndex(2));

function calcTotalPages(): bigint {
  const books = <const>[
    { lib: 'libName1', books: 1_000_000_000, avgPagesPerBook: 250 }, 
    { lib: 'libName2', books: 5_000_000_000, avgPagesPerBook: 300 }, 
    { lib: 'libName3', books: 3_000_000_000, avgPagesPerBook: 280 }
  ];

  const result = books.reduce((result: bigint, item: any) => {
    return result + BigInt(item.books) * BigInt(item.avgPagesPerBook); //если работаем с bigint, то надо все числа привести к этому типу
  }, 0n); 

  return result;
}

// console.log(calcTotalPages());

//---------------------------------------- Task 03.01

// getAllBooks().forEach(title => console.log(title));

function getBookByID(id: number): any {
  const elem = getAllBooks().find((item: any) => item.id === id);

  return elem;
}

// console.log(getBookByID(1));

//---------------------------------------- Task 03.02

function createCustomerID(name: string, id: number): string {
  return `${name}-${id}`;
}

let myId = createCustomerID('Ann', 10);

let idGenerator: (name: string, id: number) => string = (name: string, id: number) => `${name}-${id}`;

idGenerator = createCustomerID;
myId = idGenerator('Boris', 20);

// console.log(myId);

//---------------------------------------- Task 03.03

function createCustomer(name: string, age?: number, city?: string): void {
  console.log(name);

  if (age) {
    console.log(age);
  }

  if (city) {
    console.log(city);
  }
}

// createCustomer('Anna', 32, '<Mscow');
// console.log(getBookTitlesByCategory());

function checkoutBooks(customer: string, ...booksIds: number[]): string[] {
  console.log(customer);
  const titles: string[] = [];

  for (const id of booksIds) {
    const book = getBookByID(id);
    if (book && book.available) {
      titles.push(book.title);
    }
  }

  return titles;
}

const myBooks = checkoutBooks('Ann', 1, 2, 3);

// console.log(myBooks);

//---------------------------------------- Task 03.04

function getTitles(author: string): string[];
function getTitles(available: boolean): string[];
function getTitles(id: number, available: boolean): string[];
function getTitles(...args: any[]): string[] {
  const books: readonly any[] = getAllBooks();

  if (args.length === 1) {
    const [arg] = args;
    if (typeof arg === 'string') {
      return books.filter(book => book.author === arg).map(book => book.title);
    } else if (typeof arg === 'boolean') {
      return books.filter(book => book.available === arg).map(book => book.title);
    } else {
      return [];
    }
  } else if (args.length === 2) {
    const [id, available] = args;
    if (typeof id === 'number' && typeof available === 'boolean') {
      return books.filter(book => book.available === available && book.id === id).map(book => book.title);
    } else {
      return [];
    }
  } else {
    return [];
  }
}

const checkedOutBooks = getTitles(false);
console.log(checkedOutBooks);
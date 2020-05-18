showHello('greeting', 'TypeScript');

function showHello(divName: string, name: string) {
  const elt = document.getElementById(divName);
  elt.innerText = `Hello from ${name}`;
}

//-----------------------------------------------

enum Category { JavaScript, CSS, HTML, TypeScript, Anguar };

function getAllBooks(): readonly object[] { //сделать массив константой, привели к типу const
  const books = <const>[
    { title: 'Refactoring JavaScript', author: 'Evan Burchard', available: true, category: Category.JavaScript },
    { title: 'JavaScript Testing', author: 'Liang Yuxian Eugene', available: false, category: Category.JavaScript },
    { title: 'CSS Secrets', author: 'Lea Verou', available: true, category: Category.CSS },
    { title: 'Mastering JavaScript Object-Oriented Programming', author: 'Andrea Chiarelli', available: true, category: Category.JavaScript }
  ]

  return books;
}

function logFirstAvailable(books: readonly any[]): void {
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

logFirstAvailable(getAllBooks());

function getBookTitlesByCategory(category: Category): string[]  {
  const array = getAllBooks().filter((item: any) => item.category === category);
  const titles = array.map((item: any) => item.title);

  return titles;
}

function logBookTitles(titles: string[]): void {
  for (const title of titles) {
    console.log(`Title: ${title}`);
  }
}

logBookTitles(getBookTitlesByCategory(Category.JavaScript));

function getBookAuthorByIndex(index: number): [string, string] { //возвращает tuple, т.е. пару ключ и значение (каждый со своим типом)
  const books: readonly any[] = getAllBooks();
  const { title, author } = books[index]; //деструктуризация объекта
  return [title, author];
}

console.log(getBookAuthorByIndex(2));

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

console.log(calcTotalPages());

//----------------------------------------

const baseURL = 'https://www.anapioficeandfire.com/api/';

async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

async function displayBooks() {
    const booksContainer = document.getElementById('books');

    try {
        const booksResponse = await fetchData(`${baseURL}books`);
        const books = booksResponse.slice(0, 10); // Displaying the first 10 books

        books.forEach(async book => {
            const characters = await fetchData(book.characters[0]); // Get the first character for each book
            const bookElement = document.createElement('div');
            bookElement.innerHTML = `
                <h2>${book.name}</h2>
                <p>ISBN: ${book.isbn}</p>
                <p>Pages: ${book.numberOfPages}</p>
                <p>Authors: ${book.authors.join(', ')}</p>
                <p>Publisher: ${book.publisher}</p>
                <p>Released: ${book.released}</p>
                <p>Characters: ${characters.name}</p>
            `;
            booksContainer.appendChild(bookElement);
        });
    } catch (error) {
        console.error('Error displaying books:', error);
    }
}

displayBooks();

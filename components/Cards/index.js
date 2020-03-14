// STEP 3: Create Article cards.
// -----------------------
// Send an HTTP GET request to the following address: https://lambda-times-backend.herokuapp.com/articles
// Study the response data you get back, closely.
// You will be creating a component for each 'article' in the list.
// This won't be as easy as just iterating over an array though.
// Create a function that will programmatically create the following DOM component:
//
// <div class="card">
//   <div class="headline">{Headline of article}</div>
//   <div class="author">
//     <div class="img-container">
//       <img src={url of authors image} />
//     </div>
//     <span>By {authors name}</span>
//   </div>
// </div>
//
// Create a card for each of the articles and add the card to the DOM.


// Selector for cards-container
const container = document.querySelector('.cards-container');


/* ********************
 * Card component
 * ********************
 */
function createCard(data) {
  const card = document.createElement('div');
  card.classList.add('card');

  const headline = document.createElement('div');
  headline.classList.add('headline');
  headline.textContent = data.headline;
  card.append(headline);

  const author = document.createElement('div');
  author.classList.add('author');

  /* *********************
   * author child elements
   * *********************
   */
    const imageContainer = document.createElement('div');
    imageContainer.classList.add('img-container');

    // authorPhoto
    const image = document.createElement('img');
    image.src = data.authorPhoto;
    imageContainer.append(image);

    // authorName
    const name = document.createElement('span');
    name.textContent = `By ${data.authorName}`

    author.append(imageContainer);
    author.append(name);
  // end of author child elements

  card.append(author);

  return card;
} // closes createCard function


// get request from backend server
axios.get('https://lambda-times-backend.herokuapp.com/articles')
  .then(response => {
    const articleObject = response.data.articles;

    for (const article in articleObject) {
      articleObject[article].forEach(item => {
        container.append(createCard(item));
      })
    }
  })
  .catch(error => {
    console.log(error);
  })
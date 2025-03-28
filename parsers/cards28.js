export default function parse(element, { document }) {
  const rows = [];

  // Header row with block name
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Cards';
  rows.push(headerRow);

  // Process each article
  const articles = element.querySelectorAll('article');
  articles.forEach((article) => {
    const imageWrapper = article.querySelector('figure a img');
    const titleWrapper = article.querySelector('header h3 a');
    const categoryWrapper = article.querySelector('header p span:first-child');
    const subCategoryWrapper = article.querySelector('header p span:last-child');

    // Handle missing image
    const image = document.createElement('img');
    if (imageWrapper) {
      image.src = imageWrapper.src || '';
      image.alt = imageWrapper.alt || 'Image not available';
    } else {
      image.alt = 'Image not available';
    }

    // Handle missing title
    const title = document.createElement('strong');
    title.textContent = titleWrapper ? titleWrapper.textContent.trim() : 'Title not available';

    // Handle missing category and subcategory
    const category = document.createElement('p');
    category.textContent = categoryWrapper ? categoryWrapper.textContent.trim() : 'Category not available';

    const subCategory = document.createElement('p');
    subCategory.textContent = subCategoryWrapper ? subCategoryWrapper.textContent.trim() : 'Subcategory not available';

    // Combine content for the text cell with proper formatting
    const textContent = document.createElement('div');
    textContent.appendChild(title);
    textContent.appendChild(document.createElement('br'));
    textContent.appendChild(category);
    textContent.appendChild(subCategory);

    // Add the row to the table
    rows.push([image, textContent]);
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the element
  element.replaceWith(table);
}
export default function parse(element, { document }) {
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Cards';

  const rows = [];

  // Extract image dynamically
  const img = element.querySelector('img');
  const imageElement = document.createElement('img');
  imageElement.src = img?.src || '';
  imageElement.alt = img?.alt || '';

  // Extract title dynamically
  const title = element.querySelector('h3');
  const titleElement = document.createElement('strong');
  titleElement.textContent = title?.textContent || '';

  // Extract description dynamically
  const description = element.querySelector('p');
  const descriptionElement = document.createElement('p');
  descriptionElement.textContent = description?.textContent || '';

  // Combine content into rows
  rows.push([imageElement, [titleElement, descriptionElement]]);

  // Create table
  const cells = [headerRow, ...rows];
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace element with block table
  element.replaceWith(blockTable);
}
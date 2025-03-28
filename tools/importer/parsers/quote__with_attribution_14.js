export default function parse(element, { document }) {
  const cells = [];

  // Create header row
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Quote';
  const headerRow = [headerCell];
  cells.push(headerRow);

  // Extract quote content
  const quoteElement = element.querySelector('blockquote p');
  if (quoteElement) {
    cells.push([quoteElement.cloneNode(true)]); // Clone to avoid modifying original DOM
  } else {
    cells.push(['']); // Handle missing quote gracefully
  }

  // Extract attribution content
  const attributionElement = element.querySelector('cite p');
  if (attributionElement) {
    cells.push([attributionElement.cloneNode(true)]); // Clone to avoid modifying original DOM
  } else {
    cells.push(['']); // Handle missing attribution gracefully
  }

  // Create table block
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
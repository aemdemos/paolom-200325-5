export default function parse(element, { document }) {
  // Create the header row
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Hero';
  const headerRow = [headerCell];

  // Extract the title
  const titleElement = document.createElement('h1');
  const originalTitle = element.querySelector('h1.accent-text.type-alpha');
  if (originalTitle) {
    titleElement.innerHTML = originalTitle.innerHTML;
  }

  // Extract the subheading
  const subheadingElement = document.createElement('p');
  const originalSubheading = element.querySelector('.type-l-paragraph p');
  if (originalSubheading) {
    subheadingElement.innerHTML = originalSubheading.innerHTML;
  }

  // Extract the image
  const imageElement = document.createElement('img');
  const originalImage = element.querySelector('img');
  if (originalImage) {
    imageElement.src = originalImage.src;
    imageElement.alt = originalImage.alt;
    imageElement.width = originalImage.width;
    imageElement.height = originalImage.height;
  }

  // Combine the extracted content
  const contentCell = [imageElement, titleElement, subheadingElement].filter(Boolean);

  // Create the table
  const cells = [
    headerRow,
    [contentCell]
  ];
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}
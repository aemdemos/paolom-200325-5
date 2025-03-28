export default function parse(element, { document }) {
  // Extract the required content from the element
  const subheading = element.querySelector('p.type-eta')?.textContent.trim();
  const title = element.querySelector('h1.type-alpha')?.textContent.trim();
  const description = element.querySelector('div.type-l-paragraph p')?.textContent.trim();
  const videoSource = element.querySelector('video source')?.getAttribute('src');

  // Create elements for each extracted piece of content
  const subheadingElement = document.createElement('p');
  subheadingElement.textContent = subheading;

  const titleElement = document.createElement('h1');
  titleElement.textContent = title;

  const descriptionElement = document.createElement('p');
  descriptionElement.textContent = description;

  const videoElement = document.createElement('video');
  videoElement.setAttribute('src', videoSource);
  videoElement.setAttribute('controls', '');

  // Create the table header row
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Hero';
  const headerRow = [headerCell];

  // Create the content row
  const contentRow = [[subheadingElement, titleElement, descriptionElement, videoElement]];

  // Combine the rows into the table data
  const tableData = [headerRow, contentRow];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}
export default function parse(element, { document }) {
  // Step 1: Define the header row with the exact block name
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Hero';

  // Step 2: Extract the image details from the provided HTML structure
  const figure = element.querySelector('figure');
  const img = figure ? figure.querySelector('img') : null;

  // Step 3: Handle the case where the image is missing or empty
  const contentRow = [];
  if (img) {
    const imageElement = document.createElement('img');
    imageElement.setAttribute('src', img.getAttribute('src'));
    imageElement.setAttribute('alt', img.getAttribute('alt'));
    imageElement.setAttribute('width', img.getAttribute('width'));
    imageElement.setAttribute('height', img.getAttribute('height'));
    contentRow.push(imageElement);
  } else {
    // If no image, handle gracefully (e.g., add placeholder or note)
    const placeholder = document.createElement('div');
    placeholder.textContent = 'No image available';
    contentRow.push(placeholder);
  }

  // Step 4: Create a table with the extracted content
  const table = WebImporter.DOMUtils.createTable([
    headerRow, // Header row containing the block name
    contentRow // Content row containing the image or placeholder
  ], document);

  // Step 5: Replace the original element with the newly created table
  element.replaceWith(table);
}
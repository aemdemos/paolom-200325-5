export default function parse(element, { document }) {
  // Extract the relevant content from the element
  const content = element.textContent.trim();

  // Check if the content exists and is valid
  if (!content) {
    console.warn('Element does not contain valid content.');
    return;
  }

  // Create the header row for the table
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Embed';

  // Create a content row for the table
  const contentRow = [content];

  // Create the table block
  const block = WebImporter.DOMUtils.createTable([headerRow, contentRow], document);

  // Replace the original element with the new block
  element.replaceWith(block);
}
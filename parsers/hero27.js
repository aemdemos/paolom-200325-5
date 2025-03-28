export default function parse(element, { document }) {
  // Extract Title
  const headerElement = element.querySelector('header h2');
  const titleContent = headerElement ? headerElement.textContent.trim() : '';

  // Create a heading element for the title
  const heading = document.createElement('h1');
  heading.textContent = titleContent;

  // Create the header row for the block table
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Hero';
  const headerRow = [headerCell];

  // Define the block table
  const cells = [
    headerRow,
    [heading],
  ];

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}
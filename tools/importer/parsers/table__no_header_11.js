export default function parse(element, { document }) {
  // Extract the text content of the input element
  const content = element.textContent.trim();

  // Create the header row
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Table (no header)';
  const headerRow = [headerCell];

  // Create the content row using the extracted text
  const contentRow = [content];

  // Build the table structure
  const cells = [
    headerRow,
    contentRow,
  ];

  // Generate the block table
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}
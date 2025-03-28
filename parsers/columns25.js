export default function parse(element, { document }) {
  // Define the header row with exact match to the example
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Columns';
  const headerRow = [headerCell];

  // Extract relevant content dynamically from the element
  const listItems = Array.from(
    element.querySelectorAll('ul > li') // Fixed invalid selector previously
  );

  const columnCells = listItems.map((item) => {
    // Extract only unique content, avoiding redundancy
    const link = item.querySelector('a');
    const span = item.querySelector('span');

    if (link) {
      const anchor = document.createElement('a');
      anchor.href = link.href;
      anchor.textContent = link.textContent.trim();
      return anchor;
    } else if (span) {
      const text = document.createElement('span');
      text.textContent = span.textContent.trim();
      return text;
    }

    return null; // Handle cases with no valid content
  }).filter(Boolean); // Remove any null items

  // Ensure all columns are in a single row as required by the example
  const tableData = [
    headerRow,
    columnCells // Combine all cells into a single row in the second row
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}
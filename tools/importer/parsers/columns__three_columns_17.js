export default function parse(element, { document }) {
  const cells = [];

  // Correcting the header row to match the example precisely
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Columns';
  const headerRow = [headerCell];
  cells.push(headerRow);

  // Extract items and organize them into rows of three columns
  const items = Array.from(element.children);
  const rows = [];
  for (let i = 0; i < items.length; i += 3) {
    const row = items.slice(i, i + 3).map((item) => {
      const heading = item.querySelector('dt.type-epsilon a');
      const description = item.querySelector('dd.type-s-paragraph p');

      if (!heading || !description) {
        return document.createTextNode('Missing content'); // Handle missing elements
      }

      const columnHeader = document.createElement('h2');
      columnHeader.textContent = heading.textContent;

      return [columnHeader, description];
    });
    rows.push(row);
  }

  // Add each row to the table
  rows.forEach((row) => cells.push(row));

  // Create the table
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the table
  element.replaceWith(table);
}
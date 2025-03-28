export default function parse(element, { document }) {
  const createTable = WebImporter.DOMUtils.createTable;

  // Extract table rows from HTML element
  const rows = element.querySelectorAll('table tr');

  // Header row for the new table format
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Table (striped, bordered)';
  const headerRow = [headerCell];

  // Process content rows
  const tableData = Array.from(rows).map(row => {
    return Array.from(row.cells).map(cell => {
      const cellContent = document.createElement('div');
      cellContent.innerHTML = cell.innerHTML.trim();
      return cellContent;
    });
  });

  // Remove duplicates by comparing the innerHTML of each cell in a row
  const uniqueData = tableData.filter((row, index, self) => {
    return index === self.findIndex((r) => 
      r.every((cell, cellIndex) => 
        cell.innerHTML === row[cellIndex].innerHTML
      )
    );
  });

  // Combine header row and unique content rows
  const structuredData = [headerRow, ...uniqueData];

  // Create the new block table
  const blockTable = createTable(structuredData, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}
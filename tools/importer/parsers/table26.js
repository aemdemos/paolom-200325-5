export default function parse(element, { document }) {
  // Extract table rows from the input element
  const rows = element.querySelectorAll('tr');

  // Define the header row for the block table
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Table';

  // Process each row to extract data and organize it into cells
  const tableRows = Array.from(rows).map((row) => {
    const cells = row.querySelectorAll('td');
    return Array.from(cells).map((cell) => {
      return cell.innerHTML.trim();
    });
  });

  // Combine the header row and the table rows
  const tableData = [headerRow, ...tableRows];

  // Create the block table using WebImporter.DOMUtils.createTable
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}
export default function parse(element, { document }) {
  // Define the table header
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Table (no header)';
  const headerRow = [headerCell];

  // Dynamically extract content
  const rows = [];

  // Fix selector issue and verify valid content
  const posterElement = element.querySelector('[data-poster]');
  if (posterElement) {
    const posterUrl = posterElement.getAttribute("data-poster") || "Unnamed";
    rows.push([document.createTextNode(posterUrl)]);
  } else {
    rows.push([document.createTextNode("No data available")]);
  }

  // Combine the header and rows
  const tableData = [headerRow, ...rows];

  // Create the table block
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new table block
  element.replaceWith(blockTable);
}
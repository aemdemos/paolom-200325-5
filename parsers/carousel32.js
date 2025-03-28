export default function parse(element, { document }) {
  // Create a header row for the Carousel block table
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Carousel';
  const headerRow = [headerCell];

  // Extract content from the given element
  const link = element.querySelector('a');
  const linkText = link?.querySelector('span')?.textContent || 'N/A';
  const linkHref = link?.getAttribute('href') || '#';

  const cta = document.createElement('a');
  cta.setAttribute('href', linkHref);
  cta.textContent = linkText;

  const svgElement = link?.querySelector('svg') || document.createTextNode('No SVG available');

  // Assemble rows for the table
  const rows = [
    headerRow, // Header row
    [svgElement, cta] // Content row: SVG and CTA link
  ];

  // Create a block table using the extracted rows
  const blockTable = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}
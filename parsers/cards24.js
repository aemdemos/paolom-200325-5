export default function parse(element, { document }) {
  // Extract data from the provided element
  const header = element.querySelector('h2.accent-text');
  const ctaLink = element.querySelector('a.button-tertiary');

  // Prepare cells for the block table
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Cards';
  const headerRow = [headerCell];

  const contentRow = [];

  if (header) {
    const heading = document.createElement('h2');
    heading.textContent = header.textContent.trim();
    contentRow.push(heading);
  }

  if (ctaLink) {
    const link = document.createElement('a');
    link.href = ctaLink.href;
    link.textContent = ctaLink.textContent.trim();
    contentRow.push(link);
  }

  const rows = [headerRow, contentRow];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}
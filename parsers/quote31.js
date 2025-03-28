export default function parse(element, { document }) {
  // Extract the quote content dynamically from the element
  const quoteText = element.querySelector('h2')?.textContent?.trim();

  // Ensure the quote text is extracted correctly
  if (!quoteText) {
    console.error('Quote text could not be extracted.');
    return;
  }

  // Create the header row with the block name matching the example
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Quote';
  const headerRow = [headerCell];

  // Create the quote row dynamically from the quote content
  const quoteRow = [quoteText];

  // Construct the table using WebImporter.DOMUtils.createTable
  const blockTable = WebImporter.DOMUtils.createTable([headerRow, quoteRow], document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}
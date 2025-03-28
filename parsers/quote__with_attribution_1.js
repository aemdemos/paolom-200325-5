export default function parse(element, { document }) {
  // Check if the element contains required data
  if (!element) {
    console.warn('Element is missing');
    return;
  }

  // Extract the quote text dynamically
  const quoteElement = element.querySelector('blockquote');
  const quoteText = quoteElement ? quoteElement.innerHTML.trim() : 'Quote missing';

  // Extract the attribution text dynamically
  const attributionElement = element.querySelector('cite');
  const attributionText = attributionElement ? attributionElement.innerHTML.trim() : 'Attribution missing';

  // Create the header row as per the example
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Quote';

  // Create the quote row dynamically
  const quoteRow = [document.createElement('div')];
  quoteRow[0].innerHTML = quoteText;

  // Create the attribution row dynamically
  const attributionRow = [document.createElement('div')];
  attributionRow[0].innerHTML = attributionText;

  // Assemble the table cells
  const cells = [
    headerRow, // Header row
    quoteRow,  // Quote row
    attributionRow, // Attribution row
  ];

  // Create the block table dynamically
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}
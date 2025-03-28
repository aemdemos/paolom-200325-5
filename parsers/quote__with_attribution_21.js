export default function parse(element, { document }) {
  const blockName = document.createElement('strong');
  blockName.textContent = 'Quote';

  // Extracting the quote text
  const quoteElement = element.querySelector('blockquote p');
  const quoteText = quoteElement ? quoteElement.textContent.trim() : '';

  // Extracting the attribution text
  const attributionElement = element.querySelector('cite > p');
  const attributionText = attributionElement ? attributionElement.innerHTML.trim() : '';

  // Creating the table array
  const tableData = [
    [blockName],
    [quoteText],
    [attributionText]
  ];

  // Creating the block table
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replacing the original element with the new block table
  element.replaceWith(blockTable);
}
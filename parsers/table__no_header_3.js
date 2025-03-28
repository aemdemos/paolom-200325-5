export default function parse(element, { document }) {
  // Helper function to extract text content from spans accurately
  const extractText = (htmlElement) => {
    const spans = htmlElement.querySelectorAll('span');
    const uniqueTexts = new Set();

    spans.forEach(span => {
      const text = span.textContent.trim();
      if (text.length > 0) {
        uniqueTexts.add(text); // Ensure only unique text entries
      }
    });

    return Array.from(uniqueTexts).join(' ');
  };

  // Extract text content from the element without duplicates
  const extractedText = extractText(element);

  // Create table structure
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Table (no header)';
  const tableData = [
    [headerCell], // Header row
    [extractedText] // Content row
  ];

  // Generate the table block
  const tableBlock = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new table block
  element.replaceWith(tableBlock);
}
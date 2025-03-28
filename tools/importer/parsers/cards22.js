export default function parse(element, { document }) {
  // Critical Review: Ensure dynamic content extraction and correct formatting

  // Create Header Row and ensure it matches the example
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Cards';

  // Extract data dynamically from each card
  const rows = Array.from(element.querySelectorAll('a.group')).map((card) => {
    const titleElement = card.querySelector('h3');
    const descriptionElement = card.querySelector('.type-s-paragraph');
    const linkElement = card.querySelector('span.button-tertiary span');

    // Handle edge cases: missing or empty elements
    const title = document.createElement('strong');
    title.textContent = titleElement ? titleElement.textContent.trim() : '';

    const description = document.createElement('p');
    description.textContent = descriptionElement ? descriptionElement.textContent.trim() : '';

    const link = document.createElement('a');
    link.href = card.getAttribute('href');
    link.textContent = linkElement ? linkElement.textContent.trim() : '';

    // Combine extracted elements into a row
    return [title, [description, link].filter(Boolean)];
  });

  // Ensure proper structure: header row followed by card rows
  const tableData = [headerRow, ...rows];

  // Create block table and replace element
  const tableBlock = WebImporter.DOMUtils.createTable(tableData, document);
  element.replaceWith(tableBlock);
}
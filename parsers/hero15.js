export default function parse(element, { document }) {
  // Create the header row dynamically and ensure it matches the example structure
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Hero';
  const headerRow = [headerCell];

  // Extract the heading (mandatory Title)
  const heading = element.querySelector('h2');
  const title = document.createElement('h1');
  if (heading) {
    title.textContent = heading.textContent;
  }

  // Extract all paragraphs and assemble them
  const paragraphs = Array.from(element.querySelectorAll('p'));
  const content = document.createElement('div');
  paragraphs.forEach((p) => {
    content.appendChild(p.cloneNode(true));
  });

  // Extract the button (optional Call-to-Action) only once
  const button = element.querySelector('a.button');
  if (button) {
    const buttonClone = button.cloneNode(true);
    content.appendChild(buttonClone);
  }

  // Ensure no duplicate buttons are included
  const duplicateButtons = content.querySelectorAll('a.button');
  if (duplicateButtons.length > 1) {
    for (let i = 1; i < duplicateButtons.length; i++) {
      duplicateButtons[i].remove();
    }
  }

  // Combine title and content into the second row
  const secondRow = [title, content];

  // Construct the table with proper structure
  const cells = [
    headerRow, // Header row
    secondRow, // Content row (Title + Content)
  ];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}
export default function parse(element, { document }) {
  // Extract the key content elements from the input HTML structure

  // Extract image
  const imageElement = element.querySelector('img');
  const imageUrl = imageElement?.src;
  const imageAlt = imageElement?.alt || '';

  // Create image block
  const img = document.createElement('img');
  img.src = imageUrl;
  img.alt = imageAlt;

  // Extract title
  const titleElement = element.querySelector('h1');
  const titleText = titleElement?.textContent;

  // Extract 'Identity' label
  const identityElement = element.querySelector('p.type-eta');
  const identityText = identityElement?.textContent;

  // Combine 'Identity' label with title
  const heading = document.createElement('h1');
  heading.innerHTML = `<span>${identityText}</span> ${titleText}`;

  // Extract subheading
  const subHeadingElement = element.querySelector('div.type-paragraph p');
  const subHeadingText = subHeadingElement?.textContent;
  const paragraph = document.createElement('p');
  paragraph.textContent = subHeadingText;

  // Build the table structure with corrected header row
  const cells = [
    ['Hero'], // Header row as plain text
    [
      [
        img,
        heading,
        paragraph,
      ],
    ],
  ];

  // Create the block table using WebImporter.DOMUtils.createTable
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}
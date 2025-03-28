export default function parse(element, { document }) {
  // Extract video URL
  const videoLink = element.querySelector('a');
  const videoURL = videoLink ? videoLink.href : '';

  // Extract poster image
  const imageElement = element.querySelector('img');

  // Create the header row with block name
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Embed';
  const headerRow = [headerCell];

  // Create the content row dynamically with extracted elements
  const contentRow = [
    [
      imageElement || '', // Add image element if it exists
      videoURL ? document.createTextNode(videoURL) : '', // Add video URL as text
    ].filter(Boolean), // Filter out null/undefined values
  ];

  // Structure for the table
  const cells = [headerRow, contentRow];

  // Create the block table using helper function
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new table
  element.replaceWith(block);
}
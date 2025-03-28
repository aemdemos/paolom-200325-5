export default function parse(element, { document }) {
  // Create the header row
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Columns';

  // Extract content from the element
  const title = element.querySelector('h1')?.textContent || '';
  const subtitle = element.querySelector('p.type-eta')?.textContent || '';
  const date = element.querySelector('time')?.textContent || '';
  const videoIframe = element.querySelector('.video-playable iframe')?.outerHTML || '';

  // Ensure extracted content is structured dynamically
  const textColumn = document.createElement('div');
  textColumn.innerHTML = `<p><strong>${subtitle}</strong></p><p>${title}</p><p>${date}</p>`;

  const videoColumn = document.createElement('div');
  if (videoIframe) {
    videoColumn.innerHTML = videoIframe;
  } else {
    videoColumn.textContent = 'No video available';
  }

  // Assemble the table rows dynamically
  const rows = [
    headerRow,
    [textColumn, videoColumn],
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element dynamically and preserve edge cases
  element.replaceWith(block);
}
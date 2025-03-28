export default function parse(element, { document }) {
  // Get all slides from the carousel
  const slides = Array.from(element.querySelectorAll('li[data-slide-index]'));

  // Create a header row for the table
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Carousel';
  const headerRow = [headerCell];

  // Parse each slide into a table row
  const rows = slides.map((slide) => {
    const imgElement = slide.querySelector('img');
    const titleElement = slide.querySelector('h2');
    const linkElement = slide.querySelector('a');

    // Check for missing elements and fallback gracefully
    const imageCell = imgElement ? document.createElement('img') : document.createElement('div');
    if (imgElement) {
      imageCell.src = imgElement.src;
      imageCell.alt = imgElement.alt;
    } else {
      imageCell.textContent = 'Image missing';
    }

    const textContentCell = document.createElement('div');
    if (titleElement) {
      const title = document.createElement('h2');
      title.textContent = titleElement.textContent.trim();
      textContentCell.append(title);
    }
    if (linkElement) {
      const link = document.createElement('a');
      link.href = linkElement.href;
      link.textContent = linkElement.textContent.trim();
      textContentCell.append(link);
    } else {
      const noLinkText = document.createElement('p');
      noLinkText.textContent = 'No link provided';
      textContentCell.append(noLinkText);
    }

    return [imageCell, textContentCell];
  });

  // Combine header and rows into the table cells
  const cells = [headerRow, ...rows];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}
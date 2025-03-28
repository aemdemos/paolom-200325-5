export default function parse(element, { document }) {
    const cardsData = [];

    // Extract each card in the HTML
    const cards = element.querySelectorAll('article[data-layout="listingCard"]');
    cards.forEach(card => {
        const imageElement = card.querySelector('figure img');
        const titleElement = card.querySelector('h3');
        const categoryElements = card.querySelectorAll('p span');

        if (imageElement && titleElement) {
            const image = document.createElement('img');
            image.setAttribute('src', imageElement.getAttribute('src'));
            image.setAttribute('alt', imageElement.getAttribute('alt'));

            const title = document.createElement('strong');
            title.textContent = titleElement.textContent.trim();

            const description = document.createElement('p');
            description.textContent = Array.from(categoryElements)
                .map(span => span.textContent.trim())
                .join(' | ');

            cardsData.push([image, [title, description]]);
        }
    });

    // Add the header row
    const headerCell = document.createElement('strong');
    headerCell.textContent = 'Cards';
    const headerRow = [headerCell];

    const tableData = [headerRow, ...cardsData];

    const table = WebImporter.DOMUtils.createTable(tableData, document);

    element.replaceWith(table);
}
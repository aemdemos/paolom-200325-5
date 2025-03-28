export default function parse(element, { document }) {
    // Correcting the selector issue by targeting the class properly
    const columns = Array.from(element.querySelectorAll('[class*="md:px-4"]'));

    const tableRows = [];

    // Add the header row (fixing the issue to match exactly as plain text without <strong>)
    const headerRow = ['Columns'];
    tableRows.push(headerRow);

    // Process each column
    const contentRow = columns.map(column => {
        const dl = column.querySelector('dl');
        const dt = dl.querySelector('dt');
        const dd = dl.querySelector('dd');

        // Get the count and unit
        const countSpan = dt.querySelector('span:first-of-type');
        const unitSpan = dt.querySelector('span:nth-of-type(2)');

        const count = countSpan ? countSpan.textContent : '';
        const unit = unitSpan ? unitSpan.textContent : '';

        // Get the description
        const descriptionSpan = dd.querySelector('span');
        const description = descriptionSpan ? descriptionSpan.textContent : '';

        // Create the content for this column
        const columnContent = document.createElement('div');
        const heading = document.createElement('h2');
        heading.textContent = `Column ${columns.indexOf(column) + 1}`;
        const paragraph = document.createElement('p');
        paragraph.textContent = `${count}${unit} - ${description}`;

        columnContent.appendChild(heading);
        columnContent.appendChild(paragraph);

        return columnContent;
    });

    tableRows.push(contentRow);

    // Create the table block
    const block = WebImporter.DOMUtils.createTable(tableRows, document);

    // Replace the original element
    element.replaceWith(block);
}
const { execSync } = require('child_process');
const path = require('path');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

// Map of invoice names to their files
const invoices = {
    sports: { html: 'FabziaSportsInvoice.html', pdf: 'FabziaSports_Invoice.pdf' },
    technology: { html: 'FabziaTechnologyInvoice.html', pdf: 'FabziaTechnology_Invoice.pdf' },
};

const arg = (process.argv[2] || '').toLowerCase();

if (!arg || !invoices[arg]) {
    console.log('Usage: node generate-pdf.js <sports|technology>');
    console.log('  sports      - Generate Fabzia Sports invoice PDF');
    console.log('  technology  - Generate Fabzia Technology invoice PDF');
    process.exit(1);
}

const invoice = invoices[arg];
const htmlFile = path.resolve(__dirname, invoice.html);
const pdfFile = path.resolve(__dirname, invoice.pdf);
const fileUrl = 'file:///' + htmlFile.replace(/\\/g, '/');

console.log(`Generating ${arg} invoice PDF...`);
execSync(`"${edgePath}" --headless --disable-gpu --print-to-pdf="${pdfFile}" --print-to-pdf-no-header --no-pdf-header-footer "${fileUrl}"`, { stdio: 'ignore' });
console.log(`Done! PDF saved to: ${pdfFile}`);

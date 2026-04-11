import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';

export const exportToPDF = async (transactions) => {
  const htmlContent = `
    <html>
      <head>
        <style>
          body { font-family: 'Helvetica', sans-serif; padding: 20px; }
          table { width: 100%; border-collapse: collapse; }
          th, td { border: 1px solid #E5E5EA; padding: 12px; text-align: left; }
          th { background-color: #F2F2F7; }
          .amount { text-align: right; font-weight: bold; }
        </style>
      </head>
      <body>
        <h2>Monthly Expense Report</h2>
        <table>
          <tr><th>Date</th><th>Merchant</th><th>Category</th><th>Amount</th></tr>
          ${transactions.map(t => `
            <tr>
              <td>${t.date}</td>
              <td>${t.merchant}</td>
              <td>${t.category}</td>
              <td class="amount">$${typeof t.amount === 'number' ? t.amount.toFixed(2) : parseFloat(t.amount || 0).toFixed(2)}</td>
            </tr>
          `).join('')}
        </table>
      </body>
    </html>
  `;

  const { uri } = await Print.printToFileAsync({ html: htmlContent });
  await Sharing.shareAsync(uri);
};

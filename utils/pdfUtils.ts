import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// Function to generate a beautiful, formatted PDF for poems
export const generatePoemPDF = async (title: string, content: string, poetName: string = "Aman Kumar Singh") => {
  // Create a temporary HTML structure for the PDF
  const pdfContent = `
    <div style="
      font-family: serif;
      padding: 40px;
      max-width: 600px;
      margin: 0 auto;
      line-height: 1.8;
    ">
      <div style="
        text-align: center;
        border-bottom: 2px solid #38bdf8;
        padding-bottom: 20px;
        margin-bottom: 30px;
      ">
        <h1 style="
          font-size: 28px;
          color: #1e293b;
          margin: 0;
          font-weight: bold;
        ">${poetName}</h1>
        <p style="
          font-size: 14px;
          color: #64748b;
          margin-top: 8px;
        ">Poet, Writer & Creator</p>
      </div>
      
      <div style="
        background: linear-gradient(to right, #e0f2fe, #dbeafe);
        padding: 25px;
        border-radius: 10px;
        margin: 20px 0;
        border-left: 4px solid #38bdf8;
      ">
        <h2 style="
          color: #0f172a;
          font-size: 18px;
          margin: 0 0 15px 0;
          text-align: center;
        ">Situation for this poem:</h2>
        <p style="
          color: #334155;
          font-style: italic;
          margin: 0;
          text-align: center;
        ">A moment of introspection and deep emotional reflection, where one contemplates the nature of existence, solitude, and resilience.</p>
      </div>
      
      <h2 style="
        font-size: 24px;
        color: #0f172a;
        text-align: center;
        margin: 30px 0 20px 0;
        font-weight: bold;
      ">${title}</h2>
      
      <div style="
        background: #f8fafc;
        padding: 25px;
        border-radius: 8px;
        margin: 20px 0;
        border: 1px solid #e2e8f0;
      ">
        <h3 style="
          color: #38bdf8;
          font-size: 16px;
          margin: 0 0 15px 0;
          border-bottom: 1px dashed #cbd5e1;
          padding-bottom: 8px;
        ">Complex Words & Meanings:</h3>
        <ul style="padding-left: 20px; color: #475569;">
          <li style="margin-bottom: 8px;"><strong>इंतहाँ</strong> (Intaha) - Limit, Extremity, End point</li>
          <li style="margin-bottom: 8px;"><strong>ख़ुद में</strong> (Khud mein) - Within oneself</li>
          <li style="margin-bottom: 8px;"><strong>मुक़ाबिल</strong> (Mukābil) - Equivalent, Match</li>
          <li style="margin-bottom: 8px;"><strong>अकेलेपन</strong> (Akēlapan) - Loneliness, Solitude</li>
          <li style="margin-bottom: 8px;"><strong>जनाज़े</strong> (Janāze) - Funeral procession</li>
          <li style="margin-bottom: 8px;"><strong>क़ाबिल</strong> (Qābil) - Worthy, Capable of</li>
        </ul>
      </div>
      
      <div style="
        white-space: pre-line;
        font-size: 18px;
        color: #1e293b;
        text-align: center;
        margin: 30px 0;
        padding: 20px;
        font-style: italic;
        background: #f1f5f9;
        border-radius: 8px;
      ">${content}</div>
      
      <div style="
        text-align: right;
        font-size: 16px;
        color: #64748b;
        font-style: italic;
        margin-top: 30px;
        padding-top: 20px;
        border-top: 1px solid #e2e8f0;
      ">
        - ${poetName}
      </div>
      
      <div style="
        text-align: center;
        margin-top: 40px;
        padding-top: 20px;
        border-top: 1px solid #e2e8f0;
        color: #94a3b8;
        font-size: 12px;
      ">
        © ${new Date().getFullYear()} ${poetName}. All rights reserved.
      </div>
    </div>
  `;

  // Create a temporary element to hold the content
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = pdfContent;
  tempDiv.style.position = 'absolute';
  tempDiv.style.left = '-9999px';
  tempDiv.style.top = '0';
  tempDiv.style.width = '210mm'; // A4 width
  tempDiv.style.minHeight = '297mm'; // A4 height
  tempDiv.style.backgroundColor = 'white';
  
  document.body.appendChild(tempDiv);

  try {
    // Use html2canvas to convert the HTML to canvas
    const canvas = await html2canvas(tempDiv, { 
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff'
    });

    // Create PDF
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    // Add additional pages if content is longer
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    // Save the PDF
    pdf.save(`${title.replace(/\s+/g, '_')}_-_Aman_Kumar_Singh.pdf`);
  } catch (error) {
    console.error('Error generating PDF:', error);
    alert('There was an error generating the PDF. Please try again.');
  } finally {
    // Clean up the temporary element
    document.body.removeChild(tempDiv);
  }
};

// Function to extract text content from React nodes
export const extractTextFromNodes = (children: React.ReactNode): string => {
  let text = '';
  
  const processNode = (node: React.ReactNode) => {
    if (typeof node === 'string' || typeof node === 'number') {
      text += node;
    } else if (React.isValidElement(node)) {
      if (node.type === 'br') {
        text += '\n';
      } else if (node.props.children) {
        React.Children.forEach(node.props.children, processNode);
      }
    } else if (Array.isArray(node)) {
      node.forEach(processNode);
    }
  };
  
  React.Children.forEach(children, processNode);
  
  return text;
};
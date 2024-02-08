"use client";

import React, { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Button } from "reactstrap";

function template() {
  const pdfRef = useRef<HTMLDivElement>(null);
  const html2pdf = require("html2pdf.js");


  // const downloadPFD = () => {
  //   const htmlContent = `
  //   <div className="relative overflow-x-auto" ref={pdfRef}>
  //   <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
  //     <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
  //       <tr>
  //         <th scope="col" className="px-6 py-3">
  //           Product name
  //         </th>
  //         <th scope="col" className="px-6 py-3">
  //           Color
  //         </th>
  //         <th scope="col" className="px-6 py-3">
  //           Category
  //         </th>
  //         <th scope="col" className="px-6 py-3">
  //           Price
  //         </th>
  //       </tr>
  //     </thead>
  //     <tbody>
  //       <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
  //         <th
  //           scope="row"
  //           className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
  //         >
  //           Apple MacBook Pro 17"
  //         </th>
  //         <td className="px-6 py-4">Silver</td>
  //         <td className="px-6 py-4">Laptop</td>
  //         <td className="px-6 py-4">$2999</td>
  //       </tr>
  //       <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
  //         <th
  //           scope="row"
  //           className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
  //         >
  //           Microsoft Surface Pro
  //         </th>
  //         <td className="px-6 py-4">White</td>
  //         <td className="px-6 py-4">Laptop PC</td>
  //         <td className="px-6 py-4">$1999</td>
  //       </tr>
  //       <tr className="bg-white dark:bg-gray-800">
  //         <th
  //           scope="row"
  //           className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
  //         >
  //           Magic Mouse 2
  //         </th>
  //         <td className="px-6 py-4">Black</td>
  //         <td className="px-6 py-4">Accessories</td>
  //         <td className="px-6 py-4">$99</td>
  //       </tr>
  //     </tbody>
  //   </table>
  // </div>
  // `;
  // // const input: any = document.createElement('div');
  // // input.innerHTML = htmlContent;
  //   const input:any = pdfRef.current;
  //   console.log("Input",input)
  //   html2canvas(input).then((canvas) => {
  //     const ImgData = canvas.toDataURL("image/png");
  //     const pdf = new jsPDF('p','mm','a4',true);
  //     const pdfWidth = pdf.internal.pageSize.getWidth();
  //     const pdfHeight = pdf.internal.pageSize.getHeight();
  //     const imgHeight = canvas.height
  //     const imgWidth = canvas.width
  //     const ratio = Math.min(pdfWidth/imgWidth, pdfHeight/imgHeight)
  //     const imgX = (pdfWidth-imgWidth * ratio)
  //     const imgY = 30
  //     pdf.addImage(ImgData,'PNG', imgX, imgY,imgWidth * ratio ,imgHeight * ratio)
  //     pdf.save('invoice.pdf')
  //   })
  //   console.log("Call");
  // };
  const downloadPDF = async () => {
    let html: any = await fetch(
      `/template/invoiceReport.html`
    );
    html = await html.text();
    html = html
    .toString()
    console.log(html)
    const opt = {
      margin: [20, 20, 20, 20],
      zoom: "100%",
      filename: "test.pdf",
      image: { type: "jpeg", quality: 1 },
      html2canvas: {
        dpi: 192,
        scale: 4,
        letterRendering: true,
        useCORS: true,
        scrollY: 0,
      },
      jsPDF: { unit: "pt", format: "a4", orientation: "landscape" },
    };
    console.log("html", html);
    // Generate PDF using html2pdf
    html2pdf()
      .set(opt)
      .from(html)
      .toPdf()
      .get("pdf")
      .output("dataurlnewwindow");
    // html = html.replace
  };
    // const opt = {
    //   margin: [10, 10, 10, 10],
    //   filename: "invoice-report.pdf",
    //   image: { type: "jpeg", quality: 0.2 },
    //   html2canvas: { scale: 4, useCORS: true },
    //   // pagebreak: { mode: ['avoid-all', 'css'], before: '#firstPageContent' }, // Add this line
    //   jsPDF: { unit: "pt", format: "a4", orientation: "landscape" },
    // };
    // const htmlContent = html;
    // const pdfFromHtml = async () => {
    //   try {
    //     const result = await html2pdf().set(opt).from(htmlContent).output("pdf");
    //     // Check if the result has an 'output' property and it's a valid Uint8Array

    //     return result;

    //   } catch (error) {
    //     throw error; // Rethrow the error for better debugging
    //   }
    // };
    // const generatedPdf: any = await pdfFromHtml();
    // return generatedPdf
    //   // setNewPDF(generatedPdf)
    //   ;
  
  


  return (
    <div>
      <div className="relative overflow-x-auto" ref={pdfRef}>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Product name
              </th>
              <th scope="col" className="px-6 py-3">
                Color
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Apple MacBook Pro 17"
              </th>
              <td className="px-6 py-4">Silver</td>
              <td className="px-6 py-4">Laptop</td>
              <td className="px-6 py-4">$2999</td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Microsoft Surface Pro
              </th>
              <td className="px-6 py-4">White</td>
              <td className="px-6 py-4">Laptop PC</td>
              <td className="px-6 py-4">$1999</td>
            </tr>
            <tr className="bg-white dark:bg-gray-800">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Magic Mouse 2
              </th>
              <td className="px-6 py-4">Black</td>
              <td className="px-6 py-4">Accessories</td>
              <td className="px-6 py-4">$99</td>
            </tr>
          </tbody>
        </table>
      </div>
      <Button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-4"
        onClick={downloadPDF}
      >
        Download
      </Button>
    </div>
  );
}

export default template;

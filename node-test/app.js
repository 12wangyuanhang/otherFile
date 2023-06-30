const fs = require('fs');
const PdfExtract = require('pdf-extract');
// // console.log(fs);
// const pdfFile = fs.readFileSync('./111.pdf');
// // const pdfFile = fs.readFileSync('./j.txt');
// // const pdfFile = fs.readFileSync('./bailian.pdf');
// console.log(pdfFile)
// let cnPdf = pdfFile.toString();
// console.log(cnPdf, 'pdfFile');
const filePath = '111.pdf';
const pdfExtract = new PdfExtract(filePath, {
    type: 'text'
}, (err)=>{
    console.log(err,1234)
});
console.log(pdfExtract, 'pdfExtract')
// pdfExtract.extract((err, data) => {
//     if (err) {
//         console.log(err)
//         return;
//     }
//     console.log(data.text_pages.join('\n'))
// });
// function readPdfFile(filePath) {
//         console.log(123145)
//     return new Promise((resolve, reject) => {
        
//     });
// }


// 示例：读取指定路径下的PDF文件内容

// readPdfFile(filePath).then(content => {
//   console.log(content); // 输出PDF文件的内容
// }).catch(err => {
//   console.error(err);
// });
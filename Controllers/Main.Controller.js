const constants = require("../constants");
const fs = require('fs');
const path = require('path');
const Excel = require('exceljs');
var workbook = new Excel.Workbook();
module.exports = {
   testapi: async (req, res, next) => {
    try {
      console.log("/api/testapi ");
      res.send({ status: constants.STATUS.SUCCESS, statusCode: constants.STATUS_CODE.SUCCESS});
      next();
    } catch (error) {
      next(error)
    }
  },
  readProcessExcelFile: async (req, res, next) => {
    try {
        const fileLocation = req.file.filename
        console.log("readProcessExcelFile() BEGIN with file ", fileLocation);  
        await workbook.xlsx.readFile(fileLocation)
        .then(function() {
          let theData = [];
          let totalColumns = 0;
          workbook.eachSheet((ws, sheetId) => { 
            totalColumns = ws.actualColumnCount;
            for(let x = 2; x <= ws.actualRowCount; x++) { 
              for (let y=2; y <= ws.actualColumnCount; y++) { 
                let replaceStr =  ws.getRow(x).getCell(y).value;
                theData.push(replaceStr);
              } 
            }
            calculateWorkstreamAutomation(totalColumns, theData, workbook);
          });
        });
        console.log("readProcessExcelFile() END with status  :: ", constants.STATUS.SUCCESS);  
        res.send({ status: constants.STATUS.SUCCESS, statusCode: constants.STATUS_CODE.SUCCESS});
        next();
    } catch (error) {
      next(error)
    }
  } 
}

const calculateWorkstreamAutomation = (totalColumns, theData, workbook) =>{
  let worksheet = workbook.getWorksheet(1);
  const len = theData.length;
  let row = worksheet.getRow(1);
  
  row.getCell(totalColumns + 1).value = "Rules";
  row.font = { bold: true };
  row.getCell(totalColumns + 1).fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "2563EB" },
      bgColor:{argb:'FFD8D8D8'}
  };
  row.commit();
  for(let i =0;i<len;i++){
    let row = worksheet.getRow(i+2);
    row.getCell(totalColumns + 1).value = replaceData(theData[i]);
    row.height = 80;
    row.getCell(totalColumns + 1).alignment = { vertical: 'top', horizontal: 'left',wrapText: true };
    row.commit();
  }
  AdjustColumnWidth(worksheet);

  return workbook.xlsx.writeFile('EWNworkstreamAutomationOutput.xlsx'); 
}

function replaceData(theData){
  let returnStr='';
  let splitArr;
  if(theData.includes('|')) {
    if(theData.includes('&')) {
      const index1 = theData.indexOf("|");
      const index2 = theData.indexOf("&");
      if(index1 < index2) {
        theData = theData.replace("(",""); 
        splitArr= theData.split("|");
        let secondStr = splitArr[1].split("&");
        if(theData.includes(')')) {
          returnStr =`{"if":[\n{"missing_some":[1,["${splitArr[0]}", "dummy"]]},\n{"missing":["${secondStr[0]}","${secondStr[1]}"]},\n"OK"\n]}`;
        } else {
          returnStr =`{"if":[\n{"missing_some":[1,["${splitArr[0]}", "${secondStr[0]}", "dummy"]]},\n{"missing":["${secondStr[1]}"]},\n"OK"\n]}`;
        }
        
      } else {
        theData = theData.replace("(","");
        splitArr= theData.split("&");
        let secondStr = splitArr[1].split("|");
        returnStr = `{"if":[\n{"missing":["${splitArr[0]}", "${secondStr[0]}"]},\n{"missing_some":[1,["${secondStr[1]}", "dummy"]]},\n  "OK"\n]}`;

      }
    } else {
      splitArr= theData.split("|");
      let readyStr=''; 
      splitArr.forEach((item)=>{
        readyStr =readyStr + `"${item}",`
      })
      returnStr = `{"missing_some":[1,[${readyStr}"dummy"]]}`;

    }
  } else if(theData.includes(',')){
    splitArr= theData.split(",");
    returnStr = `{"missing":["${splitArr[0]}", "${splitArr[1]}"]}`;
  } else if(theData.includes('&')){
    splitArr= theData.split("&");
    returnStr = `{"missing":["${splitArr[0]}", "${splitArr[1]}"]}`;
  } else {
    theData = theData.replace("`","");
    returnStr = `{"missing_some":[1,["${theData}", "dummy"]]}`;
  }
  return returnStr;
}
function  AdjustColumnWidth(worksheet) {
  worksheet.columns.forEach(column => {
    const lengths = column.values.map(v => (v.toString().length+5));
    const maxLength = Math.max(...lengths.filter(v => typeof v === 'number'));
    column.width = maxLength;
  });
}


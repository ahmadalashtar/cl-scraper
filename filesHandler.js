const fs = require("fs");

let counter = 0;

fs.readFile("./output.txt", (err, data11) => {
  if (err) {
    console.error(err);
    return;
  }

  fs.readFile("./left.txt", (err, data22) => {
    if (err) {
      console.error(err);
      return;
    }

    const data1 = data11.toString();
    const data2 = data22.toString();
    let lines1 = data1.split("https")
    let lines2 = data2.split("https")
    
    for (let line1 of lines1) {
      for (let line2 of lines2) {
        if (line1.split("/").filter((e)=>{e!=''})[3] === line2.split("/").filter((e)=>{e!=''})[3]) {
          lines1 = lines1.filter(l => l !== line1);
          lines2 = lines2.filter(l => l !== line2);
        }  
      }
    }
    
    fs.writeFile("./outputAfterFiltering.txt", lines1.join("\n"), err => {
      if (err) {
        console.error(err);
      } 
    });
    
    fs.writeFile("./leftAfterFiltering.txt", lines2.join("\n"), err => {
      if (err) {
         console.error(err);
      }
    });
  });
});
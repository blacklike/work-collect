const path = require('path')
const fs = require('fs')
// const chalk = require('chalk')
// const inquirer = require('inquirer')
const glob = require('glob')

const srcDir = path.resolve(process.cwd(), './src/pages')

function completeEntry (entry) {
  const entryPage = `${srcDir}/${entry}`
  return entryPage
}

exports.getEntryPath = () => {
  const getEntryPath = './src/*/*'
  return getEntryPath
}

// exports.getEntrys = function () {
//   const { ENABLED_PAGES = '' } = process.env
//   const entry = {};
  
//   const developerEntry = (process.argv[4] && process.argv[4].trim());
//   let tmpArr = [];

//   if (developerEntry) {
//       tmpArr = developerEntry.split(',');
//   } else {
//       const tmpDir =  path.join(__dirname, '../src/pages');
//       tmpArr = fs.readdirSync(tmpDir);
//       console.log(tmpArr);
//   }

//   const ENABLED_PAGES_ARR = ENABLED_PAGES.split(',')

//   tmpArr.forEach(v => {
//       if (ENABLED_PAGES) {
//           if (ENABLED_PAGES_ARR.includes(v)) {
//               entry[`${v}/index`] = `./src/pages/${v}/index.jsx`;
//           }
//       } else {
//           entry[`${v}/index`] = `./src/pages/${v}/index.jsx`;
//       }
//   });

//   return entry;
// };

exports.getEntrys = globPath => {
  const entries = {}
  glob.sync(globPath).forEach(page => {
    const pageArr = page.split('/').splice(-2)
    if (pageArr[0] !== 'pages') return
    const entry = completeEntry(pageArr[1])
    entries[`${pageArr[1]}/index`] = entry
  })
  return entries
}
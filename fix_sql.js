const fs = require('fs');
const path = 'src/config/data/ie104_group2.sql';
let data = fs.readFileSync(path, 'utf8');
data = data.replace(/DEFINER=`root`@`localhost`/g, '');
fs.writeFileSync(path, data);
console.log('Done!');

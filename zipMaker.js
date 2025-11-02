const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

const output = fs.createWriteStream(path.join(__dirname , 'project.zip'));
const archive = archiver('zip' , {zlib : {level : 9}});

output.on('close' , ()=>{
    console.log(`Zip file created ${archive.pointer()}`);
})

output.on('error' , (err)=>{
    throw err;
});

archive.pipe(output);

archive.glob('**/*' , {
    ignore : ['node_modules/**' , 'project.zip']
});

archive.finalize();
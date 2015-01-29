var fs = require('fs');
var bz2 = require('../bzip2');

var compressed = fs.readFileSync('vmlinux.bin.bz2');
var result = bz2.simple(bz2.array(new Uint8Array(compressed)));
fs.writeFileSync('uncompressed', new Buffer(result));
console.log(result.length);

/*
Because you don't have issues enabled on your repo, I sent this pull request.

The short program above produces output that differes from the output of

    bzip -d vmlinux.bin.bz2

$ bzip2 --version
Version 1.0.6, 6-Sept-2010.

starting at offset 00dbba0, which is where the output of the 2nd decompressed block starts. Also, the output is too short by roughly 40k.

-rwxr-xr-x  1 regular  staff  5168676 Jan 29 21:30 vmlinux.bin
-rw-r--r--  1 regular  staff  5123234 Jan 29 21:34 uncompressed
   
diff <(xxd uncompressed) <(xxd vmlinux.bin.bz2)|head
56251,65257c56251,65257
< 00dbba0: 1000 000a 1500 0000 a843 0000 8463 0008  .........C...c..
< 00dbbb0: 07ff f9cd 9c63 0010 0400 ec50 8462 0004  .....c.....P.b..
< 00dbbc0: 07ff 4db9 a862 0000 9c21 000c 8521 fffc  ..M..b...!...!..
< 00dbbd0: 8421 fff4 4400 4800 8441 fff8 d7e1 17f0  .!..D.H..A......º
..

You can find the file for testing here:
http://s-macke.github.io/jor1k/bin/vmlinux.bin.bz2

Hope this helps!

*/

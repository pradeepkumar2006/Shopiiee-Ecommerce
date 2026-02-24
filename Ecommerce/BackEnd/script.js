const fs = require('fs');

const products = [
    { title: "Apple AirTag (4 Pack)", price: 8900, cat: "Electronics", desc: "Keep track of your keys, wallet, luggage, and more.", img: "https://images.unsplash.com/photo-1627989580309-bfaf3e58af6f?w=800&q=80" },
    { title: "Sony ZV-1 Vlogging Camera", price: 69990, cat: "Electronics", desc: "Digital camera optimized for vlogging and content creation.", img: "https://images.unsplash.com/photo-1599805445214-9ffdfb7f941f?w=800&q=80" },
    { title: "Nintendo Switch Pro Controller", price: 6990, cat: "Gaming", desc: "Premium wireless controller for Nintendo Switch.", img: "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=800&q=80" },
    { title: "Bose SoundLink Flex", price: 15900, cat: "Electronics", desc: "Bluetooth portable speaker, waterproof design.", img: "https://images.unsplash.com/photo-1634840884179-467406a64390?w=800&q=80" },
    { title: "Nikon Z FC Mirrorless", price: 95990, cat: "Electronics", desc: "Classic design with modern mirrorless technology.", img: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&q=80" },
    { title: "Kindle Oasis", price: 21999, cat: "Electronics", desc: "7\" display, adjustable warm light, waterproof.", img: "https://images.unsplash.com/photo-1455355605553-62efcbb2bf0f?w=800&q=80" },
    { title: "Corsair K70 RGB PRO", price: 16999, cat: "Computers", desc: "Mechanical gaming keyboard with aluminum frame.", img: "https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&q=80" },
    { title: "Logitech Brio 4K Webcam", price: 19995, cat: "Computers", desc: "Ultra HD Pro webcam for video conferencing.", img: "https://images.unsplash.com/photo-1626218174358-7769486c4b79?w=800&q=80" },
    { title: "Dyson Airwrap Multi-Styler", price: 49900, cat: "Home", desc: "Curl, shape, smooth, and hide flyaways with Coanda airflow.", img: "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=800&q=80" },
    { title: "Smeg Retro 2-Slice Toaster", price: 15500, cat: "Kitchen", desc: "Vintage 50s aesthetic with multiple browning settings.", img: "https://images.unsplash.com/photo-1542456070-e610d32bb3da?w=800&q=80" },
    { title: "JBL Charge 5", price: 14999, cat: "Electronics", desc: "Portable Bluetooth speaker with IP67 rating.", img: "https://images.unsplash.com/photo-1612445173322-2b62d29cb1f4?w=800&q=80" },
    { title: "Beats Fit Pro", price: 19900, cat: "Electronics", desc: "True wireless noise cancelling earbuds.", img: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&q=80" },
    { title: "Fender Player Stratocaster", price: 79990, cat: "Instruments", desc: "Classic electric guitar with 3 single-coil pickups.", img: "https://images.unsplash.com/photo-1564186595604-20a221f73cfc?w=800&q=80" },
    { title: "Yamaha P-45 Digital Piano", price: 45000, cat: "Instruments", desc: "88-key weighted action digital piano.", img: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=800&q=80" },
    { title: "Weber Original Kettle Premium", price: 21990, cat: "Home", desc: "22-inch charcoal grill.", img: "https://images.unsplash.com/photo-1582200155097-483549effdb8?w=800&q=80" }
];

const jsFile = './data/products.js';
const sqlFile = './final_setup.sql';

let jsContent = fs.readFileSync(jsFile, 'utf8');

// The last ID inserted was 50 (from 16 + 34)
products.forEach((p, i) => {
    let id = 51 + i;
    let entry = `    {
        id: ${id},
        name: "${p.title}",
        price: ${p.price},
        category: "${p.cat}",
        description: "${p.desc}",
        image: "${p.img}"
    }`;
    jsContent = jsContent.replace('];', `,\n${entry}\n];`);
});

fs.writeFileSync(jsFile, jsContent, 'utf8');

let sqlContent = fs.readFileSync(sqlFile, 'utf8');
let sqlInsert = "";
products.forEach((p) => {
    let safeDesc = p.desc.replace(/'/g, "''");
    let safeTitle = p.title.replace(/'/g, "''");
    sqlInsert += `('${safeTitle}', ${p.price}, '${p.cat}', '${safeDesc}', '${p.img}'),\n`;
});

sqlContent = sqlContent.replace(/('Spalding NBA Official Basketball', 6500, 'Sports', 'Genuine leather indoor basketball.', 'https:\/\/images.unsplash.com\/photo-1519861531473-920026218dbbf\?w=800&q=80');/,
    `'Spalding NBA Official Basketball', 6500, 'Sports', 'Genuine leather indoor basketball.', 'https://images.unsplash.com/photo-1519861531473-920026218dbbf?w=800&q=80'),\n` + sqlInsert.slice(0, -2) + ';');


fs.writeFileSync(sqlFile, sqlContent, 'utf8');
console.log("Added 15 MORE products!");

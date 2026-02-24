const products = [
    {
        id: 1,
        name: "Sony WH-1000XM5 Wireless Headphones",
        price: 29990,
        category: "Electronics",
        description: "Industry leading noise cancellation, 30-hour battery life, and superior call quality. Perfect for travel or office work.",
        image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800&q=80"
    },
    {
        id: 2,
        name: "Apple Watch Series 9",
        price: 41900,
        category: "Electronics",
        description: "Advanced health tracking, brighter display, and crack-resistant crystal. Includes ECG and Blood Oxygen apps.",
        image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&q=80"
    },
    {
        id: 3,
        name: "Nike Air Max 2024 Men's Running Shoes",
        price: 12495,
        category: "Fashion",
        description: "Max Air cushioning, breathable mesh upper, and durable rubber outsole for maximum performance and style.",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80"
    },
    {
        id: 4,
        name: "Levi's Classic Denim Jacket",
        price: 4500,
        category: "Fashion",
        description: "Timeless denim jacket with a regular fit and button closures. Made with premium quality cotton.",
        image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800&q=80"
    },
    {
        id: 5,
        name: "Fossil Gen 6 Smartwatch",
        price: 23995,
        category: "Accessories",
        description: "Stainless steel touchscreen smartwatch with heart rate, GPS, contactless payments, and smartphone notifications.",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80"
    },
    {
        id: 6,
        name: "Dell XPS 13 Laptop",
        price: 135000,
        category: "Computers",
        description: "13.4\" FHD+ display, Intel Core i7 12th Gen, 16GB RAM, 512GB SSD. Ultra-thin, light, and powerful.",
        image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&q=80"
    },
    {
        id: 7,
        name: "Samsung Galaxy S24 Ultra",
        price: 129999,
        category: "Mobiles",
        description: "Epical camera system, built-in S-Pen, and Snapdragon 8 Gen 3 processor. The ultimate productivity machine.",
        image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800&q=80"
    },
    {
        id: 8,
        name: "Kindle Paperwhite (11th Gen)",
        price: 13999,
        category: "Electronics",
        description: "Now with a 6.8\" display and thinner borders, adjustable warm light, up to 10 weeks of battery life, and 20% faster page turns.",
        image: "https://images.unsplash.com/photo-1592496001020-d31bd830651f?w=800&q=80"
    },
    {
        id: 9,
        name: "Bose SoundLink Micro Bluetooth Speaker",
        price: 8990,
        category: "Electronics",
        description: "Small portable speaker, waterproof (IP67), tear-resistant strap, robust design. Up to 6 hours play time.",
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&q=80"
    },
    {
        id: 10,
        name: "Herschel Little America Backpack",
        price: 9500,
        category: "Accessories",
        description: "Classic mountaineering style, elevated function. Padded and fleece lined 15\" laptop sleeve, internal media pocket.",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80"
    },
    {
        id: 11,
        name: "Logitech MX Master 3S Wireless Mouse",
        price: 8495,
        category: "Electronics",
        description: "Ergonomic mouse with ultra-fast scrolling, 8K DPI tracking on any surface, and quiet clicks.",
        image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&q=80"
    },
    {
        id: 12,
        name: "Ray-Ban Classic Aviator Sunglasses",
        price: 7500,
        category: "Fashion",
        description: "Iconic aviator sunglasses with gold frame and green classic G-15 lenses. 100% UV protection.",
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80"
    },
    {
        id: 13,
        name: "Nespresso Vertuo Next Coffee Machine",
        price: 16999,
        category: "Kitchen",
        description: "Brews a wide range of coffees at the touch of a button. Slim fit design, made from 54% recycled plastics.",
        image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&q=80"
    },
    {
        id: 14,
        name: "Apple iPad Air (5th Gen)",
        price: 54900,
        category: "Computers",
        description: "10.9-inch Liquid Retina display, breakthrough Apple M1 chip, and 12MP Ultra Wide front camera with Center Stage.",
        image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&q=80"
    },
    {
        id: 15,
        name: "Dyson V15 Detect Vacuum Cleaner",
        price: 64900,
        category: "Home",
        description: "Reveals microscopic dust. Automatically adapts suction power. Scientific proof of a deep clean.",
        image: "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=800&q=80"
    }
    ,
    {
        id: 16,
        name: "Canon EOS R5",
        price: 339990,
        category: "Electronics",
        description: "45MP full-frame mirrorless camera with 8K video.",
        image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80"
    }
    ,
    {
        id: 17,
        name: "Nintendo Switch OLED",
        price: 34990,
        category: "Gaming",
        description: "7-inch OLED screen, 64GB internal storage.",
        image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800&q=80"
    }
    ,
    {
        id: 18,
        name: "Sony PlayStation 5",
        price: 54990,
        category: "Gaming",
        description: "Next-gen gaming console with ultra-fast SSD.",
        image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=800&q=80"
    }
    ,
    {
        id: 19,
        name: "Xbox Series X",
        price: 55990,
        category: "Gaming",
        description: "The fastest, most powerful Xbox ever.",
        image: "https://images.unsplash.com/photo-1605901309584-818e25960b8f?w=800&q=80"
    }
    ,
    {
        id: 20,
        name: "MacBook Pro M3 Max",
        price: 319900,
        category: "Computers",
        description: "16-inch Liquid Retina XDR display, M3 Max chip.",
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80"
    }
    ,
    {
        id: 21,
        name: "Logitech G Pro X Superlight",
        price: 13995,
        category: "Electronics",
        description: "Ultra-lightweight wireless gaming mouse.",
        image: "https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&q=80"
    }
    ,
    {
        id: 22,
        name: "Keychron Q1 Pro",
        price: 18999,
        category: "Electronics",
        description: "Custom mechanical keyboard with QMK/VIA support.",
        image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800&q=80"
    }
    ,
    {
        id: 23,
        name: "LG UltraGear 27-inch Monitor",
        price: 32500,
        category: "Computers",
        description: "1440p 165Hz Nano IPS Gaming Monitor.",
        image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&q=80"
    }
    ,
    {
        id: 24,
        name: "Samsung 990 PRO 2TB SSD",
        price: 17999,
        category: "Computers",
        description: "PCIe 4.0 NVMe M.2 internal solid state drive.",
        image: "https://images.unsplash.com/photo-1597843786411-a83a48e79e60?w=800&q=80"
    }
    ,
    {
        id: 25,
        name: "Secretlab Titan Evo",
        price: 42990,
        category: "Home",
        description: "Premium gaming chair with ergonomic support.",
        image: "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=800&q=80"
    }
    ,
    {
        id: 26,
        name: "Nike Air Force 1 '07",
        price: 8495,
        category: "Fashion",
        description: "Classic lifestyle sneakers with crisp leather.",
        image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80"
    }
    ,
    {
        id: 27,
        name: "Adidas Ultraboost Light",
        price: 15999,
        category: "Fashion",
        description: "Lightweight running shoes with amazing energy return.",
        image: "https://images.unsplash.com/photo-1588629555189-cdb3c10faee4?w=800&q=80"
    }
    ,
    {
        id: 28,
        name: "Puma RS-X3 Puzzle",
        price: 9999,
        category: "Fashion",
        description: "Retro-running inspired sneakers with bulky silhouette.",
        image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&q=80"
    }
    ,
    {
        id: 29,
        name: "Vans Old Skool",
        price: 4500,
        category: "Fashion",
        description: "Classic skate shoe with iconic sidestripe.",
        image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&q=80"
    }
    ,
    {
        id: 30,
        name: "Converse Chuck Taylor All Star",
        price: 3500,
        category: "Fashion",
        description: "High top canvas sneakers, timeless design.",
        image: "https://images.unsplash.com/photo-1607522370275-a1bb15668ca7?w=800&q=80"
    }
    ,
    {
        id: 31,
        name: "Rolex Submariner",
        price: 950000,
        category: "Accessories",
        description: "Classic divers watch, stainless steel case.",
        image: "https://images.unsplash.com/photo-1587836173429-1a91e5e05c86?w=800&q=80"
    }
    ,
    {
        id: 32,
        name: "Casio G-Shock GA-2100",
        price: 8995,
        category: "Accessories",
        description: "Carbon Core Guard structure, octagonal bezel.",
        image: "https://images.unsplash.com/photo-1629851722830-a92ef6f968bd?w=800&q=80"
    }
    ,
    {
        id: 33,
        name: "Seiko 5 Sports",
        price: 21500,
        category: "Accessories",
        description: "Automatic mechanical watch with nylon strap.",
        image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&q=80"
    }
    ,
    {
        id: 34,
        name: "Oakley Holbrook Sunglasses",
        price: 11000,
        category: "Fashion",
        description: "Classic design with modern Oakley technology.",
        image: "https://images.unsplash.com/photo-1577803645773-f96470509666?w=800&q=80"
    }
    ,
    {
        id: 35,
        name: "Patagonia Better Sweater",
        price: 12500,
        category: "Fashion",
        description: "Warm, full-zip fleece jacket made of recycled polyester.",
        image: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=800&q=80"
    }
    ,
    {
        id: 36,
        name: "The North Face Nuptse Jacket",
        price: 24999,
        category: "Fashion",
        description: "Iconic insulated puffer jacket.",
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80"
    }
    ,
    {
        id: 37,
        name: "YETI Rambler 20 oz Tumbler",
        price: 3500,
        category: "Home",
        description: "Stainless steel vacuum insulated tumbler with MagSlider.",
        image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=800&q=80"
    }
    ,
    {
        id: 38,
        name: "Hydro Flask 32 oz Wide Mouth",
        price: 4200,
        category: "Sports",
        description: "Double wall vacuum insulated water bottle.",
        image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&q=80"
    }
    ,
    {
        id: 39,
        name: "Manduka PRO Yoga Mat",
        price: 11999,
        category: "Sports",
        description: "High-density cushion for unparalleled experience and joint protection.",
        image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800&q=80"
    }
    ,
    {
        id: 40,
        name: "Bowflex SelectTech 552 Dumbbells",
        price: 35000,
        category: "Sports",
        description: "Adjustable dumbbells from 5 to 52.5 lbs.",
        image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&q=80"
    }
    ,
    {
        id: 41,
        name: "Theragun Pro",
        price: 44990,
        category: "Sports",
        description: "Smart percussive therapy device for muscle recovery.",
        image: "https://images.unsplash.com/photo-1573351918384-3c94f57c1dd3?w=800&q=80"
    }
    ,
    {
        id: 42,
        name: "Garmin Fenix 7 Sapphire Solar",
        price: 85990,
        category: "Accessories",
        description: "Multisport GPS watch with solar charging.",
        image: "https://images.unsplash.com/photo-1508685096489-7aac743f055a?w=800&q=80"
    }
    ,
    {
        id: 43,
        name: "GoPro HERO12 Black",
        price: 39990,
        category: "Electronics",
        description: "Waterproof action camera with 5.3K video.",
        image: "https://images.unsplash.com/photo-1563533967838-8fa82b5dccc3?w=800&q=80"
    }
    ,
    {
        id: 44,
        name: "DJI Mini 4 Pro Drone",
        price: 89990,
        category: "Electronics",
        description: "Lightweight, foldable drone with 4K HDR video.",
        image: "https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?w=800&q=80"
    }
    ,
    {
        id: 45,
        name: "Bose QuietComfort Ultra",
        price: 35900,
        category: "Electronics",
        description: "World-class noise cancellation and immersive spatial audio.",
        image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&q=80"
    }
    ,
    {
        id: 46,
        name: "Anker PowerCore 26800mAh",
        price: 6500,
        category: "Accessories",
        description: "Portable charger with dual input port and double-speed recharging.",
        image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=800&q=80"
    }
    ,
    {
        id: 47,
        name: "Belkin MagSafe 3-in-1 Charger",
        price: 14999,
        category: "Accessories",
        description: "Fast wireless charging station for iPhone, Apple Watch, and AirPods.",
        image: "https://images.unsplash.com/photo-1615526675159-e248cba0e7fb?w=800&q=80"
    }
    ,
    {
        id: 48,
        name: "Philips Hue Starter Kit",
        price: 16999,
        category: "Home",
        description: "Smart bulb kit with Hue Bridge. Voice control compatible.",
        image: "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?w=800&q=80"
    }
    ,
    {
        id: 49,
        name: "Echo Show 10 (3rd Gen)",
        price: 24999,
        category: "Home",
        description: "HD smart display with motion and Alexa.",
        image: "https://images.unsplash.com/photo-1543512214-318c7553f230?w=800&q=80"
    }
    ,
    {
        id: 50,
        name: "Roomba j7+ Robot Vacuum",
        price: 69900,
        category: "Home",
        description: "Identifies and avoids obstacles, empties itself.",
        image: "https://images.unsplash.com/photo-1614725350482-6f29fb6fb460?w=800&q=80"
    }
    ,
    {
        id: 51,
        name: "Vitamix 5200 Blender",
        price: 45000,
        category: "Kitchen",
        description: "Professional-grade blender with 64 oz container.",
        image: "https://images.unsplash.com/photo-1585237836334-a1e6789b7fae?w=800&q=80"
    }
    ,
    {
        id: 52,
        name: "Le Creuset Dutch Oven",
        price: 32500,
        category: "Kitchen",
        description: "Cast iron 5.5 qt round oven.",
        image: "https://images.unsplash.com/photo-1584489370009-db9f5a09defa?w=800&q=80"
    }
    ,
    {
        id: 53,
        name: "KitchenAid Artisan Stand Mixer",
        price: 42990,
        category: "Kitchen",
        description: "5-Quart tilt-head stand mixer.",
        image: "https://images.unsplash.com/photo-1593011400813-91cfbefe6b6f?w=800&q=80"
    }
    ,
    {
        id: 54,
        name: "Breville Barista Express",
        price: 65990,
        category: "Kitchen",
        description: "Espresso machine with integrated grinder.",
        image: "https://images.unsplash.com/photo-1517551066708-32ee5c8b746d?w=800&q=80"
    }
    ,
    {
        id: 55,
        name: "Ooni Koda 16 Pizza Oven",
        price: 49999,
        category: "Home",
        description: "Gas-powered outdoor pizza oven.",
        image: "https://images.unsplash.com/photo-1590947132387-155cc02f3212?w=800&q=80"
    }
    ,
    {
        id: 56,
        name: "Herman Miller Aeron Chair",
        price: 125000,
        category: "Home",
        description: "Ergonomic office chair with PostureFit SL.",
        image: "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=800&q=80"
    }
    ,
    {
        id: 57,
        name: "Samsung Frame TV 65-inch",
        price: 145990,
        category: "Home",
        description: "QLED 4K Smart TV with Art Mode.",
        image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=800&q=80"
    }
    ,
    {
        id: 58,
        name: "Sonos Arc Soundbar",
        price: 89999,
        category: "Electronics",
        description: "Premium smart soundbar for TV, films, music, and gaming.",
        image: "https://images.unsplash.com/photo-1542728928-1413d1894dcd?w=800&q=80"
    }
    ,
    {
        id: 59,
        name: "Apple AirPods Pro (2nd Gen)",
        price: 24900,
        category: "Electronics",
        description: "Active Noise Cancellation and Adaptive Transparency.",
        image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=800&q=80"
    }
    ,
    {
        id: 60,
        name: "Moleskine Classic Notebook",
        price: 1800,
        category: "Stationery",
        description: "Hard cover, large size, ruled pages.",
        image: "https://images.unsplash.com/photo-1531346878377-a541fa5b6e41?w=800&q=80"
    }
    ,
    {
        id: 61,
        name: "Lamy Safari Fountain Pen",
        price: 2500,
        category: "Stationery",
        description: "Sturdy ABS plastic pen with steel nib.",
        image: "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=800&q=80"
    }
    ,
    {
        id: 62,
        name: "Moleskine Smart Writing Set",
        price: 22000,
        category: "Stationery",
        description: "Digitally sync your handwritten notes in real-time.",
        image: "https://images.unsplash.com/photo-1510257321681-558229b05b9b?w=800&q=80"
    }
    ,
    {
        id: 63,
        name: "Settlers of Catan Board Game",
        price: 4500,
        category: "Toys",
        description: "Strategy board game for 3-4 players.",
        image: "https://images.unsplash.com/photo-1633519128372-fb3286395b77?w=800&q=80"
    }
    ,
    {
        id: 64,
        name: "Lego Star Wars Millennium Falcon",
        price: 75000,
        category: "Toys",
        description: "Ultimate Collector Series building kit.",
        image: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=800&q=80"
    }
    ,
    {
        id: 65,
        name: "Spalding NBA Official Basketball",
        price: 6500,
        category: "Sports",
        description: "Genuine leather indoor basketball.",
        image: "https://images.unsplash.com/photo-1519861531473-920026218dbbf?w=800&q=80"
    }
    ,
    {
        id: 51,
        name: "Apple AirTag (4 Pack)",
        price: 8900,
        category: "Electronics",
        description: "Keep track of your keys, wallet, luggage, and more.",
        image: "https://images.unsplash.com/photo-1627989580309-bfaf3e58af6f?w=800&q=80"
    }
    ,
    {
        id: 52,
        name: "Sony ZV-1 Vlogging Camera",
        price: 69990,
        category: "Electronics",
        description: "Digital camera optimized for vlogging and content creation.",
        image: "https://images.unsplash.com/photo-1599805445214-9ffdfb7f941f?w=800&q=80"
    }
    ,
    {
        id: 53,
        name: "Nintendo Switch Pro Controller",
        price: 6990,
        category: "Gaming",
        description: "Premium wireless controller for Nintendo Switch.",
        image: "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=800&q=80"
    }
    ,
    {
        id: 54,
        name: "Bose SoundLink Flex",
        price: 15900,
        category: "Electronics",
        description: "Bluetooth portable speaker, waterproof design.",
        image: "https://images.unsplash.com/photo-1634840884179-467406a64390?w=800&q=80"
    }
    ,
    {
        id: 55,
        name: "Nikon Z FC Mirrorless",
        price: 95990,
        category: "Electronics",
        description: "Classic design with modern mirrorless technology.",
        image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&q=80"
    }
    ,
    {
        id: 56,
        name: "Kindle Oasis",
        price: 21999,
        category: "Electronics",
        description: "7\" display, adjustable warm light, waterproof.",
        image: "https://images.unsplash.com/photo-1455355605553-62efcbb2bf0f?w=800&q=80"
    }
    ,
    {
        id: 57,
        name: "Corsair K70 RGB PRO",
        price: 16999,
        category: "Computers",
        description: "Mechanical gaming keyboard with aluminum frame.",
        image: "https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&q=80"
    }
    ,
    {
        id: 58,
        name: "Logitech Brio 4K Webcam",
        price: 19995,
        category: "Computers",
        description: "Ultra HD Pro webcam for video conferencing.",
        image: "https://images.unsplash.com/photo-1626218174358-7769486c4b79?w=800&q=80"
    }
    ,
    {
        id: 59,
        name: "Dyson Airwrap Multi-Styler",
        price: 49900,
        category: "Home",
        description: "Curl, shape, smooth, and hide flyaways with Coanda airflow.",
        image: "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=800&q=80"
    }
    ,
    {
        id: 60,
        name: "Smeg Retro 2-Slice Toaster",
        price: 15500,
        category: "Kitchen",
        description: "Vintage 50s aesthetic with multiple browning settings.",
        image: "https://images.unsplash.com/photo-1542456070-e610d32bb3da?w=800&q=80"
    }
    ,
    {
        id: 61,
        name: "JBL Charge 5",
        price: 14999,
        category: "Electronics",
        description: "Portable Bluetooth speaker with IP67 rating.",
        image: "https://images.unsplash.com/photo-1612445173322-2b62d29cb1f4?w=800&q=80"
    }
    ,
    {
        id: 62,
        name: "Beats Fit Pro",
        price: 19900,
        category: "Electronics",
        description: "True wireless noise cancelling earbuds.",
        image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&q=80"
    }
    ,
    {
        id: 63,
        name: "Fender Player Stratocaster",
        price: 79990,
        category: "Instruments",
        description: "Classic electric guitar with 3 single-coil pickups.",
        image: "https://images.unsplash.com/photo-1564186595604-20a221f73cfc?w=800&q=80"
    }
    ,
    {
        id: 64,
        name: "Yamaha P-45 Digital Piano",
        price: 45000,
        category: "Instruments",
        description: "88-key weighted action digital piano.",
        image: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=800&q=80"
    }
    ,
    {
        id: 65,
        name: "Weber Original Kettle Premium",
        price: 21990,
        category: "Home",
        description: "22-inch charcoal grill.",
        image: "https://images.unsplash.com/photo-1582200155097-483549effdb8?w=800&q=80"
    }
];

export default products;

export const products = [
  {
    id: '1',
    brand: 'HP',
    model: 'OMEN 16',
    cpu: 'Intel Core i5-12500H',
    ram: '16GB DDR4',
    storage: '512GB NVMe SSD',
    gpu: 'RTX 4060 8GB',
    screen: '16.1" QHD 165Hz',
    condition: 'New',
    price: 275000,
    qty: 2,
    images: [
      'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800',
      'https://images.unsplash.com/photo-1591799265444-01c2d8daf544?w=800'
    ],
    highlights: ['QHD 165Hz Display', 'OMEN Cryo Chamber Cooling', '4-Zone RGB Keyboard'],
    specs: {
      processor: 'Intel Core i5-12500H (2.5GHz base, 4.5GHz boost)',
      memory: '16GB DDR4-3200MHz (2x8GB)',
      storage: '512GB PCIe Gen4 NVMe SSD',
      graphics: 'NVIDIA GeForce RTX 4060 8GB GDDR6',
      display: '16.1" QHD (2560x1440) IPS 165Hz G-SYNC',
      os: 'Windows 11 Home',
      weight: '2.3 kg',
      battery: '83Wh 6-cell',
      warranty: '1 year international'
    },
    createdAt: '2024-01-10'
  },
  {
    id: '2',
    brand: 'Lenovo',
    model: 'Legion 5 Pro',
    cpu: 'AMD Ryzen 7 7735HS',
    ram: '32GB DDR5',
    storage: '1TB NVMe SSD',
    gpu: 'RTX 4070 8GB',
    screen: '16" WQXGA 165Hz',
    condition: 'New',
    price: 395000,
    qty: 1,
    images: [
      'https://images.unsplash.com/photo-1602080858428-57174f9431cf?w=800',
      'https://images.unsplash.com/photo-1484788984921-03950022c9ef?w=800'
    ],
    highlights: ['WQXGA High Resolution', 'Legion Coldfront 5.0', 'RGB Backlit Keyboard'],
    specs: {
      processor: 'AMD Ryzen 7 7735HS (3.2GHz base, 4.75GHz boost)',
      memory: '32GB DDR5-4800MHz (2x16GB)',
      storage: '1TB PCIe Gen4 NVMe SSD',
      graphics: 'NVIDIA GeForce RTX 4070 8GB GDDR6',
      display: '16" WQXGA (2560x1600) IPS 165Hz G-SYNC',
      os: 'Windows 11 Home',
      weight: '2.5 kg',
      battery: '80Wh 4-cell',
      warranty: '2 years international'
    },
    createdAt: '2024-01-08'
  },
  {
    id: '3',
    brand: 'Alienware',
    model: 'X17',
    cpu: 'Intel Core i9-12900HK',
    ram: '32GB DDR5',
    storage: '2TB NVMe SSD',
    gpu: 'RTX 4080 12GB',
    screen: '17.3" UHD 120Hz',
    condition: 'New',
    price: 650000,
    qty: 1,
    images: [
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800',
      'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800'
    ],
    highlights: ['4K UHD Display', 'Alienware Command Center', 'Advanced Liquid Cooling'],
    specs: {
      processor: 'Intel Core i9-12900HK (2.5GHz base, 5.0GHz boost)',
      memory: '32GB DDR5-4800MHz (2x16GB)',
      storage: '2TB PCIe Gen4 NVMe SSD',
      graphics: 'NVIDIA GeForce RTX 4080 12GB GDDR6X',
      display: '17.3" UHD (3840x2160) IPS 120Hz G-SYNC',
      os: 'Windows 11 Pro',
      weight: '3.0 kg',
      battery: '97Wh 6-cell',
      warranty: '3 years premium support'
    },
    createdAt: '2024-01-05'
  },

  // --- Added & corrected image URLs below ---

  {
    id: '4',
    brand: 'Asus',
    model: 'ROG Zephyrus G15',
    cpu: 'AMD Ryzen 9 6900HS',
    ram: '16GB DDR5',
    storage: '1TB NVMe SSD',
    gpu: 'RTX 3080 8GB',
    screen: '15.6" QHD 165Hz',
    condition: 'New',
    price: 320000,
    qty: 3,
    images: [
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800'
    ],
    highlights: ['Slim Lightweight Design', 'Adaptive-Sync Display', 'Excellent Cooling'],
    specs: {
      processor: 'AMD Ryzen 9 6900HS (3.3GHz base, 4.9GHz boost)',
      memory: '16GB DDR5-4800MHz',
      storage: '1TB PCIe Gen4 NVMe SSD',
      graphics: 'NVIDIA GeForce RTX 3080 8GB GDDR6',
      display: '15.6" QHD (2560x1440) IPS 165Hz Adaptive-Sync',
      os: 'Windows 11 Home',
      weight: '1.9 kg',
      battery: '90Wh 4-cell',
      warranty: '1 year international'
    },
    createdAt: '2024-01-02'
  },
  {
    id: '5',
    brand: 'MSI',
    model: 'Raider GE77',
    cpu: 'Intel Core i9-13980HX',
    ram: '32GB DDR5',
    storage: '2TB NVMe SSD',
    gpu: 'RTX 4090 16GB',
    screen: '17.3" QHD 240Hz',
    condition: 'New',
    price: 720000,
    qty: 1,
    images: [
      'https://images.unsplash.com/photo-1559163499-413811fb2344?w=800',
      'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800'
    ],
    highlights: ['240Hz Gaming Display', 'SteelSeries RGB Keyboard', 'Cooler Boost 5'],
    specs: {
      processor: 'Intel Core i9-13980HX (2.2GHz base, 5.6GHz boost)',
      memory: '32GB DDR5-5600MHz',
      storage: '2TB PCIe Gen4 NVMe SSD',
      graphics: 'NVIDIA GeForce RTX 4090 16GB GDDR6X',
      display: '17.3" QHD (2560x1440) IPS 240Hz',
      os: 'Windows 11 Pro',
      weight: '3.2 kg',
      battery: '99Wh 6-cell',
      warranty: '2 years international'
    },
    createdAt: '2024-01-04'
  },
  {
    id: '6',
    brand: 'Apple',
    model: 'MacBook Pro 16" M2 Max',
    cpu: 'Apple M2 Max',
    ram: '32GB Unified',
    storage: '1TB SSD',
    gpu: 'M2 Max 38-core GPU',
    screen: '16.2" Liquid Retina XDR',
    condition: 'New',
    price: 600000,
    qty: 2,
    images: [
      'https://images.unsplash.com/photo-1509395176047-4a66953fd231?w=800',
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca4?w=800'
    ],
    highlights: ['Liquid Retina XDR Display', 'Studio-Grade Performance', 'Up to 21 Hours Battery'],
    specs: {
      processor: 'Apple M2 Max 12-core CPU (8 performance, 4 efficiency)',
      memory: '32GB Unified Memory',
      storage: '1TB SSD',
      graphics: 'Apple M2 Max 38-core GPU',
      display: '16.2" Liquid Retina XDR (3456x2234) Mini-LED 120Hz',
      os: 'macOS Ventura',
      weight: '2.2 kg',
      battery: 'Up to 21 hours video playback',
      warranty: '1 year limited warranty'
    },
    createdAt: '2024-01-01'
  },
  {
    id: '7',
    brand: 'Razer',
    model: 'Blade 15 Advanced',
    cpu: 'Intel Core i7-13800H',
    ram: '16GB DDR5',
    storage: '1TB NVMe SSD',
    gpu: 'RTX 4070 8GB',
    screen: '15.6" QHD 240Hz',
    condition: 'New',
    price: 420000,
    qty: 2,
    images: [
      'https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?w=800'
    ],
    highlights: ['Ultra-Thin CNC Aluminum', 'Chroma RGB Keyboard', '240Hz Gaming Display'],
    specs: {
      processor: 'Intel Core i7-13800H (2.4GHz base, 5.2GHz boost)',
      memory: '16GB DDR5-5200MHz',
      storage: '1TB PCIe Gen4 NVMe SSD',
      graphics: 'NVIDIA GeForce RTX 4070 8GB GDDR6',
      display: '15.6" QHD (2560x1440) IPS 240Hz',
      os: 'Windows 11 Home',
      weight: '2.0 kg',
      battery: '80Wh 4-cell',
      warranty: '1 year international'
    },
    createdAt: '2024-01-07'
  },
  {
    id: '8',
    brand: 'Dell',
    model: 'XPS 15 OLED',
    cpu: 'Intel Core i7-12700H',
    ram: '16GB DDR5',
    storage: '1TB NVMe SSD',
    gpu: 'RTX 3050 Ti 4GB',
    screen: '15.6" 3.5K OLED Touch',
    condition: 'New',
    price: 310000,
    qty: 3,
    images: [
      'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800',
      'https://images.unsplash.com/photo-1509395176047-4a66953fd231?w=800'
    ],
    highlights: ['OLED Touch Display', 'Premium Aluminum Design', 'Long Battery Life'],
    specs: {
      processor: 'Intel Core i7-12700H (2.3GHz base, 4.7GHz boost)',
      memory: '16GB DDR5-4800MHz',
      storage: '1TB PCIe Gen4 NVMe SSD',
      graphics: 'NVIDIA GeForce RTX 3050 Ti 4GB GDDR6',
      display: '15.6" 3.5K OLED Touch (3456x2160)',
      os: 'Windows 11 Pro',
      weight: '1.9 kg',
      battery: '86Wh 6-cell',
      warranty: '1 year premium support'
    },
    createdAt: '2024-01-09'
  },

  // --- One more laptop added ---
  {
    id: '9',
    brand: 'Acer',
    model: 'Swift X 14',
    cpu: 'Intel Core i7-13700H',
    ram: '16GB DDR5',
    storage: '1TB NVMe SSD',
    gpu: 'RTX 4050 6GB',
    screen: '14.5" 3K OLED 120Hz',
    condition: 'New',
    price: 345000,
    qty: 2,
    images: [
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800',
      'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800'
    ],
    highlights: ['3K OLED Display', 'Lightweight Metal Chassis', 'NVIDIA Studio Ready'],
    specs: {
      processor: 'Intel Core i7-13700H (2.4GHz base, 5.0GHz boost)',
      memory: '16GB DDR5-5200MHz',
      storage: '1TB PCIe Gen4 NVMe SSD',
      graphics: 'NVIDIA GeForce RTX 4050 6GB GDDR6',
      display: '14.5" 3K (2880x1800) OLED 120Hz',
      os: 'Windows 11 Home',
      weight: '1.4 kg',
      battery: '76Wh 4-cell',
      warranty: '1 year international'
    },
    createdAt: '2024-01-12'
  }
];


export function getProductById(id) {
  return products.find(product => product.id === id);
}

export const products = [
  {
    id: '1',
    name: 'Gaming Laptop Pro',
    brand: 'TechBrand',
    price: 120000,
    originalPrice: 140000,
    image: '/images/laptop1.jpg',
    category: 'gaming',
    specs: {
      processor: 'Intel i7-12700H',
      ram: '16GB DDR4',
      storage: '512GB SSD',
      graphics: 'RTX 3060'
    },
    rating: 4.5,
    inStock: true
  },
  {
    id: '2',
    name: 'Business Ultrabook',
    brand: 'ProBook',
    price: 85000,
    originalPrice: 95000,
    image: '/images/laptop2.jpg',
    category: 'business',
    specs: {
      processor: 'Intel i5-12500U',
      ram: '8GB DDR4',
      storage: '256GB SSD',
      graphics: 'Intel Iris Xe'
    },
    rating: 4.2,
    inStock: true
  },
  {
    id: '3',
    slug: 'hp-omen-16',
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
    id: '4',
    slug: 'lenovo-legion-5-pro',
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
    id: '5',
    slug: 'alienware-x17',
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
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800',
      'https://images.unsplash.com/photo-1515343480029-43cdfe0c13bb?w=800'
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
  {
    id: '6',
    slug: 'macbook-pro-16-m2',
    brand: 'Apple',
    model: 'MacBook Pro 16" M2',
    cpu: 'Apple M2 Pro',
    ram: '16GB Unified',
    storage: '512GB SSD',
    gpu: 'M2 Pro 19-core GPU',
    screen: '16.2" Liquid Retina XDR',
    condition: 'New',
    price: 485000,
    qty: 2,
    images: [
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800',
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca4?w=800'
    ],
    highlights: ['Liquid Retina XDR Display', 'All-Day Battery Life', 'Professional Video Editing'],
    specs: {
      processor: 'Apple M2 Pro 12-core CPU (8 performance, 4 efficiency)',
      memory: '16GB Unified Memory',
      storage: '512GB SSD',
      graphics: 'Apple M2 Pro 19-core GPU',
      display: '16.2" Liquid Retina XDR (3456x2234) Mini-LED 120Hz',
      os: 'macOS Ventura',
      weight: '2.15 kg',
      battery: 'Up to 22 hours video playback',
      warranty: '1 year limited warranty'
    },
    createdAt: '2024-01-03'
  }
];

export function getProductById(id) {
  return products.find(product => product.id === id);
}

export function getProductBySlug(slug) {
  return products.find(product => product.slug === slug);
}

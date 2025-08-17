export default function ProductsGrid({ products }) {
      const [searchTerm, setSearchTerm] = useState('');
      const [selectedBrand, setSelectedBrand] = useState('');
      const [selectedScreenSize, setSelectedScreenSize] = useState('');
    // Filter products based on search and filters
      useEffect(() => {
        let filtered = products;
    
        if (searchTerm) {
          filtered = filtered.filter(product => 
            product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.cpu.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.gpu.toLowerCase().includes(searchTerm.toLowerCase())
          );
        }
    
        if (selectedBrand) {
          filtered = filtered.filter(product => product.brand === selectedBrand);
        }
    
        if (selectedScreenSize) {
          filtered = filtered.filter(product => 
            product.screen.includes(selectedScreenSize)
          );
        }
    
        setFilteredProducts(filtered);
      }, [products, searchTerm, selectedBrand, selectedScreenSize]);

    return (
        <>
            {products.map(product => (
                <ProductCard key={product.id} product={product} />
            ))}
        </>
    );
}

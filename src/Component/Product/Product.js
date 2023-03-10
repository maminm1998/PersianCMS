import React from 'react'
import AddNewProduct from '../AddNewProduct/AddNewProduct'
import ProductTable from '../ProductTable/ProductTable'
import { useEffect ,useState} from 'react';
export default function Product() {
  const [allProducts, setAllProducts] = useState([]);

  function getData(){
    fetch("http://localhost:8000/api/products/")
      .then((res) => res.json())
      .then((pro) => setAllProducts(pro));
  }
  useEffect(() => {
    getData()
  }, []);
  return (
    <>

    <AddNewProduct getData={getData} />
    <ProductTable allProducts={allProducts} getData={getData}/>
    
    </>
  )
}

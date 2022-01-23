
import { useEffect} from "react";
//import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LayoutComponent";
//import { Product } from "../../app/models/product";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { fetchProductsAsync, productSelectors } from "./catalogSlice";
import ProductList from "./ProductList";


//export default function Catalog(props: Props) {
export default function Catalog() {
  //const[products, setProducts] = useState<Product[]>([]);
  const products = useAppSelector(productSelectors.selectAll);
  const {productsLoaded, status} = useAppSelector(state => state.catalog);
  const dispatch = useAppDispatch();
  //const[loading, setLoading] = useState(true);

  // useEffect(() => {
  //   fetch('http://localhost:5000/api/products')
  //     .then(response => response.json())
  //     .then(data => setProducts(data))
  // }, [])

  // useEffect(() => {
  //   agent.Catalog.list().then(products => setProducts(products))
  //   .catch(error => console.log(error))
  //   .finally(() => setLoading(false))
  // }, [])

  useEffect(() => {
    if (!productsLoaded) dispatch(fetchProductsAsync());
  }, [productsLoaded, dispatch])

  if (status.includes('pending')) return <LoadingComponent  message = 'Loading products...'/>

  return (
    <>
      <ProductList products={products} />
    </>
  )
}
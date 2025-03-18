
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, selectProducts } from '../store/productSlice';

export default function ProductList() {
  const products = useSelector(selectProducts);
  const dispatch = useDispatch();
  const status = useSelector(state => state.products.status);
  const error = useSelector(state => state.products.error);
  
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  if (status === 'loading') {
    return <div className="loading">Загрузка товаров...</div>;
  }

  if (status === 'failed') {
    return <div className="error">Ошибка: {error}</div>;
  }

  if (products.length === 0) {
    return <div className="empty-state">Товары не найдены</div>;
  }

  return (
    <div className="product-list">
      {products.map(product => (
        <div key={product.id} className="product-card">
          <img src={product.image} alt={product.title} className="product-image" />
          <div className="product-info">
            <h3>{product.title}</h3>
            <p className="product-description">{product.description}</p>
            <div className="product-footer">
              <span className="product-price">{product.price} ₽</span>
              <button 
                className="add-to-cart-btn"
                onClick={() => handleAddToCart(product)}
              >
                В корзину
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

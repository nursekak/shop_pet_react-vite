
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter, setCategory } from '../store/productSlice';

export default function ProductFilter() {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();
  const currentCategory = useSelector(state => state.products.currentCategory);
  
  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(setFilter(searchTerm));
  };
  
  const handleCategoryChange = (category) => {
    dispatch(setCategory(category));
  };

  return (
    <div className="product-filter">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Поиск товаров..."
          className="search-input"
        />
        <button type="submit" className="search-button">Найти</button>
      </form>
      
      <div className="category-filter">
        <span>Категории:</span>
        <button 
          className={`category-btn ${currentCategory === 'all' ? 'active' : ''}`}
          onClick={() => handleCategoryChange('all')}
        >
          Все
        </button>
        <button 
          className={`category-btn ${currentCategory === 'Электроника' ? 'active' : ''}`}
          onClick={() => handleCategoryChange('Электроника')}
        >
          Электроника
        </button>
        <button 
          className={`category-btn ${currentCategory === 'Одежда' ? 'active' : ''}`}
          onClick={() => handleCategoryChange('Одежда')}
        >
          Одежда
        </button>
        <button 
          className={`category-btn ${currentCategory === 'Обувь' ? 'active' : ''}`}
          onClick={() => handleCategoryChange('Обувь')}
        >
          Обувь
        </button>
      </div>
    </div>
  );
}

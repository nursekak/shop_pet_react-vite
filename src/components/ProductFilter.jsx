import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter, setCategory, setSortBy } from '../store/productSlice';

export default function ProductFilter() {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();
  const currentCategory = useSelector(state => state.products.currentCategory);
  const currentSort = useSelector(state => state.products.sortBy);
  
  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(setFilter(searchTerm));
  };
  
  const handleCategoryChange = (category) => {
    dispatch(setCategory(category));
  };

  const handleSortChange = (sortType) => {
    dispatch(setSortBy(sortType));
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
      
      <div className="filter-controls">
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

        <div className="sort-filter">
          <span>Сортировка:</span>
          <button 
            className={`sort-btn ${currentSort === 'default' ? 'active' : ''}`}
            onClick={() => handleSortChange('default')}
          >
            По умолчанию
          </button>
          <button 
            className={`sort-btn ${currentSort === 'priceAsc' ? 'active' : ''}`}
            onClick={() => handleSortChange('priceAsc')}
          >
            По цене (возр.)
          </button>
          <button 
            className={`sort-btn ${currentSort === 'priceDesc' ? 'active' : ''}`}
            onClick={() => handleSortChange('priceDesc')}
          >
            По цене (убыв.)
          </button>
        </div>
      </div>
    </div>
  );
}

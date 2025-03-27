import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReviews, addReview, selectReviews, selectReviewStatus, selectReviewError } from '../store/reviewSlice';
import { selectCurrentUser } from '../store/userSlice';

export default function ProductReviews({ productId }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();
  const reviews = useSelector(state => selectReviews(state, productId));
  const status = useSelector(selectReviewStatus);
  const error = useSelector(selectReviewError);
  const currentUser = useSelector(selectCurrentUser);

  useEffect(() => {
    dispatch(fetchReviews(productId));
  }, [dispatch, productId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      alert('Пожалуйста, войдите в систему, чтобы оставить отзыв');
      return;
    }
    if (rating === 0) {
      alert('Пожалуйста, выберите оценку');
      return;
    }
    await dispatch(addReview({
      productId,
      review: {
        userId: currentUser.id,
        userName: currentUser.name,
        rating,
        comment,
        date: new Date().toISOString()
      }
    }));
    setRating(0);
    setComment('');
  };

  const averageRating = reviews.length > 0
    ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
    : 0;

  return (
    <div className="product-reviews">
      <h3>Отзывы о товаре</h3>
      <div className="rating-summary">
        <div className="average-rating">
          <span className="rating-number">{averageRating}</span>
          <div className="stars">
            {[1, 2, 3, 4, 5].map(star => (
              <span key={star} className={`star ${star <= averageRating ? 'filled' : ''}`}>
                ★
              </span>
            ))}
          </div>
          <span className="reviews-count">({reviews.length} отзывов)</span>
        </div>
      </div>

      {currentUser && (
        <form onSubmit={handleSubmit} className="review-form">
          <div className="rating-input">
            <label>Ваша оценка:</label>
            <div className="stars">
              {[1, 2, 3, 4, 5].map(star => (
                <span
                  key={star}
                  className={`star ${star <= rating ? 'filled' : ''}`}
                  onClick={() => setRating(star)}
                >
                  ★
                </span>
              ))}
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="comment">Ваш отзыв:</label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
              rows="4"
            />
          </div>
          <button type="submit">Отправить отзыв</button>
        </form>
      )}

      {!currentUser && (
        <p className="login-prompt">
          Пожалуйста, <a href="#" onClick={(e) => {
            e.preventDefault();
            // Здесь можно добавить открытие модального окна авторизации
          }}>войдите в систему</a>, чтобы оставить отзыв
        </p>
      )}

      <div className="reviews-list">
        {reviews.map(review => (
          <div key={review.id} className="review-item">
            <div className="review-header">
              <span className="reviewer-name">{review.userName}</span>
              <div className="stars">
                {[1, 2, 3, 4, 5].map(star => (
                  <span key={star} className={`star ${star <= review.rating ? 'filled' : ''}`}>
                    ★
                  </span>
                ))}
              </div>
              <span className="review-date">
                {new Date(review.date).toLocaleDateString()}
              </span>
            </div>
            <p className="review-comment">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
} 
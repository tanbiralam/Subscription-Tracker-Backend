import dayjs from 'dayjs';

const SubscriptionCard = ({ subscription, daysUntilRenewal, onEdit, onDelete }) => {
  const getStatusColor = () => {
    if (subscription.status === 'cancelled') return 'status-cancelled';
    if (subscription.status === 'expired') return 'status-expired';
    if (daysUntilRenewal <= 7 && daysUntilRenewal > 0) return '';
    return '';
  };

  const getRenewalMessage = () => {
    if (daysUntilRenewal < 0) return 'Expired';
    if (daysUntilRenewal === 0) return 'Renews today';
    if (daysUntilRenewal === 1) return 'Renews tomorrow';
    if (daysUntilRenewal <= 7) return `${daysUntilRenewal} days left`;
    return null;
  };

  const getRenewalVariant = () => {
    if (daysUntilRenewal < 0) return 'danger';
    if (daysUntilRenewal <= 3) return 'danger';
    if (daysUntilRenewal <= 7) return '';
    return 'success';
  };

  return (
    <div className={`subscription-card ${getStatusColor()}`}>
      <div className="card-header">
        <div className="card-title-section">
          <h3 className="card-title">{subscription.name}</h3>
          <span className="card-category">{subscription.category}</span>
        </div>
        <div className="card-actions">
          <button onClick={onEdit} className="icon-btn" title="Edit subscription">
            ✏️
          </button>
          <button onClick={onDelete} className="icon-btn delete" title="Delete subscription">
            🗑️
          </button>
        </div>
      </div>

      <div className="card-price">
        <span className="price-amount">{subscription.currency}</span>
        <span className="price-amount">{subscription.price}</span>
        <span className="price-frequency">per {subscription.frequency}</span>
      </div>

      <div className="card-details">
        <div className="detail-item">
          <span className="detail-label">Payment Method</span>
          <span className="detail-value">{subscription.paymentMethod}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Next Renewal</span>
          <span className="detail-value">{dayjs(subscription.renewalDate).format('MMM D, YYYY')}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Status</span>
          <span className={`status-badge status-${subscription.status}`}>
            {subscription.status}
          </span>
        </div>
      </div>

      {getRenewalMessage() && (
        <div className="renewal-info">
          <span className={`renewal-badge ${getRenewalVariant()}`}>
            {getRenewalMessage()}
          </span>
        </div>
      )}
    </div>
  );
};

export default SubscriptionCard;

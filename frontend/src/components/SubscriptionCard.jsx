import dayjs from 'dayjs';

const SubscriptionCard = ({ subscription, daysUntilRenewal, onEdit, onDelete }) => {
  const getStatusColor = () => {
    if (subscription.status === 'cancelled') return 'status-cancelled';
    if (subscription.status === 'expired') return 'status-expired';
    if (daysUntilRenewal <= 7) return 'status-warning';
    return 'status-active';
  };

  const getRenewalBadge = () => {
    if (daysUntilRenewal < 0) return 'Expired';
    if (daysUntilRenewal === 0) return 'Renews Today';
    if (daysUntilRenewal === 1) return 'Renews Tomorrow';
    if (daysUntilRenewal <= 7) return `${daysUntilRenewal} days left`;
    return null;
  };

  return (
    <div className={`subscription-card ${getStatusColor()}`}>
      <div className="card-header">
        <div>
          <h3>{subscription.name}</h3>
          <span className={`badge badge-${subscription.category}`}>
            {subscription.category}
          </span>
        </div>
        <div className="card-actions">
          <button onClick={onEdit} className="icon-btn" title="Edit">
            &#9998;
          </button>
          <button onClick={onDelete} className="icon-btn" title="Delete">
            &#128465;
          </button>
        </div>
      </div>

      <div className="card-body">
        <div className="subscription-price">
          <span className="amount">
            {subscription.currency} {subscription.price}
          </span>
          <span className="frequency">/{subscription.frequency}</span>
        </div>

        <div className="subscription-details">
          <div className="detail-row">
            <span className="label">Payment Method:</span>
            <span className="value">{subscription.paymentMethod}</span>
          </div>
          <div className="detail-row">
            <span className="label">Next Renewal:</span>
            <span className="value">
              {dayjs(subscription.renewalDate).format('MMM D, YYYY')}
            </span>
          </div>
          <div className="detail-row">
            <span className="label">Status:</span>
            <span className={`value status-${subscription.status}`}>
              {subscription.status}
            </span>
          </div>
        </div>

        {getRenewalBadge() && (
          <div className="renewal-badge">{getRenewalBadge()}</div>
        )}
      </div>
    </div>
  );
};

export default SubscriptionCard;

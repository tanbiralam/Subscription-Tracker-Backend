import dayjs from 'dayjs';
import SubscriptionCard from './SubscriptionCard';

const SubscriptionList = ({
  subscriptions,
  loading,
  onEdit,
  onDelete,
  filters,
  onFilterChange,
  page,
  totalPages,
  onPageChange,
}) => {
  const getDaysUntilRenewal = (renewalDate) => {
    const days = dayjs(renewalDate).diff(dayjs(), 'day');
    return days;
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p style={{ color: 'var(--text-secondary)', marginTop: '16px' }}>Loading subscriptions...</p>
      </div>
    );
  }

  return (
    <div className="subscription-list-container">
      <div className="filters-container">
        <input
          type="text"
          placeholder="Search subscriptions..."
          value={filters.search}
          onChange={(e) => onFilterChange('search', e.target.value)}
          className="filter-input"
        />
        <select
          value={filters.billingCycle}
          onChange={(e) => onFilterChange('billingCycle', e.target.value)}
          className="filter-select"
        >
          <option value="">All Billing Cycles</option>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>

      {subscriptions.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">📦</div>
          <h3>No subscriptions yet</h3>
          <p>Start by adding your first subscription to get started</p>
        </div>
      ) : (
        <>
          <div className="subscription-grid">
            {subscriptions.map((subscription) => (
              <SubscriptionCard
                key={subscription._id}
                subscription={subscription}
                daysUntilRenewal={getDaysUntilRenewal(subscription.renewalDate)}
                onEdit={() => onEdit(subscription)}
                onDelete={() => onDelete(subscription._id)}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="pagination">
              <button
                onClick={() => onPageChange(page - 1)}
                disabled={page === 1}
                className="btn btn-secondary btn-sm"
              >
                ← Previous
              </button>
              <span className="page-info">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => onPageChange(page + 1)}
                disabled={page === totalPages}
                className="btn btn-secondary btn-sm"
              >
                Next →
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SubscriptionList;

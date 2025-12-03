import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { subscriptionService } from '../services/subscription.service';
import SubscriptionList from './SubscriptionList';
import SubscriptionForm from './SubscriptionForm';
import Header from './Header';

const Dashboard = () => {
  const { user } = useAuth();
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingSubscription, setEditingSubscription] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    billingCycle: '',
  });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchSubscriptions = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await subscriptionService.getAll(user._id, {
        page,
        limit: 10,
        ...filters,
      });
      setSubscriptions(response.data.subscriptions || []);
      setTotalPages(Math.ceil((response.data.total || 0) / 10));
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch subscriptions');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchSubscriptions();
    }
  }, [user, page, filters]);

  const handleCreateOrUpdate = async (subscriptionData) => {
    try {
      if (editingSubscription) {
        await subscriptionService.update(editingSubscription._id, subscriptionData);
      } else {
        await subscriptionService.create(subscriptionData);
      }
      setShowForm(false);
      setEditingSubscription(null);
      fetchSubscriptions();
    } catch (err) {
      throw err;
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this subscription?')) {
      try {
        await subscriptionService.delete(id);
        fetchSubscriptions();
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to delete subscription');
      }
    }
  };

  const handleEdit = (subscription) => {
    setEditingSubscription(subscription);
    setShowForm(true);
  };

  const handleFilterChange = (filterName, value) => {
    setFilters({
      ...filters,
      [filterName]: value,
    });
    setPage(1);
  };

  return (
    <div className="dashboard">
      <Header />

      <div className="dashboard-content">
        <div className="dashboard-header">
          <div className="dashboard-header-title">
            <h1>Subscriptions</h1>
            <p className="dashboard-header-subtitle">Manage and track all your recurring payments</p>
          </div>
          <div className="dashboard-actions">
            <button
              className="btn btn-primary"
              onClick={() => {
                setEditingSubscription(null);
                setShowForm(true);
              }}
            >
              + Add Subscription
            </button>
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}

        {showForm && (
          <SubscriptionForm
            subscription={editingSubscription}
            onSubmit={handleCreateOrUpdate}
            onCancel={() => {
              setShowForm(false);
              setEditingSubscription(null);
            }}
          />
        )}

        <SubscriptionList
          subscriptions={subscriptions}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
          filters={filters}
          onFilterChange={handleFilterChange}
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
};

export default Dashboard;

// ManagePackages.jsx - Enhanced
import React, { useState } from 'react';
import { 
  FaCheckCircle, 
  FaEdit, 
  FaTrash, 
  FaPlus, 
  FaTimes, 
  FaDollarSign, 
  FaCalendarAlt,
  FaEnvelope,
  FaFilter,
  FaSearch 
} from 'react-icons/fa';
import { packagesData as initialPackages } from '../data/packagesData';
import './ManagePackages.css';

const PackageModal = ({ isOpen, onClose, onSave, currentPackage }) => {
  const [pkg, setPkg] = useState({
    id: null,
    planName: '',
    price: '',
    duration: '',
    emailGenerationLimit: '',
    features: [],
    status: 'Active'
  });

  React.useEffect(() => {
    if (currentPackage) {
      setPkg(currentPackage);
    } else {
      setPkg({
        id: null,
        planName: '',
        price: '',
        duration: '',
        emailGenerationLimit: '',
        features: [],
        status: 'Active'
      });
    }
  }, [currentPackage]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPkg({ ...pkg, [name]: value });
  };
  
  const handleFeaturesChange = (e) => {
    const featuresArray = e.target.value.split('\n').filter(feature => feature.trim() !== '');
    setPkg({ ...pkg, features: featuresArray });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(pkg);
    onClose();
  };

  const addFeature = () => {
    setPkg({ ...pkg, features: [...pkg.features, ''] });
  };

  const updateFeature = (index, value) => {
    const newFeatures = [...pkg.features];
    newFeatures[index] = value;
    setPkg({ ...pkg, features: newFeatures });
  };

  const removeFeature = (index) => {
    const newFeatures = pkg.features.filter((_, i) => i !== index);
    setPkg({ ...pkg, features: newFeatures });
  };

  return (
    <div className={`package-modal-overlay ${isOpen ? 'modal-show' : ''}`}>
      <div className="package-modal-container">
        <div className="modal-card">
          <div className="modal-card-header">
            <h2 className="modal-title">
              {currentPackage?.id ? 'Edit Package' : 'Create New Package'}
            </h2>
            <button onClick={onClose} className="modal-close-btn">
              <FaTimes />
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="package-modal-form">
            <div className="form-row">
              <div className="form-column">
                <div className="form-field">
                  <label className="form-label">
                    <span className="label-text">Plan Name</span>
                    <span className="label-required">*</span>
                  </label>
                  <input 
                    type="text" 
                    name="planName" 
                    value={pkg.planName} 
                    onChange={handleChange} 
                    className="form-input"
                    placeholder="e.g., Premium Plan"
                    required 
                  />
                </div>
                
                <div className="form-field">
                  <label className="form-label">
                    <span className="label-text">Price</span>
                    <span className="label-required">*</span>
                  </label>
                  <div className="input-with-icon">
                    <FaDollarSign className="input-icon" />
                    <input 
                      type="number" 
                      name="price" 
                      value={pkg.price} 
                      onChange={handleChange} 
                      className="form-input"
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                      required 
                    />
                  </div>
                </div>
              </div>
              
              <div className="form-column">
                <div className="form-field">
                  <label className="form-label">
                    <span className="label-text">Duration</span>
                    <span className="label-required">*</span>
                  </label>
                  <div className="input-with-icon">
                    <FaCalendarAlt className="input-icon" />
                    <input 
                      type="text" 
                      name="duration" 
                      value={pkg.duration} 
                      onChange={handleChange} 
                      className="form-input"
                      placeholder="e.g., Monthly, Yearly"
                      required 
                    />
                  </div>
                </div>
                
                <div className="form-field">
                  <label className="form-label">
                    <span className="label-text">Email Limit</span>
                    <span className="label-required">*</span>
                  </label>
                  <div className="input-with-icon">
                    <FaEnvelope className="input-icon" />
                    <input 
                      type="text" 
                      name="emailGenerationLimit" 
                      value={pkg.emailGenerationLimit} 
                      onChange={handleChange} 
                      className="form-input"
                      placeholder="e.g., 100 emails/day"
                      required 
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="form-field">
              <label className="form-label">
                <span className="label-text">Status</span>
              </label>
              <div className="status-selector">
                <button 
                  type="button"
                  className={`status-option ${pkg.status === 'Active' ? 'active' : ''}`}
                  onClick={() => setPkg({ ...pkg, status: 'Active' })}
                >
                  Active
                </button>
                <button 
                  type="button"
                  className={`status-option ${pkg.status === 'Inactive' ? 'inactive' : ''}`}
                  onClick={() => setPkg({ ...pkg, status: 'Inactive' })}
                >
                  Inactive
                </button>
              </div>
            </div>
            
            <div className="form-field">
              <div className="features-header">
                <label className="form-label">
                  <span className="label-text">Features</span>
                  <span className="label-required">*</span>
                </label>
                <button 
                  type="button" 
                  onClick={addFeature}
                  className="add-feature-btn"
                >
                  <FaPlus /> Add Feature
                </button>
              </div>
              
              <div className="features-list">
                {pkg.features.map((feature, index) => (
                  <div key={index} className="feature-input-group">
                    <input 
                      type="text" 
                      value={feature}
                      onChange={(e) => updateFeature(index, e.target.value)}
                      className="form-input feature-input"
                      placeholder={`Feature ${index + 1}`}
                    />
                    <button 
                      type="button"
                      onClick={() => removeFeature(index)}
                      className="remove-feature-btn"
                    >
                      <FaTimes />
                    </button>
                  </div>
                ))}
              </div>
              
              {pkg.features.length === 0 && (
                <div className="features-hint">
                  <p>Add features that this plan includes. Click "Add Feature" to get started.</p>
                </div>
              )}
            </div>
            
            <div className="modal-actions">
              <button 
                type="button" 
                onClick={onClose} 
                className="modal-btn modal-btn-secondary"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="modal-btn modal-btn-primary"
              >
                {currentPackage?.id ? 'Update Package' : 'Create Package'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const ManagePackages = () => {
  const [packages, setPackages] = useState(initialPackages);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPackage, setCurrentPackage] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  
  const openModal = (pkg = null) => {
    setCurrentPackage(pkg);
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentPackage(null);
  };

  const handleSave = (pkg) => {
    if (pkg.id) {
      setPackages(packages.map(p => p.id === pkg.id ? pkg : p));
    } else {
      setPackages([...packages, { ...pkg, id: Date.now() }]);
    }
  };

  const handleDelete = (id) => {
    if(window.confirm('Are you sure you want to delete this package? This action cannot be undone.')) {
      setPackages(packages.filter(p => p.id !== id));
    }
  };

  const filteredPackages = packages.filter(pkg => {
    const matchesSearch = pkg.planName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || pkg.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="packages-management-container">
      <div className="packages-header-section">
        <div className="header-content">
          <h1 className="page-title">Manage Packages</h1>
          <p className="page-subtitle">Create, edit, and manage your subscription packages</p>
        </div>
        <button className="create-package-btn" onClick={() => openModal()}>
          <FaPlus /> Create Package
        </button>
      </div>

      <div className="packages-controls">
        <div className="search-container">
          <FaSearch className="search-icon" />
          <input 
            type="text" 
            placeholder="Search packages..." 
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="filter-controls">
          <div className="filter-group">
            <FaFilter className="filter-icon" />
            <select 
              className="filter-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {filteredPackages.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">📦</div>
          <h3>No packages found</h3>
          <p>Try adjusting your search or create a new package</p>
          <button className="empty-state-btn" onClick={() => openModal()}>
            <FaPlus /> Create Your First Package
          </button>
        </div>
      ) : (
        <div className="packages-grid-container">
          <div className="packages-grid">
            {filteredPackages.map(pkg => (
              <div key={pkg.id} className="package-card-wrapper">
                <div className={`package-card ${pkg.status.toLowerCase()}`}>
                  <div className="package-badge">
                    <span className="package-badge-text">{pkg.status}</span>
                  </div>
                  
                  <div className="package-card-content">
                    <div className="package-header">
                      <h3 className="package-name">{pkg.planName}</h3>
                      <div className="package-price-block">
                        <span className="price-currency">$</span>
                        <span className="price-amount">{pkg.price}</span>
                        <span className="price-duration">/{pkg.duration}</span>
                      </div>
                    </div>
                    
                    <div className="package-meta">
                      <div className="meta-item">
                        <FaEnvelope className="meta-icon" />
                        <span className="meta-text">{pkg.emailGenerationLimit}</span>
                      </div>
                    </div>
                    
                    <div className="package-features-section">
                      <h4 className="features-title">What's included:</h4>
                      <ul className="package-features-list">
                        {pkg.features.slice(0, 4).map((feature, index) => (
                          <li key={index} className="feature-item">
                            <FaCheckCircle className="feature-icon" />
                            <span className="feature-text">{feature}</span>
                          </li>
                        ))}
                        {pkg.features.length > 4 && (
                          <li className="feature-more">
                            +{pkg.features.length - 4} more features
                          </li>
                        )}
                      </ul>
                    </div>
                    
                    <div className="package-actions">
                      <button 
                        className="action-btn edit-action-btn" 
                        onClick={() => openModal(pkg)}
                      >
                        <FaEdit /> Edit
                      </button>
                      <button 
                        className="action-btn delete-action-btn" 
                        onClick={() => handleDelete(pkg.id)}
                      >
                        <FaTrash /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <PackageModal 
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={handleSave}
        currentPackage={currentPackage}
      />
    </div>
  );
};

export default ManagePackages;
import React, { useState } from 'react';
import { FaCheckCircle, FaEdit, FaTrash } from 'react-icons/fa';
import { packagesData as initialPackages } from '../data/packagesData';
import './ManagePackages.css';

const PackageModal = ({ isOpen, onClose, onSave, currentPackage }) => {
  const [pkg, setPkg] = useState(currentPackage);

  React.useEffect(() => {
    setPkg(currentPackage);
  }, [currentPackage]);

  if (!isOpen || !pkg) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPkg({ ...pkg, [name]: value });
  };
  
  const handleFeaturesChange = (e) => {
    setPkg({ ...pkg, features: e.target.value.split('\\n') });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(pkg);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{currentPackage.id ? 'Edit' : 'Create'} Package</h2>
          <button onClick={onClose} className="close-modal-btn">&times;</button>
        </div>
        <form onSubmit={handleSubmit} className="package-form">
          <div className="form-group">
            <label>Plan Name</label>
            <input type="text" name="planName" value={pkg.planName} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Price</label>
            <input type="number" name="price" value={pkg.price} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Duration</label>
            <input type="text" name="duration" value={pkg.duration} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Email Generation Limit</label>
            <input type="text" name="emailGenerationLimit" value={pkg.emailGenerationLimit} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Features (one per line)</label>
            <textarea name="features" value={pkg.features.join('\\n')} onChange={handleFeaturesChange} required />
          </div>
          <div className="form-group">
            <label>Status</label>
            <select name="status" value={pkg.status} onChange={handleChange}>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <div className="modal-actions">
            <button type="button" onClick={onClose} className="package-action-btn cancel-btn">Cancel</button>
            <button type="submit" className="package-action-btn save-btn">Save Package</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const ManagePackages = () => {
  const [packages, setPackages] = useState(initialPackages);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPackage, setCurrentPackage] = useState(null);
  
  const openModal = (pkg = null) => {
    setCurrentPackage(pkg || { id: null, planName: '', price: '', duration: '', emailGenerationLimit: '', features: [], status: 'Active' });
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
    if(window.confirm('Are you sure you want to delete this package?')) {
      setPackages(packages.filter(p => p.id !== id));
    }
  };

  return (
    <div>
      <div className="packages-header">
        <h2>Manage Packages</h2>
        <button className="add-package-btn" onClick={() => openModal()}>Create Package</button>
      </div>

      <div className="packages-grid">
        {packages.map(pkg => (
          <div key={pkg.id} className="package-card">
            <div className="package-card-header">
              <h3 className="package-name">{pkg.planName}</h3>
              <span className={`package-status ${pkg.status.toLowerCase()}`}>{pkg.status}</span>
            </div>
            <div className="package-details">
              <div className="package-price">${pkg.price}<span>/ {pkg.duration}</span></div>
              <p>Email Limit: {pkg.emailGenerationLimit}</p>
            </div>
            <ul className="package-features">
              {pkg.features.map((feature, index) => (
                <li key={index}><FaCheckCircle /> {feature}</li>
              ))}
            </ul>
            <div className="package-actions">
              <button className="package-action-btn edit-btn" onClick={() => openModal(pkg)}><FaEdit /> Edit</button>
              <button className="package-action-btn delete-btn" onClick={() => handleDelete(pkg.id)}><FaTrash /> Delete</button>
            </div>
          </div>
        ))}
      </div>

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


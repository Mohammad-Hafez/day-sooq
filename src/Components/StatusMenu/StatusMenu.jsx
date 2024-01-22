import React from 'react';

export default function StatusMenu({ setIsUsed, IsUsed }) {
  const handleStatusChange = (event) => {
    const value = event.target.id === 'used';
    setIsUsed(value);
  };

  return (
    <div className="statusMenu brdr p-3 rounded mb-4">
      <h5 className="fw-bolder mb-1">Status</h5>
      <hr className='mb-3 mt-2 brdr' />
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          id="new"
          name="status"
          onChange={handleStatusChange}
          checked={!IsUsed}
        />
        <label className="form-check-label" htmlFor="new">
          New
        </label>
      </div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          id="used"
          name="status"
          onChange={handleStatusChange}
          checked={IsUsed}
        />
        <label className="form-check-label" htmlFor="used">
          Used
        </label>
      </div>
    </div>
  );
}

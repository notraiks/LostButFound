import React from 'react';
import '../../views/Login.css';

const LoginForm = ({ title, subtitle, fields, buttonText, onSubmit, error, backAction, options }) => {
  return (
    <div className="right-content">
      <div className="login-header">
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>
      <form onSubmit={onSubmit} className="login-form">
        {fields.map((field, index) => (
          <div key={index} className="form-group">
            <label>{field.label}</label>
            <input
              type={field.type}
              name={field.name}
              value={field.value}
              onChange={field.onChange}
              placeholder={field.placeholder}
              required={field.required}
            />
          </div>
        ))}
        {error && <p className="error-message">{error}</p>}

        <div className="actions">
          {backAction && (
            <button type="button" className="back-button" onClick={backAction}>
              Back
            </button>
          )}
          <button type="submit" className="register-button">
            {buttonText}
          </button>
        </div>

        {options && (
          <div className="login-options">
            {options.map((option, index) => (
              <React.Fragment key={index}>
                <a href={option.href}>{option.text}</a>
                {index < options.length - 1 && <span>|</span>}
              </React.Fragment>
            ))}
          </div>
        )}
      </form>
    </div>
  );
};

export default LoginForm;

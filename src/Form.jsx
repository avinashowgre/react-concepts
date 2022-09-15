import React, { useEffect, useState } from 'react';

export function Form() {
  const [formData, setFormData] = useState({
    age: 0,
    email: '',
    gender: '',
    password: '',
    username: '',
  });

  const handleInputChange = ({ target }) => {
    const { name: fieldName, options, type, value } = target;
    const fieldValue = type.includes('select') ? options[value].text : value;

    setFormData({
      ...formData,
      [fieldName]: fieldValue,
    });
  };

  console.log(formData);

  return (
    <form>
      <input
        placeholder="Enter email"
        name="email"
        onChange={handleInputChange}
        type="text"
        value={formData.email}
      />

      <input
        placeholder="Enter username"
        name="username"
        onChange={handleInputChange}
        type="text"
        value={formData.username}
      />

      <input
        placeholder="Enter password"
        name="password"
        onChange={handleInputChange}
        type="password"
        value={formData.password}
      />

      <div className="form-group">
        <label htmlFor="age">Age:</label>
        <input type="number" name="age" id="age" onChange={handleInputChange} />
      </div>

      <div className="form-group">
        <label htmlFor="ddlViewBy">Select:</label>
        <select id="ddlViewBy" name="gender" onChange={handleInputChange}>
          <option>Choose</option>
          <option value="1">male</option>
          <option value="2">female</option>
          <option value="3">unknown</option>
        </select>
      </div>

      <div className="form-group">
        <p>Please select your favorite Web language:</p>
        <input
          type="radio"
          id="html"
          name="fav_language"
          value="HTML"
          onChange={handleInputChange}
        />{' '}
          <label for="html">HTML</label>
        <br /> 
        <input
          type="radio"
          id="css"
          name="fav_language"
          value="CSS"
          onChange={handleInputChange}
        />{' '}
          <label for="css">CSS</label>
        <br /> 
        <input
          type="radio"
          id="javascript"
          name="fav_language"
          value="JavaScript"
          onChange={handleInputChange}
        />{' '}
          <label for="javascript">JavaScript</label>
      </div>

      <p>Entered username: {formData.username}</p>
      <p>Entered password: {formData.password}</p>
    </form>
  );
}

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
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="username"
        placeholder="Enter email"
        name="email"
        onChange={handleInputChange}
        type="text"
        value={formData.email}
      />

      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="username"
        placeholder="Enter username"
        name="username"
        onChange={handleInputChange}
        type="text"
        value={formData.username}
      />

      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="username"
        placeholder="Enter password"
        name="password"
        onChange={handleInputChange}
        type="password"
        value={formData.password}
      />

      <div className="form-group mb-6">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="age"
        >
          Age:
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="number"
          name="age"
          id="age"
          onChange={handleInputChange}
        />
      </div>

      <div className="form-group relative">
        <label htmlFor="ddlViewBy">Select:</label>
        <select
          className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          id="ddlViewBy"
          name="gender"
          onChange={handleInputChange}
        >
          <option value="0">Choose</option>
          <option value="1">male</option>
          <option value="2">female</option>
          <option value="3">unknown</option>
        </select>
      </div>

      <div className="form-group">
        <p>Please select your favorite Web language:</p>
        <div class="form-check">
          <input
            className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
            type="radio"
            name="fav_language"
            id="flexRadioDefault1"
          />
          <label
            class="form-check-label inline-block text-gray-800"
            htmlFor="flexRadioDefault1"
          >
            Default radio
          </label>
        </div>
        <div class="form-check">
          <input
            className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
            type="radio"
            id="html"
            name="fav_language"
            value="HTML"
            onChange={handleInputChange}
          />{' '}
            <label for="html">HTML</label>
        </div>
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

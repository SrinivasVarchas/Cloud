import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_KEY = process.env.REACT_APP_NOCODB_API_KEY;
const BASE_URL = process.env.REACT_APP_NOCODB_BASE_URL;
const PROJECT_ID = process.env.REACT_APP_PROJECT_ID;
const TABLE_ID_1 = process.env.REACT_APP_TABLE_ID_1;
const TABLE_ID_2 = process.env.REACT_APP_TABLE_ID_2;

const App = () => {
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [newItem1, setNewItem1] = useState('');
  const [newItem2, setNewItem2] = useState('');

  // Fetch data from Table 1
  useEffect(() => {
    const fetchData1 = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/v1/db/${PROJECT_ID}/tables/${TABLE_ID_1}/rows`, {
          headers: {
            'xc-auth': API_KEY,
          },
        });
        setData1(response.data.rows);
      } catch (error) {
        console.error('Error fetching data from Table 1:', error);
      }
    };
    fetchData1();
  }, []);

  // Fetch data from Table 2
  useEffect(() => {
    const fetchData2 = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/v1/db/${PROJECT_ID}/tables/${TABLE_ID_2}/rows`, {
          headers: {
            'xc-auth': API_KEY,
          },
        });
        setData2(response.data.rows);
      } catch (error) {
        console.error('Error fetching data from Table 2:', error);
      }
    };
    fetchData2();
  }, []);

  // Handle form submission for Table 1
  const handleSubmit1 = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/api/v1/db/${PROJECT_ID}/tables/${TABLE_ID_1}/rows`, {
        data: {
          name: newItem1,
        },
      }, {
        headers: {
          'xc-auth': API_KEY,
        },
      });
      setData1([...data1, response.data.row]);
      setNewItem1('');
    } catch (error) {
      console.error('Error submitting data to Table 1:', error);
    }
  };

  // Handle form submission for Table 2
  const handleSubmit2 = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/api/v1/db/${PROJECT_ID}/tables/${TABLE_ID_2}/rows`, {
        data: {
          name: newItem2,
        },
      }, {
        headers: {
          'xc-auth': API_KEY,
        },
      });
      setData2([...data2, response.data.row]);
      setNewItem2('');
    } catch (error) {
      console.error('Error submitting data to Table 2:', error);
    }
  };

  return (
    <div>
      <h1>Data from Table 1</h1>
      <ul>
        {data1.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit1}>
        <input
          type="text"
          value={newItem1}
          onChange={(e) => setNewItem1(e.target.value)}
          placeholder="Add new item to Table 1"
          required
        />
        <button type="submit">Add Item</button>
      </form>

      <h1>Data from Table 2</h1>
      <ul>
        {data2.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit2}>
        <input
          type="text"
          value={newItem2}
          onChange={(e) => setNewItem2(e.target.value)}
          placeholder="Add new item to Table 2"
          required
        />
        <button type="submit">Add Item</button>
      </form>
    </div>
  );
};

export default App;

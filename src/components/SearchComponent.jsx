import { useState, useEffect, useId } from 'react';

const SearchComponent = () => {
  //use id
  const id = useId();


  //setear los hooks usestate
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');

  // funcion para traer los datos de la API
  const URL = 'https://jsonplaceholder.typicode.com/users';
  const showData = async () => {
    try {
      const res = await fetch(URL);
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

  // metodo de filtrado 1
  // let results = [];
  // if (!search) {
  //   results = users;
  // } else {
  //   results = users.filter((user) =>
  //     user.name.toLowerCase().includes(search.toLowerCase()),
  //   );
  // }

  // metodo de filtrado 2
  const results = !search
    ? users
    : users.filter((user) =>
        user.name.toLowerCase().includes(search.toLowerCase()),
      );

  // funcion de busqueda
  const searcher = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    showData();
  }, []);

  //renderizamos la vista
  return (
    <div>
      <input
        type='text'
        placeholder='Search'
        className='form-control'
        value={search}
        onChange={searcher}
        name='search'
        id={`${id}-input`}
      />
      <table
        id={`${id}-table`}
        className='table table-striped table-hover mt-5 shadow-lg'>
        <thead>
          <tr className='bg-curso text-white'>
            <th>NAME</th>
            <th>USERNAME</th>
          </tr>
        </thead>
        <tbody>
          {results.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.username}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SearchComponent;

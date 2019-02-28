import React from 'react';

import Filter from './Filter'
import FilterSchema from './FilterSchema'

import './App.css';

const filterProps = {                             //这里定义的是查询页面要绑定的数据源
  expand : false,
  filterSchema : FilterSchema,
  onSearch (q) {},
}

const App = () => {
  return (
    <Filter {...filterProps}/>
  )
};

export default App;

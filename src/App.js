import React from 'react';
import { NavList as A } from 'sep';

const dataSource = [
  {
    title: '全部',
    value: 0,
    key: 'total'
  },
  {
    title: '未开始',
    value: 3,
    key: 'not_start'
  }
]

const navListProps = {
  dataSource,
  defaultKey: 'total',
  onChange: data => {
    console.log(`Data: ${data.value}`)
  }
}

const App = () => {
  return (
    <A {...navListProps} />
  )
};

export default App;

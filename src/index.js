import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// 引入路由部分
import { BrowserRouter} from "react-router-dom";

// 引入antd样式
import "antd/dist/antd.css"



ReactDOM.render(
  <BrowserRouter>
  <App />
  </BrowserRouter>,
  document.getElementById('root')
);


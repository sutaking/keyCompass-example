import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router'
import "babel-polyfill";

import ListDemo from './listSample';
import FocusSample from './focus/focus';

require('../style/base.css')

/*const appComponent = (<div>
    <div className={'demo-title'}>React ListDemo</div>
    <ListDemo/>
    </div>);

ReactDOM.render(
    demoRouter, document.getElementById('container')
);*/

const listDemoComponent = React.createClass({

    render() {
        return (<div className={'wrapper'}>
            <div className={'demo-title'}>React ListDemo</div>
            < ListDemo / >
            </div>);
    }
});

const focusDemo = React.createClass({
    render() {
        return (<div style={{width:'1920px', height: '1080px', background:'black'}}><FocusSample/></div>);
    }
});

const demoRouter = React.createClass({
  render() {
    return (
      <div>
        <h1>CAPH Demo Router Tutorial</h1>
        <ul role="nav">
          <li><Link to="/ListDemo">ListDemo</Link></li>
          <li><Link to="/FocusDemo">FocusDemo</Link></li>
        </ul>
      </div>
    )
  }
});

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={demoRouter}/>
    <Route path="/ListDemo" component={listDemoComponent}/>
    <Route path="/FocusDemo" component={focusDemo}/>
  </Router>
), document.getElementById('container'));


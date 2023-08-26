import React, { Component } from 'react';

export class Home extends Component {
  static displayName = Home.name;

  render() {
    return (
      <div>
        <h1>База клиентов</h1>
        <p>Добро пожаловать в базу клиентов</p>
      </div>
    );
  }
}

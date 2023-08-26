import React, { Component } from 'react';

export class DriversUi extends Component {
  static displayName = DriversUi.name;

  API_URL = "http://localhost:44496/";

  constructor(props) {
      super(props);
      this.state = {
          drivers: [],
          modalTitle: "",
          ClientId: 0,
          LastName: "",
          FirstName: "",
          Vehicle: "",
          Vin_code: "",

          LastNameFilter: "",
          DriversWithoutFilter: []
      };
  }

  FilterFn() {
      var LastNameFilter = this.state.LastNameFilter;

      var filteredData = this.state.DriversWithoutFilter.filter(
          function (el) {
              return el.LastName.toString().toLowerCase().includes(
                    LastNameFilter.toString().trim().toLowerCase()
              )
          }
      );

      this.setState({ drivers: filteredData });
  }

  changeLastNameFilter = (e) => {
      this.state.LastNameFilter = e.target.value;
      this.FilterFn();
  }

  refreshList() {
      fetch(this.API_URL + "drivers")
      .then(responce => responce.json())
      .then(data => {
      this.setState({ drivers: data, DriversWithoutFilter: data });
      });
  }

  componentDidMount() {
      this.refreshList();
  }

  changeLastName = (e) => {
      this.setState({ LastName: e.target.value });
  }

  changeFirstName = (e) => {
      this.setState({ FirstName: e.target.value });
  }

  changeVehicle = (e) => {
      this.setState({ Vehicle: e.target.value });
  }

  changeVin_code = (e) => {
      this.setState({ Vin_code: e.target.value });
  }

  addClick() {
      this.setState({
          modalTitle: "Добавить водителя",
          ClientId: 0,
          LastName: "",
          FirstName: "",
          Vehicle: "",
          Vin_code: ""
      });
  }

  editClick(drv) {
      this.setState({
          modalTitle: "Редактировать водителя",
          ClientId: drv.ClientId,
          LastName: drv.LastName,
          FirstName: drv.FirstName,
          Vehicle: drv.Vehicle,
          Vin_code: drv.Vin_code
      });
  }

  createClick() {
      fetch(this.API_URL + "drivers", {
          method: "POST",
          headers: {
              "Accept": "application/json",
              "content-type": "application/json"
          },
          body: JSON.stringify({
          LastName: this.state.LastName,
          FirstName: this.state.FirstName,
          Vehicle: this.state.Vehicle,
          Vin_code: this.state.Vin_code
          })
      })
      .then(res => res.json())
      .then(result => {
      alert(result)
      this.refreshList();
      }, (error) => {
              alert("Ошибка");
      })
  }

  updateClick() {
      fetch(this.API_URL + "drivers", {
          method: "PUT",
          headers: {
              "Accept": "application/json",
              "content-type": "application/json"
          },
          body: JSON.stringify({
          ClientId: this.state.ClientId,
          LastName: this.state.LastName,
          FirstName: this.state.FirstName,
          Vehicle: this.state.Vehicle,
          Vin_code: this.state.Vin_code
          })
      })
      .then(res => res.json())
      .then((result) => {
      alert(result);
      this.refreshList();
      }, (error) => {
      alert("Ошибка");
      })
  }

  deleteClick(id) {
      if (window.confirm("Вы уверены?")) {

          fetch(this.API_URL + "drivers/" + id, {
              method: "DELETE",
              headers: {
                  "Accept": "application/json",
                  "content-type": "application/json"
              }
          })
          .then(res => res.json())
          .then((result) => {
          alert(result);
          this.refreshList();
          }, (error) => {
          alert("Ошибка");
          })
      }
  }

  render() {
      const {
          drivers,
          modalTitle,
          ClientId,
          LastName,
          FirstName,
          Vehicle,
          Vin_code
      } = this.state;
      return (
          <div>
              <button type="button"
                  className="btn btn-primary m-2 float-end"
                  title="Добавить водителя"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  onClick={() => this.addClick()}>
                  Добавить водителя
              </button>
              <h1>Водители</h1>
              <table className="table table-striped">
                  <thead>
                      <tr>
                          <th>ID клиента</th>
                          <th>
                              <input
                                  className="form-control m-2"
                                  title="Введите фамилию"
                                  onChange={this.changeLastNameFilter}
                                  placeholder="Поиск"
                              />
                              Фамилия
                          </th>
                          <th>Имя</th>
                          <th>Автомобиль</th>
                          <th>Вин_код</th>
                          <th>Изменить/Удалить</th>
                      </tr>
                  </thead>
                  <tbody>
                      {drivers.map(drv =>
                          <tr key={drv.ClientId}>
                              <td>{drv.ClientId}</td>
                              <td>{drv.LastName}</td>
                              <td>{drv.FirstName}</td>
                              <td>{drv.Vehicle}</td>
                              <td>{drv.Vin_code}</td>
                              <button type="button"
                                  className="btn btn-light mr-1"
                                  title="Редактировать"
                                  data-bs-toggle="modal"
                                  data-bs-target="#exampleModal"
                                  onClick={() => this.editClick(drv)}>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                      <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                  </svg>
                              </button>
                              <button type="button"
                                  className="btn btn-light mr-1"
                                  title="Удалить"
                                  onClick={() => this.deleteClick(drv.ClientId)}>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                      <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                                  </svg>
                              </button>
                          </tr>
                      )}
                  </tbody>
              </table>

              <div className="modal fade" id="exampleModal" tabIndex="-1" aria-modal="true" aria-hidden="true">
                  <div className="modal-dialog modal-lg modal-dialog-centered">
                      <div className="modal-content">
                          <div className="modal-header">
                              <h5 className="modal-title">{modalTitle}</h5>
                              <button type="button" className="btn-close" title="Закрыть."
                              data-bs-dismiss="modal" aria-label="close"></button>
                          </div>

                          <div className="modal-body">
                              <div className="input-group mb-3">
                                  <span className="input-group-text">Фамилия</span>
                                  <input type="text" className="form-control"
                                      value={LastName}
                                      onChange={this.changeLastName}
                                  />
                              </div>

                              <div className="input-group mb-3">
                                  <span className="input-group-text">Имя</span>
                                  <input type="text" className="form-control"
                                      value={FirstName}
                                      onChange={this.changeFirstName}
                                  />
                              </div>

                              <div className="input-group mb-3">
                                  <span className="input-group-text">Автомобиль</span>
                                  <input type="text" className="form-control"
                                      value={Vehicle}
                                      onChange={this.changeVehicle}
                                  />
                              </div>

                              <div className="input-group mb-3">
                                  <span className="input-group-text">Вин_код</span>
                                  <input type="text" className="form-control"
                                      value={Vin_code}
                                      onChange={this.changeVin_code}
                                  />
                              </div>

                              {ClientId == 0 ?
                                  <button type="button" className="btn btn-primary  float-start" title="Создать."
                                  onClick={() => this.createClick()}>Создать</button> : null
                              }

                              {ClientId != 0 ?
                                  <button type="button" className="btn btn-primary float-start" title="Обновить."
                                  onClick={() => this.updateClick()}>Обновить</button> : null
                              }

                          </div>
                      </div>
                  </div>
              </div>
          </div>
      );
  }
}
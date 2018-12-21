import React, { PureComponent } from "react";
import "./ValidationTabCreateNew.css";

export default class ValidationTabCreateNew extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      login: ""
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleLoginChange = this.handleLoginChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleNameChange(event) {
    const name = event.target.value;
    this.setState(() => ({
      name
    }));
  }
  handleLoginChange(event) {
    const login = event.target.value;
    this.setState(() => ({
      login
    }));
  }
  handleSubmit(event) {
    event.preventDefault();
    if (this.state.name && this.state.login) {
      this.props.createNewTab({ ...this.state });
      this.setState(() => ({
        name: "",
        login: ""
      }));
    }
  }
  render() {
    return (
      <div className="validation-tab-creation" id="add-transaction">
        <div>
          <strong>Create new tab:</strong>
        </div>
        <form onSubmit={this.handleSubmit}>
          <div className="input-group">
            <label>
              Employee Name
              <input
                type="text"
                placeholder="Employee name"
                value={this.state.name}
                onChange={this.handleNameChange}
                required
              />
            </label>
          </div>
          <div className="input-group">
            <label>
              Employee Login
              <input
                type="text"
                placeholder="Employee login"
                value={this.state.login}
                onChange={this.handleLoginChange}
                required
              />
            </label>
          </div>

          <button type="submit" className="create-tab-button">
            Create
          </button>
        </form>
      </div>
    );
  }
}

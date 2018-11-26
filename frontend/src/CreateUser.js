import React, { Component } from 'react';
import './App.css';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

const CREATE_USER = gql`
  mutation CreateUser(
    $firstName: String!
    $lastName: String!
    $email: String!
  ) {
    createUser(
      data: { firstName: $firstName, lastName: $lastName, email: $email }
    ) {
      createdAt
    }
  }
`;

class CreateUser extends Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
  };

  handleInputChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    return (
      <Mutation mutation={CREATE_USER}>
        {(createUser, { data }) => (
          <div>
            <form
              onSubmit={e => {
                e.preventDefault();
                createUser({ variables: this.state });
              }}
              className="form"
            >
              <label htmlFor="firstName">First name</label>
              <input
                className="input"
                name="firstName"
                id="firstName"
                value={this.state.firstName}
                onChange={this.handleInputChange}
              />
              <label htmlFor="lastName">Last name</label>
              <input
                className="input"
                name="lastName"
                id="lastName"
                value={this.state.lastName}
                onChange={this.handleInputChange}
              />
              <label htmlFor="email">Email</label>
              <input
                className="input"
                name="email"
                id="email"
                value={this.state.email}
                onChange={this.handleInputChange}
              />
              <button type="submit">Create account</button>
            </form>
          </div>
        )}
      </Mutation>
    );
  }
}

export default CreateUser;

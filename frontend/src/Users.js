import React, { Component } from 'react';
import './App.css';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const query = gql`
  {
    users {
      firstName
      lastName
      email
    }
  }
`;

class Users extends Component {
  render() {
    return (
      <Query query={query}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error :(</p>;

          return data.users.map(({ firstName, lastName, email }) => (
            <div key={email}>
              <p>{`${firstName}: ${lastName}: ${email}`}</p>
            </div>
          ));
        }}
      </Query>
    );
  }
}

export default Users;

import React, { Component } from 'react';
import './App.css';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const query = gql`
  {
    specs {
      title
      content
    }
  }
`;

class Specs extends Component {
  render() {
    return (
      <Query query={query}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error :(</p>;

          return data.specs.map(({ title, content }) => (
            <div key={title}>
              <h2>{title}</h2> <p>{content}</p>
            </div>
          ));
        }}
      </Query>
    );
  }
}

export default Specs;

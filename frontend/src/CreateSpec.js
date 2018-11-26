import React, { Component } from 'react';
import './App.css';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
import Dante from 'Dante2';

const GET_SPEC = gql`
  query GetSpec($id: ID!) {
    spec(where: { id: $id }) {
      title
      content
      updatedAt
    }
  }
`;

const CREATE_SPEC = gql`
  mutation CreateUser($title: String!, $content: String!, $email: String!) {
    createSpec(
      data: {
        title: $title
        content: $content
        author: { connect: { email: $email } }
      }
    ) {
      createdAt
    }
  }
`;

class CreateSpec extends Component {
  state = {
    title: '',
    content: undefined,
    email: '',
  };

  handleInputChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    console.log(this.state.content);
    return (
      <Query query={GET_SPEC} variables={{ id: 'cjoxz5j3tlvby0a71mrw9o3dq' }}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error :</p>;

          if (data) {
            return (
              <Mutation mutation={CREATE_SPEC}>
                {createSpec => (
                  <div>
                    <form
                      onSubmit={e => {
                        e.preventDefault();
                        createSpec({ variables: this.state });
                      }}
                      className="form"
                    >
                      <label htmlFor="firstName">Title</label>
                      <input
                        className="input"
                        name="title"
                        id="title"
                        value={this.state.title}
                        onChange={this.handleInputChange}
                      />
                      <label htmlFor="lastName">Content</label>
                      <Dante
                        className="textarea"
                        name="content"
                        id="content"
                        content={JSON.parse(data.spec.content) || null}
                        data_storage={{
                          save_handler: (state, content) => {
                            this.setState({ content: JSON.stringify(content) });
                          },
                          interval: 1500,
                          url: '/store', // fake URL that I'm not actually going to call
                          method: 'POST',
                        }}
                      />
                      <label htmlFor="email">Email</label>
                      <input
                        className="input"
                        name="email"
                        id="email"
                        value={this.state.email}
                        onChange={this.handleInputChange}
                      />
                      <button type="submit">Create spec</button>
                    </form>
                  </div>
                )}
              </Mutation>
            );
          }
        }}
      </Query>
    );
  }
}

export default CreateSpec;

const { gql } = require('apollo-server-express');

exports.typeDefs = gql`
  scalar JSON

  type Employee {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    gender: String!
    salary: Float!
    metaData: JSON!
  }

  type User {
    id: ID
    userName: String!
    email: String!
    password: String!
  }

  type Query {
    getEmployees: [Employee]
    getEmployeeById(employeeId: ID!): Employee
    login(userName: String!, password: String!): User
  }

  type Mutation {
    addEmployee(
      firstName: String!
      lastName: String!
      email: String!
      gender: String!
      salary: Float!
      metaData: JSON
    ): Employee

    updateEmployee(
      employeeId: ID!
      firstName: String!
      lastName: String!
      email: String!
      salary: Float!
      metaData: JSON
    ): Employee

    deleteEmployee(employeeId: ID!): Employee

    signUp(userName: String!, email: String!, password: String!): User
  }
`;


const Employee = require('./models/Employee');
const User = require('./models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secretKey = 'Abhishek.Singhria@georgebrown.ca';

exports.resolvers = {
  Query: {
    getEmployees: async () => {
      return await Employee.find({});
    },
    getEmployeeById: async (_, { employeeId }) => {
      return await Employee.findById(employeeId);
    },
    login: async (_, { userName, password }) => {
      const user = await User.findOne({ userName: userName.toLowerCase() });
      if (!user) {
        throw new Error('User does not exist');
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new Error('Invalid credentials');
      }

      return user;
    },
  },
  Mutation: {
    addEmployee: async (_, args) => {
      const newEmployee = new Employee({
        firstName: args.firstName,
        lastName: args.lastName,
        email: args.email,
        gender: args.gender,
        salary: args.salary,
        metaData: args.metaData,
      });
      return await newEmployee.save();
    },
    updateEmployee: async (_, args) => {
      const updatedEmployee = await Employee.findByIdAndUpdate(
        args.employeeId,
        {
          $set: {
            firstName: args.firstName,
            lastName: args.lastName,
            email: args.email,
            gender: args.gender,
            salary: args.salary,
            metaData: args.metaData,
          },
        },
        { new: true }
      );
      if (!updatedEmployee) {
        throw new Error('Employee not found');
      }
      return updatedEmployee;
    },
    deleteEmployee: async (_, { employeeId }) => {
      const deletedEmployee = await Employee.findByIdAndDelete(employeeId);
      if (!deletedEmployee) {
        throw new Error('Employee not found');
      }
      return deletedEmployee;
    },
    signUp: async (_, args) => {
      const newUser = new User({
        userName: args.userName,
        email: args.email,
        password: args.password,
      });
      return await newUser.save();
    },
  },
};


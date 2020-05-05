import React from 'react';
import { Route } from 'react-router-dom';
import task from './task';
import users from './users';

export default [
    <Route exact path="/users" component={users} noLayout />,
];
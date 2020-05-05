import React from 'react';
import { List, Datagrid, TextField, EmailField } from 'react-admin';


export const UserList = props => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="username" />
            <EmailField source="email" />
        </Datagrid>
    </List>
);
import React from 'react';
import { List, Datagrid, TextField } from 'react-admin';


export const CustomerList = props => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="cName" />
        </Datagrid>
    </List>
);
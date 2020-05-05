import React from 'react';
import { List, Datagrid, TextField } from 'react-admin';


export const TaskstatusList = props => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="tStatus" />
        </Datagrid>
    </List>
);
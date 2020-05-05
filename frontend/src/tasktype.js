import React from 'react';
import { List, Datagrid, TextField } from 'react-admin';


export const TypeList = props => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="tType" />
        </Datagrid>
    </List>
);
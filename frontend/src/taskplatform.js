import React from 'react';
import { List, Datagrid, TextField } from 'react-admin';


export const TaskplatformList = props => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="tPlatform" />
        </Datagrid>
    </List>
);
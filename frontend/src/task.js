import React from 'react';
import { 
    List, Datagrid, TextField, ReferenceField, EditButton, Filter, 
    Edit, Create, SimpleForm,TextInput, SelectInput, ReferenceInput, 
    DateInput , AutocompleteInput
    } from 'react-admin';

const TaskFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search Task Name" source="taskName" alwaysOn/>
        <DateInput
            source="taskDate" 
            label="From Date" 
            options={{
                mode: "portrait",
                locales: "America/Los_Angeles"
            }}
        />
        <TextInput label="# Resource" source="numberOfResource" />
        <TextInput label="# Round" source="numberOfRound" />
        <TextInput source="percentOfComplete" label="% Complete" />
        <DateInput
            source="ECD" 
            label="To ECD" 
            options={{
                mode: "portrait",
                locales: "America/Los_Angeles"
            }}
        />
        <TextInput source="timeSpent" label="Time Spent From" />
        
        <ReferenceInput label="User" source="userId" reference="users" allowEmpty>
            <SelectInput optionText="email" />
        </ReferenceInput>
        <ReferenceInput label="Type" source="tasktypeId" reference="tasktype" allowEmpty>
            <SelectInput optionText="tType" />
        </ReferenceInput>
        <ReferenceInput label="Customer" source="customerId" reference="customer" allowEmpty>
            <SelectInput optionText="cName" />
        </ReferenceInput>
        <ReferenceInput label="Status" source="taskstatusId" reference="taskstatus" allowEmpty>
            <SelectInput optionText="tStatus" />
        </ReferenceInput>
        <ReferenceInput label="Platform" source="taskPlatformId" reference="taskplatform" allowEmpty>
            <SelectInput optionText="tPlatform" />
        </ReferenceInput>
        {/*<ReferenceInput
            label="User"
            source="userId"
            reference="users"
            sort={{ field: 'email', order: 'ASC' }}
            filterToQuery={searchText => ({ email: searchText })}
            allowEmpty={true}
            alwaysOn
        >
            <AutocompleteInput optionText="email" />
        </ReferenceInput>
        */}
    </Filter>
);
export const TaskList = props => (
    <List filters={<TaskFilter />} {...props}>
        <Datagrid rowClick="edit">
            <TextField source="taskName" label="Name" />
            <TextField source="taskDate" label="Date" />
            <TextField source="numberOfResource" label="#Resource" />
            <TextField source="numberOfRound" label="#Round" />
            <TextField source="percentOfComplete" label="%Complete" />
            <TextField source="ECD" label="ECD" />
            <TextField source="timeSpent" label="Time Spent" />
            <TextField source="user.email" label="User" />
            <TextField source="tasktype.tType" label="Type" />
            <TextField source="customer.cName" label="Customer" />
            <TextField source="taskstatus.tStatus" label="Status" />
            <TextField source="taskPlatform.tPlatform" label="Platform" />
            <TextField source="taskComments" label="Comment" />
        </Datagrid>
    </List>
);
const TaskTitle = ({ record }) => {
        return <span>Task {record ? `"${record.title}"` : ''}</span>;
    };
export const TaskEdit = props => (
    <Edit title={<TaskTitle />} {...props}>
        <SimpleForm>
            <TextInput label="Task Name" source="taskName" alwaysOn/>
            <DateInput
                source="taskDate" 
                label="From Date" 
                options={{
                    mode: "portrait",
                    locales: "America/Los_Angeles"
                }}
            />
            <TextInput label="# Resource" source="numberOfResource" />
            <TextInput label="# Round" source="numberOfRound" />
            <TextInput source="percentOfComplete" label="% Complete" />
            <DateInput
                source="ECD" 
                label="To ECD" 
                options={{
                    mode: "portrait",
                    locales: "America/Los_Angeles"
                }}
            />
            <TextInput source="timeSpent" label="Time Spent From" />
            <ReferenceInput label="User" source="userId" reference="users" allowEmpty>
                <SelectInput optionText="email" />
            </ReferenceInput>
            <ReferenceInput label="Type" source="tasktypeId" reference="tasktype" allowEmpty>
                <SelectInput optionText="tType" />
            </ReferenceInput>
            <ReferenceInput label="Customer" source="customerId" reference="customer" allowEmpty>
                <SelectInput optionText="cName" />
            </ReferenceInput>
            <ReferenceInput label="Status" source="taskstatusId" reference="taskstatus" allowEmpty>
                <SelectInput optionText="tStatus" />
            </ReferenceInput>
            <ReferenceInput label="Platform" source="taskPlatformId" reference="taskplatform" allowEmpty>
                <SelectInput optionText="tPlatform" />
            </ReferenceInput>
            <TextInput multiline source="taskComments" label="Task Comments" />
        </SimpleForm>
    </Edit>
);
export const TaskCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <TextInput label="Task Name" source="taskName" alwaysOn/>
            <DateInput
                source="taskDate" 
                label="From Date" 
                options={{
                    mode: "portrait",
                    locales: "America/Los_Angeles"
                }}
            />
            <TextInput label="# Resource" source="numberOfResource" />
            <TextInput label="# Round" source="numberOfRound" />
            <TextInput source="percentOfComplete" label="% Complete" />
            <DateInput
                source="ECD" 
                label="To ECD" 
                options={{
                    mode: "portrait",
                    locales: "America/Los_Angeles"
                }}
            />
            <TextInput source="timeSpent" label="Time Spent From" />
            <ReferenceInput label="User" source="userId" reference="users" allowEmpty>
                <SelectInput optionText="email" />
            </ReferenceInput>
            <ReferenceInput label="Type" source="tasktypeId" reference="tasktype" allowEmpty>
                <SelectInput optionText="tType" />
            </ReferenceInput>
            <ReferenceInput label="Customer" source="customerId" reference="customer" allowEmpty>
                <SelectInput optionText="cName" />
            </ReferenceInput>
            <ReferenceInput label="Status" source="taskstatusId" reference="taskstatus" allowEmpty>
                <SelectInput optionText="tStatus" />
            </ReferenceInput>
            <ReferenceInput label="Platform" source="taskPlatformId" reference="taskplatform" allowEmpty>
                <SelectInput optionText="tPlatform" />
            </ReferenceInput>
            <TextInput multiline source="taskComments" label="Task Comments" />
        </SimpleForm>
    </Create>
);
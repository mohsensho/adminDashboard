import React from 'react';
import RichTextInput from 'ra-input-rich-text';
import { 
    List, Datagrid, TextField, ReferenceField, EditButton, Filter, 
    Edit, Create, SimpleForm,TextInput, SelectInput, ReferenceInput, 
    DateInput , TabbedForm, FormTab, ChipField, downloadCSV
    } from 'react-admin';
import jsonExport from 'jsonexport/dist';

import CustomizableDatagrid from 'ra-customizable-datagrid';
import { makeStyles } from '@material-ui/core/styles';
import classnames from 'classnames';

const useStyles = makeStyles({
    green: {backgroundColor: '#ff7373' },
    red: { backgroundColor: '#74fd74' },
    blue: { backgroundColor: '#0398fc' },
});

const MyTextField = props => {
    const classes = useStyles();
    
    const isOnhold = v => v.toUpperCase() === 'ON HOLD';
    const isInprogress = v => v.toUpperCase() === 'IN PROGRESS';
    const isCompleted = v => v.toUpperCase() === 'COMPLETED';

    return <ChipField  source="taskstatus.tStatus" label="Status" 
    className={classnames({
        [classes.red]: isOnhold(props.record["taskstatus"].tStatus),
        [classes.blue]: isInprogress(props.record["taskstatus"].tStatus),
        [classes.green]: isCompleted(props.record["taskstatus"].tStatus),
    })}
    {...props} />;
};
const exporter = tasks => {
    const tasksForExport = tasks.map(task => {
        let taskForExport = {};
        taskForExport.Name = task.taskName;
        taskForExport.Date = task.taskDate; // add a field
        taskForExport.Resource = task.numberOfResource; // add a field
        taskForExport.Round = task.numberOfRound; // add a field
        taskForExport.Complete = task.percentOfComplete; // add a field
        taskForExport.ECD = task.ECD; // add a field
        taskForExport.TimeSpent = task.timeSpent; // add a field
        taskForExport.User = task.user.email; // add a field
        taskForExport.Type = task.tasktype.tType; // add a field
        taskForExport.Status = task.taskstatus.tStatus; // add a field
        taskForExport.Customer = task.customer.cName; // add a field
        taskForExport.Platform = task.taskPlatform.tPlatform; // add a field
        taskForExport.Comments = task.taskComments.toString().replace( /(<([^>]+)>)/ig, '');; // add a field

        return taskForExport;
    });
    jsonExport(tasksForExport, {
        headers: ['Name', 'Date', 'Resource', 'Round', 'Complete', "ECD", 'TimeSpent', 'User', 'Type', 'Status', 'Customer', 'Platform', 'Comments'] // order fields in the export
    }, (err, csv) => {
        downloadCSV(csv, 'TasksDashboard'); // download as 'posts.csv` file
    });
};
const TaskFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search Task Name" source="taskName" alwaysOn/>

        <DateInput
            source="fromDate" 
            label="From Date" 
            options={{
                mode: "portrait",
                locales: "America/Los_Angeles"
            }}
        />
        <DateInput
            source="toDate" 
            label="To Date" 
            options={{
                mode: "portrait",
                locales: "America/Los_Angeles"
            }}
        />
        <TextInput label="# Resource" source="numberOfResource" />
        <TextInput label="# Round" source="numberOfRound" />
        <TextInput source="percentOfComplete" label="% Complete" />
        <DateInput
            source="fromECD" 
            label="From ECD" 
            options={{
                mode: "portrait",
                locales: "America/Los_Angeles"
            }}
        />
        <DateInput
            source="toECD" 
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
const PostList = props => (
    <List {...props}>
      <CustomizableDatagrid>
        <TextField source="id" />
        <TextField source="title" />
      </CustomizableDatagrid>
    </List>
  );
export const TaskList = props => (
    <List filters={<TaskFilter />} {...props} exporter={exporter}>
        <CustomizableDatagrid rowClick="edit">
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
            <MyTextField/>
            <TextField source="taskPlatform.tPlatform" label="Platform"/>
        </CustomizableDatagrid>
    </List>
);
const TaskTitle = ({ record }) => {
        return <span>Task {record ? `"${record.title}"` : ''}</span>;
    };
export const TaskEdit = props => (
    <Edit title={<TaskTitle />} {...props}>
    <TabbedForm>
        <FormTab label="Task Information">
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
        </FormTab>
        <FormTab label="Task Comment">
            <RichTextInput source="taskComments" label="Task Comments" />
        </FormTab>
    </TabbedForm>
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
            <RichTextInput  source="taskComments" label="Task Comments" />
        </SimpleForm>
    </Create>
);
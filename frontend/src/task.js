import React from 'react';
import RichTextInput from 'ra-input-rich-text';
import { 
    List, Datagrid, TextField, ReferenceField, EditButton, Filter, 
    Edit, Create, SimpleForm,TextInput, SelectInput, ReferenceInput, 
    DateInput , TabbedForm, FormTab, ChipField, downloadCSV, required
    } from 'react-admin';
import jsonExport from 'jsonexport/dist';

import CustomizableDatagrid from 'ra-customizable-datagrid';


// for custom aand conditional formating and styles
import { makeStyles } from '@material-ui/core/styles';
import classnames from 'classnames';

const useStyles = makeStyles({
    green: {backgroundColor: '#00a65a' },
    red: { backgroundColor: '#f39c12' },
    blue: { backgroundColor: '#00c0ef' },
});

// const MyTextField = props => {
//     const classes = useStyles();
    
//     const isOnhold = v => v.toUpperCase() === 'ON HOLD';
//     const isInprogress = v => v.toUpperCase() === 'IN PROGRESS';
//     const isCompleted = v => v.toUpperCase() === 'COMPLETED';
//     console.log("props is = " + props.record[props.source]);
//     console.log("isOnhold "+isOnhold(props.record[props.source]));
//     console.log("isInprogress "+isInprogress(props.record[props.source]));
//     console.log("isCompleted "+isCompleted(props.record[props.source]));
//     return (
//     <ChipField 
//         className={classnames({
//             [classes.red]: isOnhold(props.record[props.source]),
//             [classes.blue]: isInprogress(props.record[props.source]),
//             [classes.green]: isCompleted(props.record[props.source]),
//         })}
//         {...props} 
//     />
//     );
// };
const MyTextField = props => {
    const classes = useStyles();
    
    const isOnhold = v => v.toUpperCase() === 'ON HOLD';
    const isInprogress = v => v.toUpperCase() === 'IN PROGRESS';
    const isCompleted = v => v.toUpperCase() === 'COMPLETED';
    // console.log("props is = " + props.record[props.source]);
    // console.log("isOnhold "+isOnhold(props.record[props.source]));
    // console.log("isInprogress "+isInprogress(props.record[props.source]));
    // console.log("isCompleted "+isCompleted(props.record[props.source]));
    if(isOnhold(props.record[props.source]))
    {
        console.log("isOnhold is true!!!");
        return (
            <ChipField 
                style={{backgroundColor: '#f39c12'}}
                {...props} 
            />
        );
    }else if(isInprogress(props.record[props.source]))
    {
        console.log("isInprogress is true!!!");
        return (
            <ChipField 
                style={{backgroundColor: '#00c0ef'}}
                {...props} 
            />
        );
    }else if(isCompleted(props.record[props.source]))
    {
        console.log("isCompleted is true!!!");
        return (
            <ChipField 
                style={{backgroundColor: '#00a65a'}}
                {...props} 
            />
        );
    }
    // return (
    // <ChipField 
    //     className={classnames({
    //         [classes.red]: isOnhold(props.record[props.source]),
    //         [classes.blue]: isInprogress(props.record[props.source]),
    //         [classes.green]: isCompleted(props.record[props.source]),
    //     })}
    //     {...props} 
    // />
    // );
};
// config export to .csv
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
MyTextField.defaultProps = ReferenceField.defaultProps; // for set classes to myTextField
export const TaskList = props =>{
    const classes = useStyles();
    return(
    <List filters={<TaskFilter />} {...props} exporter={exporter}>
        <CustomizableDatagrid rowClick="edit">
            <TextField source="taskName" label="Name" />
            <TextField source="taskDate" label="Date" />
            <TextField source="numberOfResource" label="#Resource" />
            <TextField source="numberOfRound" label="#Round" />
            <TextField source="percentOfComplete" label="%Complete" />
            <TextField source="ECD" label="ECD" />
            <TextField source="timeSpent" label="Time Spent" />
            <TextField source="tasktype.tType" label="Type" />
            <TextField source="customer.cName" label="Customer" />
            <ReferenceField source="taskstatusId" reference="taskstatus" label="Status">
                <MyTextField source="tStatus" label="Status"/>
            </ReferenceField>
            <TextField source="taskPlatform.tPlatform" label="Platform"/>
            <TextField source="user.email" label="User" />
        </CustomizableDatagrid>
    </List>
)};
const TaskTitle = ({ record }) => {
        return <span>Task {record ? `"${record.taskName}"` : ''}</span>;
    };

export const TaskEdit = props => (
    <Edit title={<TaskTitle />} {...props} >
    <TabbedForm redirect="/task">
        <FormTab label="Task Information">
            <TextInput label="Task Name" source="taskName" alwaysOn/>
            <DateInput
                source="taskDate" 
                label="From Date" 
                options={{
                    mode: "portrait",
                    locales: "America/Los_Angeles"
                }}
                validate={required()}
            />
            <TextInput label="# Resource" source="numberOfResource" validate={required()} />
            <TextInput label="# Round" source="numberOfRound" validate={required()} />
            <TextInput source="percentOfComplete" label="% Complete" validate={required()} />
            <DateInput
                source="ECD" 
                label="To ECD" 
                options={{
                    mode: "portrait",
                    locales: "America/Los_Angeles"
                }}
                validate={required()} 
            />
            <TextInput source="timeSpent" label="Time Spent From" validate={required()} />
            <ReferenceInput label="User" source="userId" reference="users" allowEmpty={false}>
                <SelectInput optionText="email"  validate={required()}/>
            </ReferenceInput>
            <ReferenceInput label="Type" source="tasktypeId" reference="tasktype" allowEmpty={false}>
                <SelectInput optionText="tType" validate={required()} />
            </ReferenceInput>
            <ReferenceInput label="Customer" source="customerId" reference="customer" allowEmpty={false}>
                <SelectInput optionText="cName" validate={required()} />
            </ReferenceInput>
            <ReferenceInput label="Status" source="taskstatusId" reference="taskstatus" allowEmpty={false}>
                <SelectInput optionText="tStatus" validate={required()} />
            </ReferenceInput>
            <ReferenceInput label="Platform" source="taskPlatformId" reference="taskplatform" allowEmpty={false}>
                <SelectInput optionText="tPlatform" validate={required()} />
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
        <SimpleForm redirect="/task">
            <TextInput label="Task Name" source="taskName" alwaysOn validate={required()}/>
            <DateInput
                source="taskDate" 
                label="From Date" 
                options={{
                    mode: "portrait",
                    locales: "America/Los_Angeles"
                }}
                validate={required()}
            />
            <TextInput label="# Resource" source="numberOfResource" validate={required()}/>
            <TextInput label="# Round" source="numberOfRound" validate={required()}/>
            <TextInput source="percentOfComplete" label="% Complete" validate={required()}/>
            <DateInput
                source="ECD" 
                label="To ECD" 
                options={{
                    mode: "portrait",
                    locales: "America/Los_Angeles"
                }}
                validate={required()}
            />
            <TextInput source="timeSpent" label="Time Spent From" validate={required()}/>
            <ReferenceInput label="User" source="userId" reference="users" allowEmpty={false}>
                <SelectInput optionText="email" validate={required()} />
            </ReferenceInput>
            <ReferenceInput label="Type" source="tasktypeId" reference="tasktype" allowEmpty={false}>
                <SelectInput optionText="tType" validate={required()} />
            </ReferenceInput>
            <ReferenceInput label="Customer" source="customerId" reference="customer" allowEmpty={false}>
                <SelectInput optionText="cName" validate={required()} />
            </ReferenceInput>
            <ReferenceInput label="Status" source="taskstatusId" reference="taskstatus" allowEmpty={false}>
                <SelectInput optionText="tStatus" validate={required()} />
            </ReferenceInput>
            <ReferenceInput label="Platform" source="taskPlatformId" reference="taskplatform" allowEmpty={false}>
                <SelectInput optionText="tPlatform" validate={required()} />
            </ReferenceInput>
            <RichTextInput  source="taskComments" label="Task Comments" />
        </SimpleForm>
    </Create>
);
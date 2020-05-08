import React from 'react';
import { Admin, Resource } from 'react-admin';
import { TaskList, TaskEdit, TaskCreate } from './task';
import { ReleaseList } from './release';
import { PatchList } from './patch';
import { EscalationList } from './escalation';
import { UserList } from './users';
import { TypeList } from './tasktype';
import { CustomerList } from './customer';
import { TaskstatusList } from './taskstatus';
import { TaskplatformList } from './taskplatform';
//import jsonServerProvider from 'ra-data-json-server';
import Dashboard from './Dashboard';
import authProvider from './authProvider';

//import PostIcon from '@material-ui/icons/Book';
import TaskIcon from '@material-ui/icons/Book';
import UserIcon from '@material-ui/icons/Group';
import ListAltIcon from '@material-ui/icons/ListAlt';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import BlurLinearIcon from '@material-ui/icons/BlurLinear';
import PresentToAllIcon from '@material-ui/icons/PresentToAll';
import SettingsOverscanIcon from '@material-ui/icons/SettingsOverscan';
import PictureInPictureIcon from '@material-ui/icons/PictureInPicture';

//const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');
import taskProvider from './taskProvider';
const App = () => (
    <Admin dashboard={Dashboard} authProvider={authProvider} dataProvider={taskProvider}>
        {/*<Resource name="posts" list={PostList} edit={PostEdit} create={PostCreate} icon={PostIcon}/>*/}
        <Resource name="task" list={TaskList} edit={TaskEdit} create={TaskCreate} icon={TaskIcon} />
        <Resource name="release" list={ReleaseList} edit={TaskEdit} icon={PresentToAllIcon} />
        <Resource name="patch" list={PatchList} edit={TaskEdit} icon={PictureInPictureIcon} />
        <Resource name="escalation" list={EscalationList} edit={TaskEdit} icon={SettingsOverscanIcon} />
        <Resource name="tasktype" list={TypeList} icon={ListAltIcon} />
        <Resource name="customer" list={CustomerList} icon={AccountBoxIcon} />
        <Resource name="taskstatus" list={TaskstatusList} icon={ContactSupportIcon} />
        <Resource name="taskplatform" list={TaskplatformList} icon={BlurLinearIcon} />
        <Resource name="users"  list={UserList} icon={UserIcon} />
    </Admin>
);

export default App;
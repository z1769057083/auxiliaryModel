import Home from '@/containers/Home'
import TextMarkIndex from '@/containers/TextMark/TextMarkIndex'
import UserManage from "../containers/UserManage";
import PersonManage from "../containers/PersonManage";
import ModelAnaly from '../containers/ModelAnaly'
import TextFilter from '@/containers/TextFilter'
import AddProject from "../containers/AddProject";
export const childRoutes = [
    {
        path:'/home',
        component: Home
    },
    {
        path:'/text/mark',
        component: TextMarkIndex
    },
    {
        path:'/user/manage',
        component: UserManage
    },
    {
        path:'/person/manage',
        component: PersonManage
    },
    {
        path:'/model/analy',
        component: ModelAnaly
    },
    {
        path:'/text/filter',
        component:TextFilter
    },
    {
        path:'/add/project',
        component:AddProject
    }
]
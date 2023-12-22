import { Routes, Route } from "react-router-dom"
import Layout from "./components/Layout"
import Public from "./components/Public"
import Login from "./features/auth/Login"
import DashLayout from "./components/DashLayout"
import Welcome from "./features/auth/Welcome"
import NotesList from "./features/notes/NotesList"
import UsersList from "./features/users/UsersList"
import EditUser from "./features/users/EditUser"
import NewUserForm from "./features/users/NewUserForm"
import EditNote from "./features/notes/EditNote"
import NewNote from "./features/notes/NewNote"
import Prefetch from "./features/auth/Prefetch"
import PersistLogin from "./features/auth/PersistLogin"
import RequireAuth from "./features/auth/RequireAuth"
import { ROLES } from "./config/roles"

function App() {
  return (
      <Routes >
        <Route path="/" element={<Layout />}>
          
          {/* Public Routes */}
          <Route index element={<Public />} />
          <Route path="login" element={<Login />} />

          {/* Protected Routes */}          
          <Route path="" element={<PersistLogin />} >

            {/* Users with any role can access */}
            <Route path="" element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />} >
              <Route path="" element={<Prefetch />} >
                <Route path="dash" element={<DashLayout />}>
                  <Route index element={<Welcome />} />
                  

                  <Route path="notes">
                    <Route index element={<NotesList />} />
                    <Route path=':id' element={<EditNote />} />
                    <Route path='new' element={<NewNote />} />
                  </Route>
                  
                  {/* Only Managers and Admins can access */}
                  <Route path="" element={<RequireAuth allowedRoles={[ROLES.Manager, ROLES.Admin]} />} >
                    <Route path="users">
                      <Route index element={<UsersList />} />
                      <Route path=':id' element={<EditUser />} />
                      <Route path='new' element={<NewUserForm />} />
                    </Route>
                  </Route>

                </Route> {/* End Dash */}
              </Route> {/* End Prefetch */}
            </Route>    
          </Route> {/* End PersistLogin */}
          {/* End Protected Routes */}

        </Route> {/* End Layout */}

      </Routes>
  );
}

export default App;

import React from "react";
import { Routes , Route } from "react-router-dom";
import Layout from "./components/Layout";
import Public from "./components/Public";
import Login from "./features/auth/Login";
import DashLayout from "./components/DashLayout";
import Welcome from "./features/auth/Welcome";
import BooksList from "./features/books/BooksList";
import UsersList from "./features/users/UsersList";
import NewUserForm from "./features/users/NewUserForm";
import EditUser from "./features/users/EditUser";
import EditBook from "./features/books/EditBook";
import NewBook from "./features/books/NewBook";
import Prefetch from "./features/auth/Prefetch";
import PersistLogin from "./features/auth/PersistLogin";
function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<Public/>}/>
        <Route path="login" element={<Login/>}/>

        <Route element={<PersistLogin/>}>
        <Route element={<Prefetch/>}>

        <Route path="dash" element={<DashLayout/>}>
          <Route index  element={<Welcome/>}/>
          <Route path="books">
            <Route index element={<BooksList/>}/>
            <Route path=":id" element={<EditBook/>}/>
            <Route path="new" element={<NewBook/>}/>
          </Route>
          <Route path="users">
            <Route index element={<UsersList/>}/>
            <Route path=":id" element={<EditUser/>}/>
            <Route path="new" element={<NewUserForm/>}/>
          </Route>
        </Route>

        </Route>
        </Route>
        
      </Route>
    </Routes>
    </>
  );
}

export default App;

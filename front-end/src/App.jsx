import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout/Layout.jsx";
import Home from "./components/Home/Home.jsx";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.jsx";
import Login from "./components/Login/Login.jsx";
import Register from "./components/Register/Register.jsx";
import UserContextProvider from "./Context/UserContext.jsx";
import NoteContextProvider from "./Context/NoteContext.jsx";
/*
2.project setup_routing  //npm run dev
3.Registeration 
4. Login 
5. Get Notes 
6.delete note 
7.add note
8.add note part 2
9.update note
10.logOut
*/

function App() {
  const routes = createBrowserRouter([
    {path:"/", element:<ProtectedRoute><Layout/></ProtectedRoute>,children:[
      {
        index:true, element:<Home/>
      }
    ]},
    {path:"/login", element: <Login/>},
    {path:"/signUp", element: <Register/>},
  ])
  return <>
  <UserContextProvider>
    <NoteContextProvider>
     <RouterProvider router={routes}/>
    </NoteContextProvider>
  </UserContextProvider>
  
  </>;
}

export default App;

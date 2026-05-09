import { createBrowserRouter, RouterProvider } from 'react-router';
import './App.css';
import RootLayout from './Components/RootLayout';
import Home from './Components/Home';
import AddUser from './Components/AddUser';
import UsersList from './Components/UsersList';
import User from './Components/User';


function App() {
  const routerObj = createBrowserRouter([
    {
      path:'/',
      element:<RootLayout />,
      children:[
        {
          path:'',
          element:<Home />
        },
        {
          path:"add-user",
          element:<AddUser />
        },
        {
          path:"users-list",
          element:<UsersList />
        },
        {
          path:"user",
          element:<User />
        }
      ]
    }
  ])

  return <RouterProvider router={routerObj} />
}

export default App

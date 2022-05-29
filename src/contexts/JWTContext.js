import { createContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink, Navigate } from 'react-router-dom';
// utils
import axios from '../utils/axios';
import { isValidToken, setSession } from '../utils/jwt';
import { PATH_AUTH } from '../routes/paths';


// ----------------------------------------------------------------------

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

const handlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
    };
  },
  LOGIN: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
  LOGOUT: (state) => ({
    ...state,
    isAuthenticated: false,
    user: null,
  }),
  REGISTER: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
};

const reducer = (state, action) => (handlers[action.type] ? handlers[action.type](state, action) : state);

const AuthContext = createContext({
  ...initialState,
  method: 'jwt',
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve(),
});

// ----------------------------------------------------------------------

AuthProvider.propTypes = {
  children: PropTypes.node,
};

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = window.localStorage.getItem('accessToken');

        if (accessToken && isValidToken(accessToken)) {
          setSession(accessToken);

          const response = await axios.get('/api/account/my-account');
          const { user } = response.data;

          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: true,
              user,
            },
          });
        } else {
          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: 'INITIALIZE',
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    };

    initialize();
  }, []);

  const login = async (email, password) => {
    // process.env.REACT_APP_LOGIN_API
    const response = await axios.post("http://tourbook-backend.herokuapp.com/user/login", {
      email,
      password,
    })
      localStorage.setItem('role',response.data.data.role);
      console.log(response.data.data.role);
      console.log(localStorage.getItem('role'));
      localStorage.setItem('balance',response.data.data.balance);
      localStorage.setItem('name',response.data.data.name);
      const { accessToken, user } = response.data;
      console.log(response.data, "login success..", response.data.data.token);
      setSession(response.data.data.token);
      window.localStorage.setItem('accessToken', response.data.data.token);
      dispatch({
        type: 'LOGIN',
        payload: {
          user,
        },
    });
  };

  const register = async(Email, Password, FirstName, LastName, City, Country, Role, Gender, Cnic) => {
    const response = await axios.post("http://tourbook-backend.herokuapp.com/user/signup", {
      email: Email,
      password:Password,
      phoneNumber:FirstName,
      fname: FirstName,
      lname: LastName,
      city: City,
      country:Country,
      role: Role,
      gender: Gender, 
      cnic: Cnic,
    });
    const { accessToken, user } = response.data;
    <Navigate to={PATH_AUTH.login} replace />
    console.log("user signed up",response.data);
    window.localStorage.setItem('accessToken', accessToken);
    dispatch({
      type: 'REGISTER',
      payload: {
        user,
      },
    });
  };

  const logout = async () => {
    setSession(null);
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'jwt',
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };

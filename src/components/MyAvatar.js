// hooks
import useAuth from '../hooks/useAuth';
// utils
import createAvatar from '../utils/createAvatar';
//
import Avatar from './Avatar';

// ----------------------------------------------------------------------

export default function MyAvatar({ ...other }) {
  const { user } = useAuth();

  const photo = localStorage.getItem('pic');
  const name = localStorage.getItem('name');

  return (
    <Avatar src={photo} alt={name} color={photo ? 'default' : createAvatar(name).color} {...other}>
      {createAvatar(name).name}
    </Avatar>
  );
}

import { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleUser, updateUser } from '../redux/actions';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 100,
    '& > *': {
      margin: theme.spacing(2),
      width: '50ch',
    },
  },
}));

const EditUser = () => {
  const classes = useStyles();
  const [data, setData] = useState({
    name: '',
    email: '',
    contact: '',
    address: '',
  });
  const [error, setError] = useState('');
  let { id } = useParams();
  const { user } = useSelector((state) => state.data);
  let history = useHistory();
  let dispatch = useDispatch();
  const { name, email, contact, address } = data;

  useEffect(() => {
    dispatch(getSingleUser(id));
  }, []);

  useEffect(() => {
    if (user) {
      setData({ ...user });
    }
  }, [user]);

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !address || !email || !contact) {
      setError('Please fill all the fields with informaion!');
    } else {
      dispatch(updateUser(data, id));
      history.push('/');
      setError('');
    }
  };

  return (
    <div>
      <Button
        style={{ width: '100px', marginTop: '30px' }}
        variant='contained'
        color='secondary'
        onClick={() => history.push('/')}
      >
        Go Back
      </Button>
      <h2>Edit the User</h2>
      {error && <h3 style={{ color: 'red' }}>{error}</h3>}
      <form
        className={classes.root}
        noValidate
        autoComplete='off'
        onSubmit={handleSubmit}
      >
        <TextField
          id='standard-basic'
          label='Name'
          name='name'
          value={name || ''}
          type='text'
          onChange={handleInputChange}
        />
        <br />
        <TextField
          id='standard-basic'
          label='Email'
          name='email'
          value={email || ''}
          type='email'
          onChange={handleInputChange}
        />
        <br />
        <TextField
          id='standard-basic'
          label='Contact'
          name='contact'
          value={contact || ''}
          type='number'
          onChange={handleInputChange}
        />
        <br />
        <TextField
          id='standard-basic'
          label='Address'
          name='address'
          value={address || ''}
          type='text'
          onChange={handleInputChange}
        />
        <br />
        <Button
          style={{ width: '150px', marginTop: '30px' }}
          variant='contained'
          color='primary'
          type='submit'
        >
          Update
        </Button>
      </form>
    </div>
  );
};

export default EditUser;

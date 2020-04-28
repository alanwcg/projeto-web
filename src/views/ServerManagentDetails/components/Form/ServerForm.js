import React, { useState, useEffect, useCallback } from 'react';
import Select from 'react-select';
import clsx from 'clsx';
import validate from 'validate.js';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Button,
  TextField,
  Card,
  CardHeader,
  CardContent,
  Divider,
  Switch,
  Avatar,
  colors
} from '@material-ui/core';
import { DropzoneDialog } from 'material-ui-dropzone'
import axios from 'utils/axios';
import { useDropzone } from 'react-dropzone'
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    
  },
  formGroup: {
    marginBottom: theme.spacing(3)
  },
  fieldGroup: {
    display: 'flex',
    alignItems: 'center'
  },
  textField: {
    '& + &': {
      marginLeft: theme.spacing(2)
    }
  },
  actions: {
    backgroundColor: colors.grey[100],
    paddingTop: theme.spacing(2),
    display: 'flex',
    justifyContent: 'flex-start'
  },
  avatar: {
    height: 72,
    width: 72,
    marginRight: theme.spacing(1)
  }
}));

const schema = {
  login: {
    presence: { allowEmpty: false, message: '^Login é obrigatório' }
  },
  password: {
    presence: { allowEmpty: false, message: '^Password é obrigatório' }
  },
  url: {
    presence: { allowEmpty: false, message: '^URL é obrigatória' }
  }
};

const ServerForm = props => {
  const { server, onSubmit, className, ...rest } = props;

  const [formState, setFormState] = useState({
    isValid: false,
    values: { ...server },
    touched: {},
    errors: {}
  });

  const history = useHistory();

  const classes = useStyles();

  useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formState.values]);

  const handleChange = event => {
    event.persist();

    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === 'checkbox'
            ? event.target.checked
            : event.target.value
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }));
  };

  const handleSubmit = async event => {
    event.preventDefault();
    onSubmit(formState.values);
    history.push('/server');
  };

  const onDrop = useCallback(files => {
    const data = new FormData();
    data.append('file', files[0]);
    axios({
      method: 'POST',
      url: '/api/v1/server/new',
      data: data
    })
      .then(response => {
        setFormState(formState => ({
          ...formState,
          values: {
            ...formState.values,
            thumbnail: response.data
          },
          touched: {
            ...formState.touched,
            thumbnail: true
          }
        }));
      }).catch((error) => {
      });
  }, [])
  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;

  return (
    <form
        {...rest}
        className={clsx(classes.root, className)}
        onSubmit={handleSubmit}
      >
      <Card
        {...rest}
        className={clsx(classes.root, className)}>
        <CardHeader title="Dados do servidor" action={<Switch
            checked={formState.values.active}
            onChange={handleChange}
            name="active"
            inputProps={{ 'aria-label': 'secondary checkbox' }}
          />} />
        <CardContent>
          <div className={classes.formGroup}>
            <div {...getRootProps({ refKey: 'innerRef' })} className={classes.avatar}>
              <Avatar 
                className={classes.avatar}
                src={formState.values.thumbnail ? formState.values.thumbnail.uri : ''}
              />
            </div>
           <input {...getInputProps()} />
          </div>
          <div className={classes.formGroup}>
            <TextField
              size="small"
              autoFocus
              fullWidth
              className={classes.textField}
              error={hasError('login')}
              helperText={hasError('login') ? formState.errors.login[0] : null}
              label="Login"
              onChange={handleChange}
              name="login"
              value={formState.values.login}
              variant="outlined"
            />
          </div>
          <div className={classes.formGroup}>
            <TextField
              size="small"
              className={classes.textField}
              fullWidth
              error={hasError('password')}
              helperText={hasError('password') ? formState.errors.password[0] : null}
              label="Senha"
              name="password"
              onChange={handleChange}
              value={formState.values.password}
              variant="outlined"
            />
          </div>
          <div className={classes.formGroup}>
            <TextField
              size="small"
              className={classes.textField}
              fullWidth
              error={hasError('url')}
              helperText={hasError('url') ? formState.errors.url[0] : null}
              label="URL"
              name="url"
              onChange={handleChange}
              value={formState.values.url}
              variant="outlined"
            />
          </div>
        </CardContent>
      </Card>
      <div className={classes.actions}>
        <Button
          disabled={!formState.isValid}
          type="submit"
        >
          Salvar alterações
        </Button>
      </div>
    </form>
  );
};

ServerForm.propTypes = {
  server: PropTypes.object.isRequired,
  className: PropTypes.string
};

export default ServerForm;
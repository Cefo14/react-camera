import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  container: {
    width: '100%',
    height: '100%',
    overflowY: 'hidden',
    position: 'relative',
  },

  image: {
    width: '100%',
    height: '100%',
  },

  actionContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    paddingBottom: theme.spacing(2),
  },

  actionSpace: {
    width: '100%',
    maxWidth: '250px',
    display: 'flex',
    justifyContent: 'space-around',
  },

  iconButton: {
    backgroundColor: '#FFF',
    '&:hover': {
      backgroundColor: '#FFF',
      opacity: '0.9',
    },
  },
}));

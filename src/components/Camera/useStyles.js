import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  container: {
    width: '100%',
    height: '100%',
    overflowY: 'hidden',
    position: 'relative',
  },

  video: {
    width: '100%',
    height: '100%',
    objectFit: 'fill',
  },

  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    paddingBottom: theme.spacing(2),
  },

  button: {
    padding: theme.spacing(0.5),
    backgroundColor: 'transparent',
    borderRadius: '50%',
    border: 'solid 3px #FFF',
  },

  buttonCamera: {
    padding: theme.spacing(4),
    backgroundColor: '#FFF',
    borderRadius: '50%',
  },

  buttonRecording: {
    backgroundColor: '#fe0002',
  },
}));

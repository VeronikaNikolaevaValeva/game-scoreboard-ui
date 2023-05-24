import ProgressBar from 'react-bootstrap/ProgressBar';

function StatusBar(props) {
  return <ProgressBar animated label={`${props.value}%`} now={props.value} />;
}

export default StatusBar;
import {connect} from 'react-redux'
import {Window} from './Window'

const mapActionCreators = {};

const mapStateToProps = (state) => ({
  view: state.view
});

export const WindowContainer = connect(mapStateToProps, mapActionCreators)(Window);

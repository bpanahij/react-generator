import {connect} from 'react-redux'
import {<%= component.className %>} from './<%= component.className %>'

const mapActionCreators = {
};

const mapStateToProps = (state) => ({
});

export const <%= component.className %>Container = connect(mapStateToProps, mapActionCreators)(<%= component.className %>);

import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View, Text} from 'react-native';
import {connect} from 'react-redux';
import {COLORS} from '../../constants';

const NotificationScreen = props => {
  const [user, setUser] = useState();

  return (
    <ScrollView style={styles.main}>
      <View style={styles.detail}>
        <Text style={styles.text}>Notification Screen</Text>
      </View>
    </ScrollView>
  );
};

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  login: body => dispatch(login(body)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NotificationScreen);

const styles = StyleSheet.create({
  main: {
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.white,
    position: 'relative',
    flex: 1,
  },
  detail: {
    padding: 20,
    height: '100%',
    backgroundColor: COLORS.white,
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    display: 'flex',
  },
  text: {
    color: COLORS.black,
    fontWeight: '900',
    fontSize: 18,
  },
});

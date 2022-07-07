import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View, Text} from 'react-native';
import {connect} from 'react-redux';
import {COLORS} from '../constants';

const AccountScreen = props => {
  const [user, setUser] = useState();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.detail}>
        <Text style={styles.text}>Account Screen</Text>
      </View>
    </ScrollView>
  );
};

const mapStateToProps = state => ({
  user: state.user.user,
});

const mapDispatchToProps = dispatch => ({
  login: body => dispatch(login(body)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountScreen);

const styles = StyleSheet.create({
  container: {
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
    fontSize: 18,
  },
});

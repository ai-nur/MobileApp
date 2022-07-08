import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import {COLORS} from '../constants';
import {logout} from '../redux/actions/user';

const AccountScreen = props => {
  const [user, setUser] = useState();

  useEffect(() => {
    if (props.user.data === null) {
      props.navigation.navigate('Login');
    }
  }, [props.user]);

  const handleLogout = async () => {
    await props.logout();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.detail}>
        <Text style={styles.text}>Account Screen</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const mapStateToProps = state => ({
  user: state.user.user,
});

const mapDispatchToProps = dispatch => ({
  login: body => dispatch(login(body)),
  logout: () => dispatch(logout()),
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
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    display: 'flex',
  },
  text: {
    color: COLORS.black,
    fontSize: 28,
    fontFamily: 'Montserrat-Bold',
  },
  logoutButton: {
    width: '100%',
    alignSelf: 'center',
    borderRadius: 15,
    marginTop: 20,
    backgroundColor: COLORS.secondary,
  },
  logoutText: {
    textAlign: 'center',
    color: COLORS.black,
    fontSize: 18,
    padding: 8,
  },
});

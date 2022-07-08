import {ImageBackground, Image, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import {COLORS, images} from '../constants';
import {connect} from 'react-redux';
import {getUser} from '../redux/actions/user';

const SplashScreen = props => {
  useEffect(() => {
    if (props.user.data === null) {
      setTimeout(() => {
        props.navigation.replace('Login');
      }, 3000);
    } else {
      setTimeout(() => {
        props.navigation.replace('Main');
      }, 3000);
    }
  }, [props.user]);

  useEffect(() => {
    props.fetchUser();
  }, []);

  return (
    <ImageBackground source={null} style={styles.background}>
      <Image source={images.LogoUT} style={styles.logo} />
    </ImageBackground>
  );
};

const mapStateToProps = state => ({
  user: state.user.user,
});

const mapDispatchToProps = dispatch => ({
  fetchUser: () => dispatch(getUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
  },
  logo: {
    width: 100,
    height: 100,
  },
});

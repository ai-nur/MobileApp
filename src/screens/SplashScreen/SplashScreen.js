import {ImageBackground, Image, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import {COLORS, images} from '../../constants';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Login');
    }, 3000);
  }, [navigation]);

  return (
    <ImageBackground source={null} style={styles.background}>
      <Image source={images.LogoUT} style={styles.logo} />
    </ImageBackground>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary
  },
  logo: {
    width: 100,
    height: 100,
  },
});

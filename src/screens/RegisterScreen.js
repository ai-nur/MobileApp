import React, {useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {connect} from 'react-redux';
import {COLORS, images} from '../constants';

const RegisterScreen = ({navigation}) => {
  const [account, setAccount] = useState({
    email: '',
    password: '',
    cfPassword: '',
  });
  console.log(account);

  const handleChange = (name, text) => {
    if (name == 'email') {
      const val1 = text;
      setAccount(prevState => ({
        ...prevState,
        [name]: val1,
      }));
    } else if (name == 'password') {
      const val2 = text;
      setAccount(prevState => ({
        ...prevState,
        [name]: val2,
      }));
    } else {
      setAccount(prevState => ({
        ...prevState,
        [name]: text,
      }));
    }
  };

  const handleSignUp = () => {
    console.log('Sign Up');
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image style={{width: 80, height: 80}} source={images.LogoUT} />
      </View>
      <View style={styles.detail}>
        <Text style={styles.detailTitle}>Create your Account</Text>
        <View style={styles.form}>
          <Text style={styles.text}>Email</Text>
          <TextInput
            style={styles.input}
            name="email"
            value={account.email}
            onChangeText={text => handleChange('email', text)}
            placeholder="Email"
            placeholderTextColor="#000"
          />
          <Text style={styles.text}>Password</Text>
          <TextInput
            style={styles.input}
            name="password"
            value={account.password}
            onChangeText={text => handleChange('password', text)}
            secureTextEntry={true}
            placeholder="Password"
            placeholderTextColor="#000"
          />
          <Text style={styles.text}>Confirm Password</Text>
          <TextInput
            style={styles.input}
            name="cfPassword"
            value={account.cfPassword}
            onChangeText={text => handleChange('cfPassword', text)}
            secureTextEntry={true}
            placeholder="Confirm Password"
            placeholderTextColor="#000"
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleSignUp()}
          >
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.textMini}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.replace('Login')}>
            <Text style={styles.textLink}> Login here</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default connect()(RegisterScreen);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.white,
    position: 'relative',
    flex: 1,
  },
  header: {
    width: '100%',
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
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
  detailTitle: {
    fontSize: 20,
    color: COLORS.black,
    fontFamily: 'Montserrat-SemiBold',
    margin: 10,
  },
  form: {
    width: '100%',
    marginHorizontal: 20,
    paddingBottom: 20,
    // borderRadius: 10,
  },
  text: {
    fontSize: 16,
    color: COLORS.black,
    fontFamily: 'Montserrat-Medium',
    letterSpacing: 1,
    lineHeight: 20,
    maxWidth: '85%',
    marginHorizontal: 20,
    marginTop: 10,
  },
  input: {
    fontSize: 14,
    height: 45,
    color: COLORS.black,
    backgroundColor: COLORS.gray2,
    fontFamily: 'Montserrat-Medium',
    letterSpacing: 1,
    borderRadius: 10,
    paddingHorizontal: 20,
    marginHorizontal: 20,
    marginTop: 10,
  },
  button: {
    height: 45,
    marginHorizontal: 20,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 18,
    color: COLORS.white,
  },
  textMini: {
    fontSize: 12,
    color: COLORS.black,
    fontFamily: 'Montserrat-Medium',
    letterSpacing: 1,
    lineHeight: 20,
    maxWidth: '85%',
    marginTop: 10,
  },
  textLink: {
    fontSize: 12,
    color: COLORS.blue,
    fontFamily: 'Montserrat-Medium',
    letterSpacing: 1,
    lineHeight: 20,
    marginTop: 10,
  },
});

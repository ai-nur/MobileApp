import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {COLORS, images} from '../../constants';
import {connect} from 'react-redux';
import {login} from '../../redux/actions/user';

const LoginScreen = props => {
  const [account, setAccount] = useState({
    email: '',
    password: '',
  });
  const [isValid, setIsValid] = useState({
    emailValid: false,
    passwordValid: false,
  });
  const [error, setError] = useState({
    emailError: null,
    passwordError: null,
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (props.user.user !== null && props.user.user !== undefined) {
      props.navigation.navigate('Main');
    }
  }, [props.user]);

  const validation = (name, value) => {
    if (name == 'email') {
      const emailValue = value;
      const emailRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (emailRegEx.test(emailValue)) {
        setIsValid(prevState => ({
          ...prevState,
          emailValid: true,
        }));
        setError(prevState => ({
          ...prevState,
          emailError: null,
        }));
      } else {
        setError(prevState => ({
          ...prevState,
          emailError: 'You have entered an invalid email address!',
        }));
        setIsValid(prevState => ({
          ...prevState,
          emailValid: false,
        }));
      }
    } else {
      const passwordValue = value;
      const passwordRegEx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
      if (passwordRegEx.test(passwordValue)) {
        setIsValid(prevState => ({
          ...prevState,
          passwordValid: true,
        }));
        setError(prevState => ({
          ...prevState,
          passwordError: null,
        }));
      } else {
        let errors = '';
        if (passwordValue.length < 8) {
          errors = 'Your password must be at least 8 characters';
        } else if (passwordValue.search(/[a-zA-Z]/) < 0) {
          errors = 'Your password must contain at least one letter.';
        } else if (passwordValue.search(/[0-9]/) < 0) {
          errors = 'Your password must contain at least one digit.';
        }
        setError(prevState => ({
          ...prevState,
          passwordError: errors,
        }));
        setIsValid(prevState => ({
          ...prevState,
          passwordValid: false,
        }));
      }
    }
  };

  const handleChange = (name, text) => {
    if (name == 'email') {
      const emailValue = text;
      validation('email', emailValue);
      setAccount(prevState => ({
        ...prevState,
        [name]: emailValue,
      }));
    } else {
      const passwordValue = text;
      validation('password', passwordValue);
      setAccount(prevState => ({
        ...prevState,
        [name]: passwordValue,
      }));
    }
  };

  const handleSignIn = async () => {
    console.log(account);
    setIsLoading(true);
    await props.login(account);
  };
  return (
    <ScrollView style={styles.main}>
      <View style={styles.header}>
        <Image style={{width: 80, height: 80}} source={images.LogoUT} />
      </View>
      <View style={styles.detail}>
        <Text style={styles.detailTitle}>Login to your Account</Text>
        <View style={styles.form}>
          <Text style={styles.text}>Email</Text>
          <TextInput
            style={styles.input}
            name="email"
            textContentType="emailAddress"
            value={account.email}
            onChangeText={text => handleChange('email', text)}
            placeholder="Email"
            placeholderTextColor="#000"
          />
          <Text style={styles.text}>Password</Text>
          <TextInput
            style={styles.input}
            name="password"
            textContentType="password"
            value={account.password}
            onChangeText={text => handleChange('password', text)}
            secureTextEntry={true}
            placeholder="Password"
            placeholderTextColor="#000"
          />
          {/* <View style={{flexDirection: 'row'}}> */}
          {error.passwordError ? (
            <Text style={styles.textError}>{error.passwordError}</Text>
          ) : null}
          {error.emailError ? (
            <Text style={styles.textError}>{error.emailError}</Text>
          ) : null}
          {/* </View> */}
          {isValid.emailValid == true && isValid.passwordValid == true ? (
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleSignIn()}
            >
              {isLoading ? (
                <ActivityIndicator animating={true} color={COLORS.blue} />
              ) : (
                <Text style={styles.buttonText}>Sign In</Text>
              )}
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.buttonDisabled} disabled>
              <Text style={styles.buttonTextDisabled}>Sign In</Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.textMini}>Don't have an account?</Text>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Register')}
          >
            <Text style={styles.textLink}> Register here</Text>
          </TouchableOpacity>
        </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);

const styles = StyleSheet.create({
  main: {
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
    fontWeight: '900',
    color: COLORS.black,
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
  textError: {
    fontSize: 12,
    color: COLORS.red,
    fontFamily: 'Montserrat-Regular',
    letterSpacing: 1,
    lineHeight: 20,
    marginTop: 10,
    marginHorizontal: 20,
  },
  button: {
    height: 45,
    marginHorizontal: 20,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonDisabled: {
    height: 45,
    marginHorizontal: 20,
    backgroundColor: COLORS.third,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 18,
    fontWeight: '900',
    color: COLORS.black,
  },
  buttonTextDisabled: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 18,
    fontWeight: '900',
    opacity: 0.5,
    color: COLORS.black,
  },
  textMini: {
    fontSize: 12,
    color: COLORS.black,
    fontFamily: 'Montserrat-Regular',
    letterSpacing: 1,
    lineHeight: 20,
    maxWidth: '85%',
    marginTop: 10,
  },
  textLink: {
    fontSize: 12,
    color: COLORS.blue,
    fontFamily: 'Montserrat-Regular',
    letterSpacing: 1,
    lineHeight: 20,
    marginTop: 10,
  },
});

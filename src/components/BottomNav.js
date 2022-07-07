import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {
  COLORS,
  IconHome,
  IconHomeActive,
  IconNotification,
  IconNotificationActive,
  IconProfile,
  IconProfileActive,
  IconSetting,
  IconSettingActive,
} from '../constants';

const Icon = ({isFocused, label}) => {
  switch (label) {
    case 'Home':
      return isFocused ? <IconHomeActive /> : <IconHome />;
    case 'Notification':
      return isFocused ? <IconNotificationActive /> : <IconNotification />;
    case 'Account':
      return isFocused ? <IconProfileActive /> : <IconProfile />;
    case 'Setting':
      return isFocused ? <IconSettingActive /> : <IconSetting />;
    default:
      return false;
  }
};

function BottomNav({state, descriptors, navigation}) {
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({name: route.name, merge: true});
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.containerTab}
          >
            <Icon label={label} isFocused={isFocused} />
            <Text style={styles.textTab(isFocused)}>{label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
export default BottomNav;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  containerTab: {
    backgroundColor: COLORS.primary,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: '24%',
    marginHorizontal: 10,
  },
  textTab: isFocused => ({
    fontSize: 12,
    fontFamily: isFocused ? 'Montserrat-Medium' : 'Montserrat-Regular',
    color: isFocused ? COLORS.black : COLORS.black,
    margin: 0,
    width: '100%',
  }),
});

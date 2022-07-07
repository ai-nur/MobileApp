import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import {connect} from 'react-redux';
import {COLORS} from '../constants';
import {listCampaign} from '../redux/actions/campaign';
import moment from 'moment';

const HomeScreen = props => {
  const [user, setUser] = useState();
  const [token, setToken] = useState(null);
  const [listCampaign, setListCampaign] = useState();

  useEffect(() => {
    if (props.user.data !== null && props.user.data !== undefined) {
      setUser(props.user.data);
    }
    if (props.user.data.token) {
      setToken(props.user.data.token);
    }
  }, []);

  useEffect(() => {
    if (props.listCampaign.data) {
      setListCampaign(props.listCampaign.data.data);
    }
  }, [props.listCampaign]);

  useEffect(() => {
    if (token !== null) {
      props.fetchListCampaign(token);
    }
  }, [token]);

  const handleDetail = id => {
    props.navigation.navigate('Detail', {id: id});
  };

  const _renderCard = data => {
    const id = data.campaignId;
    const date = moment(data.createdDate).format('DD MMMM YYYY');
    return (
      <TouchableOpacity
        key={data.campaignId}
        style={styles.cardContainer}
        onPress={() => handleDetail(id)}
      >
        <View>
          <Text
            style={{
              color: COLORS.black,
              fontFamily: 'Montserrat-Medium',
              fontSize: 15,
            }}
          >
            {data.name}
          </Text>
          <Text style={{color: COLORS.black}}>Sender :</Text>
          <View style={{flexDirection: 'column', paddingLeft: 10}}>
            <Text style={{color: COLORS.black}}>Name : {data.fromName}</Text>
            <Text style={{color: COLORS.black}}>Email : {data.fromEmail}</Text>
          </View>
          <Text style={{color: COLORS.black}}>Status : {data.status}</Text>
          <Text style={{color: COLORS.black}}>Date : {date}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.detail}>
        {user ? (
          <>
            <Text style={styles.text}>Wellcome,</Text>
            <Text style={styles.name}>
              {user?.firstname} {user?.lastname}!
            </Text>
          </>
        ) : null}
        <View style={styles.campaign}>
          <Text style={styles.title}>User Campaign</Text>
          <View style={styles.card}>
            {listCampaign ? listCampaign.map(data => _renderCard(data)) : null}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const mapStateToProps = state => ({
  user: state.user.user,
  listCampaign: state.campaign.listCampaign,
});

const mapDispatchToProps = dispatch => ({
  login: body => dispatch(login(body)),
  fetchListCampaign: token => dispatch(listCampaign(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.white,
    position: 'relative',
    flex: 1,
  },
  detail: {
    padding: 25,
    paddingBottom: 15,
    height: '100%',
    backgroundColor: COLORS.white,
    justifyContent: 'flex-start',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    display: 'flex',
  },
  name: {
    color: COLORS.black,
    fontSize: 40,
    fontFamily: 'Montserrat-Bold',
  },
  text: {
    color: COLORS.black,
    fontSize: 22,
    fontFamily: 'Montserrat-Medium',
  },
  campaign: {
    width: '100%',
    marginTop: 20,
  },
  title: {
    color: COLORS.black,
    fontSize: 20,
    fontFamily: 'Montserrat-Medium',
    letterSpacing: 0.5,
    marginBottom: 10,
  },
  card: {
    width: '100%',
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
  },
  cardContainer: {
    width: '100%',
    marginBottom: 10,
    padding: 15,
    borderRadius: 10,
    backgroundColor: COLORS.gray2,
  },
});

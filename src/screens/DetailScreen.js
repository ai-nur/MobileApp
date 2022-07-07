import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View, Text} from 'react-native';
import {connect} from 'react-redux';
import {COLORS} from '../constants';
import {detailCampaign} from '../redux/actions/campaign';

const DetailScreen = props => {
  const {id} = props.route.params;
  const {token} = props.user.data;
  const [detailCampaign, setDetailCampaign] = useState(null);
  const [listCampaign, setListCampaign] = useState(null);

  useEffect(() => {
    props.fetchDetailCampaign(id, token);
  }, []);

  useEffect(() => {
    if (props.detailCampaign.data && detailCampaign === null) {
      setDetailCampaign(props.detailCampaign.data);
    }
    if (props.listCampaign.data.data && listCampaign === null) {
      setListCampaign(props.listCampaign.data.data);
    }
  }, [props.detailCampaign, props.listCampaign]);
  console.log('LIST_CAMPAIGN', listCampaign);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.detail}>
        <Text style={styles.text}>Detail Screen</Text>
        <Text style={styles.text}>{detailCampaign?.name}</Text>
        <Text style={styles.text}>
          {listCampaign !== null ? listCampaign[0]?.createdDate : null}
        </Text>
      </View>
    </ScrollView>
  );
};

const mapStateToProps = state => ({
  user: state.user.user,
  detailCampaign: state.campaign.detailCampaign,
  listCampaign: state.campaign.listCampaign,
});

const mapDispatchToProps = dispatch => ({
  fetchDetailCampaign: (id, token) => dispatch(detailCampaign(id, token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DetailScreen);

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

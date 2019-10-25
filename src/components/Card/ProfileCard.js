import React, { Component } from 'react';
import { Typography, Card } from '@material-ui/core';

import styles from './styles';

export default class ProfileCard extends Component {
  render() {
    const { num, candidate, vote } = this.props;
    
    const imageProfileStyle = candidate ? {backgroundImage: `url(${candidate.urlGambar})`} : null;

    return (
      <Card style={styles.profileCard}>
        <Typography style={styles.num} variant="h7">
          {num}
        </Typography>
        <div style={{...styles.imageProfile, ...imageProfileStyle}} />
        <Typography style={styles.name} variant="h7">
          {candidate.nama}
        </Typography>
        <Typography style={styles.pool} variant="h7">
          {vote}
        </Typography>
      </Card>
    )
  }
}

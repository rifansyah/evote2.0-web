import React, { Component } from 'react';
import { Typography, Container, Button, CircularProgress } from '@material-ui/core';
import { ProfileCard } from '../components/Card';
import firebase from '../config/firebase';

const styles = {
  container: {
    display: 'flex',
    minHeight: '85vh',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 16
  },
  profileContainer: {
    display: 'flex',
    height: '100%',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  calculationButton: {
    backgroundColor: '#007C84',
    color: 'white',
    borderRadius: 15,
    paddingLeft: 32,
    paddingRight: 32,
  },
  loading: {
    marginTop: 32,
    marginBottom: 32,
  }
}

const firebaseRef = firebase.database();
let interval;

export default class ShowCounterPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      candidates: [],
      vote: {},
      showVote: [
        0,0
      ],
      isAnimating: false,
      isInitiateState: true,
      isDataLoaded: false,
    };
  }

  componentDidMount() {
    this.getCandidatesData();
  }

  getCandidatesData = () => {
    const { year, type } = this.props.match.params;

    const queryType = type === 'presma' ? 'calonPresma' : 'calonDPM';

    firebaseRef.ref(year).child(queryType).once('value').then((snapshot) => {
      const newCandidates = [];
      snapshot.forEach(function(childSnapshot) {
        newCandidates.push(childSnapshot.val())
      });
      this.setState({
        candidates: newCandidates,
        isDataLoaded: true,
      })
    });

    firebaseRef.ref(year).child('vote').child(type).once('value').then((snapshot) => {
      const newVote = {}
      snapshot.forEach(function(childSnapshot) {
        const numb = parseInt(childSnapshot.val());
        if (newVote.hasOwnProperty(numb)) newVote[numb] += 1;
        else newVote[numb] = 1;
      });
      this.setState({
        vote: newVote,
      });
    })
  };

  getTotal = () => {
    const { vote } = this.state;
    let total = 0;
    for (var prop in vote) {
      if (vote.hasOwnProperty(prop)) {
        total += vote[prop];
      }
    }
    return total;
  }

  getVoteNumbForCandidate = (candidateNumb) => {
    const { vote } = this.state;
    return vote[candidateNumb] ? vote[candidateNumb] : 0;
  }

  getPercentageFormat = (numb, total) => {
    return numb + ` (${((numb / total) * 100).toFixed(2)}%)`;
  }

  getVoteNumbWithPercentage = (candidateNumb) => {
    const total = this.getTotal();
    const numb = this.getVoteNumbForCandidate(candidateNumb);
    
    return this.getPercentageFormat(numb, total);
  }

  getRandomNumber = (total) => {
    const randomNumb = Math.ceil((Math.random() * total));
    return this.getPercentageFormat(randomNumb, total);
  }

  showRandomNumber = () => {
    const { candidates } = this.state;
    
    interval = setInterval(() => {
      const newVote = {}
      
      for (let i = 0; i < candidates.length; i++) {
        newVote[i] = this.getRandomNumber(this.getTotal());
      }

      this.setState({
        showVote: newVote,
        isAnimating: true,
        isInitiateState: false,
      })
    }, 80);
  }

  getResult = (index) => {
    const { isAnimating, showVote, vote, isInitiateState } = this.state;

    if (isInitiateState) return this.getPercentageFormat(0, this.getTotal());

    return isAnimating ? showVote[index] : vote[index + 1] ? this.getPercentageFormat(vote[index + 1], this.getTotal()) : this.getPercentageFormat(0, this.getTotal());
  }

  stopRandomNumber = () => {
    clearInterval(interval);
  }

  buttonClicked = () => {
    const { isAnimating } = this.state;
    if (isAnimating) this.stopRandomNumber();
    else this.showRandomNumber();
    this.setState({
      isAnimating: !isAnimating,
    })
  }

  render() {
    const { type } = this.props.match.params;
    const { candidates, showVote, isDataLoaded, isAnimating, isInitiateState } = this.state;
    const title = type === 'presma' ? 'Capresma' : 'CaDPM' ;
    return (
      <Container style={styles.container}>
        <Typography variant="h7">
          { title }
        </Typography>
        {isDataLoaded ? null : <CircularProgress style={styles.loading} />}
        <div style={styles.profileContainer}>
          {candidates.map((candidate, index) => (
            <ProfileCard
              key={index}
              candidate={candidate}
              num={index + 1}
              voteRandom={showVote[index]}
              vote={this.getResult(index)}/>
          ))}
        </div>
        {((isInitiateState || isAnimating) && isDataLoaded) ? (
          <Button variant="contained" style={styles.calculationButton} onClick={() => this.buttonClicked()}>
            {isAnimating ? 'Tampilkan hasil final' : 'Hitung perolehan suara'}
          </Button>
        )
        : null
        }
      </Container>
    )
  }
}


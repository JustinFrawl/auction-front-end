import React from 'react';
import Bid from './Bid.js';
import { List } from 'semantic-ui-react'

const BidWindow = (props) => {

  const bidReload = props.refreshBid();



  const bidList = props.bids.map((bid) => {
    return(
      <Bid
        key={bid.id}
        bid={bid}
        currentUser={props.currentUser}
        users={props.users}
      />
    )
  })
  return (
    {bidReload},
    <List
      items={bidList}/>
  )
}

export default BidWindow;

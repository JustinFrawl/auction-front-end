import React from 'react';
import './App.css';
import AuctionSearchBar from './AuctionSearchBar.js';
import Auctions from './Auctions.js';
import {Route} from 'react-router-dom';

const AuctionList = (props) => {
  const auctionListItems = props.auctions.map((auction) => {
    return (
      // console.log(auction),
      // <Route
      //         path='/auctions/`${auction.id}`'
      //         render={props =>
      //         <Auctions {...props}
      //         onAuctionSelect={props.onAuctionSelect}
      //         key={auction.id}
      //         auction={auction}
      //         />}
      //       />

      <Auctions
        onAuctionSelect={props.onAuctionSelect}
        key={auction.id}
        auction={auction}
      />
    )
  });
  return (
    <div>
      <h4>
        <h2>Current Auctions</h2>

        {auctionListItems}
      </h4>
    </div>
  )
}

export default AuctionList;

// fetch("https://auction-back-end.herokuapp.com/api/v1/auctions", {
// 	    method: 'POST',
// 	    headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json'
// 	    },
// 	     body: JSON.stringify({
//          item: "https://www.gbposters.com/media/catalog/product/cache/1/image/737x938/17f82f742ffe127f42dca9de82fb58b1/d/a/david-bowie-ziggy-stardust-collector-print-1.23.jpg",
//          description: "Original Poster from the best performer of all time",
// 		 value: 6000,
// 		 bids: []
// 	  })
// 	})
// 	.then(function (data) {
// 	  console.log('Request success: ', data);
// 	})
// 	.catch(function (error) {
// 	  console.log('Request failure: ', error);
// 	});

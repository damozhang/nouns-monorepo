import { BigNumber } from '@ethersproject/bignumber';
import { useAppSelector } from '../hooks';
import { Bid, BidEvent } from '../utils/types';
import { Auction } from './nounsAuction';

const deserializeAuction = (reduxSafeAuction: Auction): Auction => {
  return {
    amount: BigNumber.from(reduxSafeAuction.amount),
    bidder: reduxSafeAuction.bidder,
    startTime: BigNumber.from(reduxSafeAuction.startTime),
    endTime: BigNumber.from(reduxSafeAuction.endTime),
    nounId: BigNumber.from(reduxSafeAuction.nounId),
    settled: false,
  };
};

const deserializeBid = (reduxSafeBid: BidEvent): Bid => {
  return {
    nounId: BigNumber.from(reduxSafeBid.nounId),
    sender: reduxSafeBid.sender,
    value: BigNumber.from(reduxSafeBid.value),
    extended: reduxSafeBid.extended,
    transactionHash: reduxSafeBid.transactionHash,
    timestamp: BigNumber.from(reduxSafeBid.timestamp),
  };
};

const useOnDisplayAuction = (): Auction | undefined => {
  const lastAuctionNounId = useAppSelector(state => state.auction.activeAuction?.nounId);
  const onDisplayAuctionNounId = useAppSelector(
    state => state.onDisplayAuction.onDisplayAuctionNounId,
  );
  const currentAuction = useAppSelector(state => state.auction.activeAuction);
  const pastAuctions = useAppSelector(state => state.pastAuctions.pastAuctions);

  if (!onDisplayAuctionNounId || !lastAuctionNounId || !currentAuction || !pastAuctions)
    return undefined;

  if (BigNumber.from(onDisplayAuctionNounId).eq(lastAuctionNounId)) {
    return deserializeAuction(currentAuction);
  } else {
    const reduxSafeAuction: Auction | undefined = pastAuctions.find(auction => {
      const nounId = auction.activeAuction && BigNumber.from(auction.activeAuction.nounId);
      return nounId && nounId.toNumber() === onDisplayAuctionNounId;
    })?.activeAuction;

    return reduxSafeAuction ? deserializeAuction(reduxSafeAuction) : undefined;
  }
};

export const useAuctionBids = (auctionNounId: BigNumber): Bid[] | undefined => {
  const lastAuctionNounId = useAppSelector(state => state.onDisplayAuction.lastAuctionNounId);
  const lastAuctionBids = useAppSelector(state => state.auction.bids);

  if (lastAuctionNounId === auctionNounId.toNumber()) {
    return lastAuctionBids
      .map(bid => deserializeBid(bid))
      .sort((a: Bid, b: Bid) => {
        return b.timestamp.toNumber() - a.timestamp.toNumber();
      });
  }
};

export default useOnDisplayAuction;
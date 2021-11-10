import { BigNumber } from 'ethers';
import classes from './AuctionActivityNounTitle.module.css';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
const AuctionActivityNounTitle: React.FC<{ nounId: BigNumber, startTime: BigNumber }> = props => {
  const { startTime } = props;
  // const nounIdContent = `Today ${nounId.toString()}`;
  const auctionStartTimeUTC = dayjs(startTime.toNumber() * 1000)
    .utc()
    .format('MMDD');
  const nounIdContent = `DAY ${auctionStartTimeUTC}`;
  return (
    <div className={classes.wrapper}>
      <h1>{nounIdContent}</h1>
    </div>
  );
};
export default AuctionActivityNounTitle;

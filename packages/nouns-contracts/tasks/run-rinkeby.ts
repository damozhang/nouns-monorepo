import { TASK_COMPILE } from 'hardhat/builtin-tasks/task-names';
import { task } from 'hardhat/config';

task(
  'run-rinkeby',
  'Start a hardhat node with test net, deploy contracts, and execute setup transactions',
).setAction(async (_, { ethers, run }) => {
  await run(TASK_COMPILE);
  const contracts = await run('deploy-rinkeby --auctionDuration 10');

  await run('populate-descriptor', {
    nftDescriptor: contracts.NFTDescriptor.instance.address,
    nounsDescriptor: contracts.NounsDescriptor.instance.address,
  });

  await contracts.NounsAuctionHouse.instance
    .attach(contracts.NounsAuctionHouseProxy.instance.address)
    .unpause({
      gasLimit: 1_000_000,
    });

  await run('create-proposal', {
    nounsDaoProxy: contracts.NounsDAOProxy.instance.address,
  });

  const { chainId } = await ethers.provider.getNetwork();

  console.log(`Noun contracts deployed to Rinkeby (Chain ID: ${chainId})`);
  console.log(`Auction House Proxy address: ${contracts.NounsAuctionHouseProxy.instance.address}`);
  console.log(`Nouns ERC721 address: ${contracts.NounsToken.instance.address}`);
  console.log(`Nouns DAO Executor address: ${contracts.NounsDAOExecutor.instance.address}`);
  console.log(`Nouns DAO Proxy address: ${contracts.NounsDAOProxy.instance.address}`);

  await new Promise(() => {
    /* keep node alive until this process is killed */
  });
});
module.exports = {};

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Vault {

    IERC20 public apeCoin;
    address public donationAddress;
    address[] public apeNftHolders;
    mapping(address => uint256) public scores;

    event DistributedRewards(address[] winners, uint256 rewardAmount);
    event DistributedAirdrop(address[] recipients, uint256 airdropAmount);
    event DonationSent(address recipient, uint256 amount);

    constructor(address _apeCoinAddress, address _donationAddress) {
        apeCoin = IERC20(_apeCoinAddress);
        donationAddress = _donationAddress;
    }

    function distributeRewards(address[] memory winners) external {
        uint256 balance = apeCoin.balanceOf(address(this));
        uint256 rewardAmount = (balance * 60) / 100;
        uint256 rewardPerWinner = rewardAmount / winners.length;

        for (uint256 i = 0; i < winners.length; i++) {
            apeCoin.transfer(winners[i], rewardPerWinner);
        }

        emit DistributedRewards(winners, rewardAmount);
    }

    function airdropToNftHolders() external  {
        uint256 balance = apeCoin.balanceOf(address(this));
        uint256 airdropAmount = (balance * 20) / 100;
        uint256 airdropPerHolder = airdropAmount / apeNftHolders.length;

        for (uint256 i = 0; i < apeNftHolders.length; i++) {
            apeCoin.transfer(apeNftHolders[i], airdropPerHolder);
        }

        emit DistributedAirdrop(apeNftHolders, airdropAmount);
    }

    function donate() external {
        uint256 balance = apeCoin.balanceOf(address(this));
        uint256 donationAmount = (balance * 20) / 100;

        apeCoin.transfer(donationAddress, donationAmount);
        emit DonationSent(donationAddress, donationAmount);
    }

    function updateNftHolders(address[] calldata _apeNftHolders) external  {
        apeNftHolders = _apeNftHolders;
    }
    function getBalance() public view returns (uint256) {
        return apeCoin.balanceOf(address(this));
    }
    
    function getScore(address user) public view returns (uint256) {
        return scores[user];
    }

    function getNftHolderAt(uint256 index) public view returns (address) {
        require(index < apeNftHolders.length, "Index out of bounds");
        return apeNftHolders[index];
    }
    
    function getNftHoldersCount() public view returns (uint256) {
        return apeNftHolders.length;
    }

}

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract MainVault {
    IERC20 public apeCoin;

    // Events
    event RewardsDistributed(uint256 totalReward, uint256 rewardPerWinner); // Event for when rewards are distributed
    event RewardTransferred(address indexed winner, uint256 amount); // Event for when a reward is transferred to a winner

    // It initializes the apeCoin state variable with the address of the apeCoin token contract.
    constructor(address _apeCoin) {
        apeCoin = IERC20(_apeCoin);
    }

    // Function to distribute rewards among a list of winners.
    function distributeRewards(address[] memory winners) external {
        uint256 totalReward = apeCoin.balanceOf(address(this)); // Gets the total reward amount held by the contract
        uint256 rewardPerWinner = totalReward / winners.length; // Calculates the reward amount per winner

        emit RewardsDistributed(totalReward, rewardPerWinner); // Triggers the RewardsDistributed event

        // Loop to iterate through each winner and transfer the reward amount to them.
        for (uint256 i = 0; i < winners.length; i++) {
            apeCoin.transfer(winners[i], rewardPerWinner); // Transfers the reward amount to the winner
            emit RewardTransferred(winners[i], rewardPerWinner); // Triggers the RewardTransferred event for each transfer
        }
    }

    // View function to get the total rewards available in the contract.
    function getTotalReward() public view returns (uint256) {
        return apeCoin.balanceOf(address(this));
    }

    // View function to get the reward amount per winner based on the current total reward and number of winners.
    function getRewardPerWinner(
        uint256 winnerCount
    ) public view returns (uint256) {
        require(winnerCount > 0, "Winner count must be greater than 0");
        uint256 totalReward = apeCoin.balanceOf(address(this));
        return totalReward / winnerCount;
    }

    // View function to get the contract's token balance for a specific address.
    function getTokenBalance(address account) public view returns (uint256) {
        return apeCoin.balanceOf(account);
    }
}

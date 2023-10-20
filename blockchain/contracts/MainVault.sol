// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";


contract GameVault {
    IERC20 public apeCoin;

    
    constructor(address _apeCoin) {
        apeCoin = IERC20(_apeCoin);
    }

    function distributeRewards(address[] memory winners) external {
        uint256 totalReward = apeCoin.balanceOf(address(this));
        uint256 rewardPerWinner = totalReward / winners.length;

        for (uint256 i = 0; i < winners.length; i++) {
            apeCoin.transfer(winners[i], rewardPerWinner);
        }
    }
}

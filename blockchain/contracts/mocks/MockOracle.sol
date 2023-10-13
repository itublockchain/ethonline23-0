// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

contract MockOracle {
    function getTokenValueOfEth(
        uint256 ethOutput
    ) external pure returns (uint256 tokenInput) {
        // 1 eth = 1471 APE
        return ethOutput * 1471;
    }
}

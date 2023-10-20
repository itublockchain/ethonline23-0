// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ApeERC20 is ERC20 {
    string token_name = "ApeCoin";
    string token_symbol = "APE";
    constructor() ERC20(token_name, token_symbol) {}

    function mint(address to, uint256 amount) external {
        _mint(to, amount);
    }
}

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MockBAYC is ERC721 {
    constructor() ERC721("Bored Ape Yacht Club", "BAYC") {}

    function mint(address to, uint256 tokenId) external {
        _mint(to, tokenId);
    }
}
//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@chainlink/contracts/src/v0.8/automation/AutomationCompatible.sol";

contract NFTLending is AutomationCompatibleInterface {
    
    uint256 public immutable interval;
    address public contractAddress;
    IERC721 public nftContract;
    uint256[] public tokenIds;
    mapping (uint256 _tokenId => mapping (address _borrower => uint256 endTime)) lendings;
    mapping (uint256 _tokenId => bool _borrowable) isBorrowable;

    constructor(address _contractAddress, uint256 _interval) {
        interval = _interval;
        contractAddress = _contractAddress;
        nftContract = IERC721(_contractAddress);
    }

    function changeIsBorrowable(uint256 _tokenId) public {
        require(nftContract.ownerOf(_tokenId) == msg.sender, "You are not the owner of this NFT");
        isBorrowable[_tokenId] = !isBorrowable[_tokenId];
    }

    // TODO: NFT should be send to this contract.
    // contract should GET Request to the API via chainlink api functions.
    // API gives person to play rights.
    // then keeper should call liq function.
    // liq function should take the games rights via API.
    // then the renting advert should be reposted.
    function borrowNFT(uint256 _tokenId, uint256 _days) external {
        require(isBorrowable[_tokenId], "This NFT is not borrowable");
        require(lendings[_tokenId][msg.sender] - block.timestamp <= 0, "You have already borrowed this NFT");
        require(_days * 86400 > 1 days, "You must borrow for at least 1 days");
        tokenIds.push(_tokenId);
        lendings[_tokenId][msg.sender] = block.timestamp + _days * 86400;
        nftContract.transferFrom(nftContract.ownerOf(_tokenId), msg.sender, _tokenId);
    }

    function isLended(address _borrower, uint256 _tokenId) external view returns (bool) {
        return lendings[_tokenId][_borrower] - block.timestamp > 0;
    }

    function remainingLendTime(uint256 _tokenId) public view returns (uint256) {
        return lendings[_tokenId][msg.sender] - block.timestamp;
    }

    function performUpkeep(bytes calldata /* performData */) external override {
        for (uint256 i = 0; i < tokenIds.length; i++) {
            uint256 tokenId = tokenIds[i];
            if (lendings[tokenId][msg.sender] - block.timestamp <= 0) {
                delete tokenIds[i];
            }
        }
    }

    function checkUpkeep(bytes calldata checkData) external view returns (bool upkeepNeeded, bytes memory performData) {
        upkeepNeeded = false;

        for (uint256 i = 0; i < tokenIds.length; i++) {
            uint256 tokenId = tokenIds[i];
            if (lendings[tokenId][msg.sender] - block.timestamp <= 0) {
                upkeepNeeded = true;
                break;
            }
        }
        performData = checkData;
        return (upkeepNeeded, performData);
    }
}
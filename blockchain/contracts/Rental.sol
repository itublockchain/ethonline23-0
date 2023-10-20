// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract RentalContract {
    IERC721 public bayc;
    IERC20 public apeCoin;
    address public vaultAddress;

    struct Rental {
        address owner;
        address renter;
        uint256 price;
        uint256 endTime;
    }

    mapping(uint256 => Rental) public rentals;

    constructor(address _bayc, address _apeCoin, address _vaultAddress) {
        bayc = IERC721(_bayc);
        apeCoin = IERC20(_apeCoin);
        vaultAddress = _vaultAddress;
    }

    function listForRent(
        uint256 tokenId,
        uint256 price,
        uint256 duration
    ) external {
        require(bayc.ownerOf(tokenId) == msg.sender, "Not owner");
        rentals[tokenId] = Rental({
            owner: msg.sender,
            renter: address(0),
            price: price,
            endTime: block.timestamp + duration
        });
    }

    function rent(uint256 tokenId) external {
        Rental storage rental = rentals[tokenId];
        require(rental.owner != address(0), "Not listed");
        require(rental.renter == address(0), "Already rented");
        require(
            apeCoin.transferFrom(msg.sender, rental.owner, rental.price / 2),
            "Payment failed"
        );
        // Transfer other half to game vault
        require(
            apeCoin.transferFrom(msg.sender, vaultAddress, rental.price / 2),
            "Payment to vault failed"
        );
        rental.renter = msg.sender;
    }

    function endRental(uint256 tokenId) external {
        Rental storage rental = rentals[tokenId];
        require(block.timestamp >= rental.endTime, "Rental period not ended yet");
        rental.renter = address(0);
    }
}

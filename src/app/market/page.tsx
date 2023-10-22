"use client"
import { ethers } from 'ethers';
import { clientConfig } from '@/config';
require('dotenv').config();

import React, { useState } from 'react';
import "../style.css"

const contractInfoMockBAYC: ContractInfo = require('../../constants/MockBAYC-contractInfo.json');

interface ContractInfo {
	0: string;
	1: any[];
}

const provider = new ethers.providers.JsonRpcProvider(
	'https://ethereum-goerli.publicnode.com'
);
const mainAccount = new ethers.Wallet(
	clientConfig.ERC20_SENDER_PRIVATE_KEY,
	provider
);

const CONTRACT_ADDRESS_MockBAYC = contractInfoMockBAYC[0];
const CONTRACT_ABI_MockBAYC = contractInfoMockBAYC[1];

const mockBAYCContract = new ethers.Contract(
	CONTRACT_ADDRESS_MockBAYC,
	CONTRACT_ABI_MockBAYC,
	mainAccount
);

async function mintMockBAYC(toAddress: string, amount: number): Promise<void> {
	const amountToMint = amount;
	const transactionResponse = await mockBAYCContract.mint(
		toAddress,
		amountToMint
	);
	await transactionResponse.wait();
}


interface NFTProps {
    image: string;
    name: string;
    rented: boolean;
}
// NFT COMPONENT
const NFT: React.FC<NFTProps> = ({ image, name, rented }) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    return (
        <>
            <div className={`nft ${rented ? 'rented' : ''}`} onClick={() => setIsPopupOpen(true)}>
                <img src={image} alt={name} />
                {rented && <div className="rented-label">RENTED</div>}
            </div>
            {isPopupOpen && (
                <div className="popup open" onClick={() => setIsPopupOpen(false)}>
                    <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                        <div className="close-button" onClick={() => setIsPopupOpen(false)}></div>  {/* Close button */}
                        <img src={image} alt={name} className="popup-image" />
                        <div className="popup-details">
                            <h2>{name}</h2>
                            <button>Rent for 10 APE</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

// Ana sayfa bileşeni
const Marketplace: React.FC = () => {

	let tokenId =4
	const handleMint = async () => {
        const toAddress = mainAccount.address;
        try {
            await mintMockBAYC(toAddress, tokenId);
            console.log('Minting successful.');
			tokenId++;
        } catch (error) {
            console.error('Minting unsuccessful:', error);
        }
    }



    // Resim URL'lerini içeren bir dizi
    const imageUrls = [
        "https://ipfs.io/ipfs/QmcJYkCKK7QPmYWjp4FD2e3Lv5WCGFuHNUByvGKBaytif4",
        "https://ipfs.io/ipfs/QmXEqPbvM4aq1SQSXN8DSuEcSo5SseYW1izYQbsGB8yn9x",
		"https://ipfs.io/ipfs/QmPQdVU1riwzijhCs1Lk6CHmDo4LpmwPPLuDauY3i8gSzL",
		"https://ipfs.io/ipfs/QmadJd1GgsSgXn7RtrcL8FePionDyf4eQEsREcvdqh6eQe",
		"https://ipfs.io/ipfs/QmczjnjjYDfydfKQmAiUAu17cZ8rTCjrPe47Zdu7tEppGd",
		"https://ipfs.io/ipfs/QmXzHn4rnSBdjMpwB3Psty49BbNon6AixUm5DhifxjPRv3",
		"https://ipfs.io/ipfs/QmcgoedsGRM4tzEZnSQX3RQ2SWTggATqUKQq1gfhhkzpfs",
		"https://ipfs.io/ipfs/QmeiURZgvKcjw9JLir9i94jAocrjdhFbZ2t9Zp6tR9c8iN",
		"https://ipfs.io/ipfs/QmV4SfebQigHJAfDwrpyPKaGsZwSBvC9tqvdnbAW8Sd8zT",
		"https://ipfs.io/ipfs/QmTD53cMB8TXFUTnZCBD4Fichp857AArUFt8BXCZwdXtv5",
		"https://ipfs.io/ipfs/QmcXXGsR2YCiM8G77hAnYSaTiWUohBSUsByRYsX7FWcURx",
		"https://ipfs.io/ipfs/QmcLtC8ZEX5HvB6nCEPqFHCta9fQjpcqj5c7QRo41E9Xwb",
		"https://ipfs.io/ipfs/QmaqC65aSD9Hffp4EGMnB1JiPBeCERBVUewNFMMVKYgc2A",
		"https://ipfs.io/ipfs/QmYoi2fG1Y3Nwt7PrDFNjZBpgbiE3aLaend3X66Ji7N7Eb",
		"https://ipfs.io/ipfs/QmWCRE6NZDfXcwwHJtduQ6Mf4jsdKjnNZgT37DpHgEzyeS",
		"https://ipfs.io/ipfs/QmXcLJTFGZAZpta84zXqGFao1HMbFdoMntKT5MRrLnZt91",

    ];




    // nfts dizisini oluştur
    const nfts = imageUrls.map((imageUrl, index) => ({
        image: imageUrl,
        name: 'BORED APE',
        rented: false,
    }));

    return (
        <div className="marketplace bg-[#2A7E68]">
            <h1>MARKETPLACE</h1>
            <button onClick={handleMint}>Mint Mock BAYC</button>  {/* Mint butonu */}
            <div className="nft-grid">
                {nfts.map((nft, index) => (
                    <NFT key={index} {...nft} />
                ))}
            </div>
        </div>
    );
};

export default Marketplace;
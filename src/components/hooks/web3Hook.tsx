import { useState } from "react"
import { Web3AuthModalPack, Web3AuthEventListener } from "@safe-global/auth-kit"
import { OpenloginAdapter } from "@web3auth/openlogin-adapter"
import { Web3AuthOptions } from "@web3auth/modal"
import {ADAPTER_EVENTS, CHAIN_NAMESPACES, WALLET_ADAPTERS} from "@web3auth/base"


const useWeb3 = async () => {
    const [web3AuthModalPack, setWeb3AuthModalPack] = useState<Web3AuthModalPack>()
    const connectedHandler: Web3AuthEventListener = (data) =>
        console.log("CONNECTED", data)
    const disconnectedHandler: Web3AuthEventListener = (data) =>
        console.log("DISCONNECTED", data)
    if (!web3AuthModalPack) {return}
        const options: Web3AuthOptions = {
            clientId:
                "BMVbCJGKTNafy5v4B8zf6W87bLvV53uP4ZAF5b7u1eKjBJ9hO8tjCrec2PsI5bwPpqqG0_gI6ZtMl1s624Dvo5s",
            web3AuthNetwork: "testnet",
            chainConfig: {
                chainNamespace: CHAIN_NAMESPACES.EIP155,
                chainId: "0x5",
                rpcTarget: "https://rpc.ankr.com/eth_goerli",
            },
            uiConfig: {
                theme: "dark",
                loginMethodsOrder: ["google", "facebook"],
            },
        }
        const modalConfig = {
            [WALLET_ADAPTERS.METAMASK]: {
                label: "metamask",
                showOnDesktop: true,
                showOnMobile: false,
            },
        }
        const openloginAdapter = new OpenloginAdapter({
            loginSettings: {
                mfaLevel: "mandatory",
            },
            adapterSettings: {
                uxMode: "popup",
                whiteLabel: {
                    name: "Safe",
                },
            },
        })
        const newweb3AuthModalPack = new Web3AuthModalPack({
            txServiceUrl: "https://safe-transaction-goerli.safe.global",
        })
        await newweb3AuthModalPack.init({
            options,
            adapters: [openloginAdapter],
            modalConfig,
        })
        newweb3AuthModalPack.subscribe(ADAPTER_EVENTS.CONNECTED, connectedHandler)
        newweb3AuthModalPack.subscribe(
            ADAPTER_EVENTS.DISCONNECTED,
            disconnectedHandler
        )
        setWeb3AuthModalPack(newweb3AuthModalPack)
        return () => {
            web3AuthModalPack.unsubscribe(
                ADAPTER_EVENTS.CONNECTED,
                connectedHandler
            ),
            web3AuthModalPack.unsubscribe(
                ADAPTER_EVENTS.DISCONNECTED,
                disconnectedHandler
            ),
            web3AuthModalPack
        };
    }
export default useWeb3
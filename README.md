# Whatllet

<h4 align="center">
  <a href="https://www.notion.so/d9j9v/Whatllet-c241c9b2e33148fba6760fbe5177b004?pvs=4">Documentation</a> |
  <a href="https://whatllet.vercel.app/">Website</a>
</h4>

| CHAIN | World ID Router | SC DEPLOY |
| --- | --- | --- |
| Base Goerli | https://goerli.basescan.org/address/0x78ec127a3716d447f4575e9c834d452e397ee9e1#code | 0xE3f974D6AC1F1052F00e02E71235A718629CE10a |
| Stylus | API |  |
| Polygon Mumbai | https://mumbai.polygonscan.com/address/0x719683F13Eeea7D84fCBa5d7d17Bf82e03E3d260#code | 0x03C7523797c3fe25d214C571aA15a531079b14Ed |
| Gnosis | API |  |
| Filecoin FEVM | API |  |
| Scroll | API | 0xE3f974D6AC1F1052F00e02E71235A718629CE10a |
| Axiom | API |  |
| Celo | API |  |
| Linea | API |  |
| Neon | API | 0xE3f974D6AC1F1052F00e02E71235A718629CE10a |
| Mantle | API |  |
| XDC | API |  |
| Optimism Goerli
Bounty? | https://goerli-optimism.etherscan.io/address/0x515f06B36E6D3b707eAecBdeD18d8B384944c87f#code |  |
| Ethereum Goerli 
Bounty? | https://goerli.etherscan.io/address/0x11cA3127182f7583EfC416a8771BD4d11Fae4334#code |  |

🧪 An open-source, up-to-date toolkit for building decentralized applications (dapps) on the Ethereum blockchain. It's designed to make it easier for developers to create and deploy smart contracts and build user interfaces that interact with those contracts.

⚙️ Built using NextJS, RainbowKit, Hardhat, Wagmi, and Typescript.

- ✅ **Contract Hot Reload**: Your frontend auto-adapts to your smart contract as you edit it.
- 🔥 **Burner Wallet & Local Faucet**: Quickly test your application with a burner wallet and local faucet.
- 🔐 **Integration with Wallet Providers**: Connect to different wallet providers and interact with the Ethereum network.

![Debug Contracts tab](https://github.com/scaffold-eth/scaffold-eth-2/assets/55535804/1171422a-0ce4-4203-bcd4-d2d1941d198b)

## Requirements

Before you begin, you need to install the following tools:

- [Node (v18 LTS)](https://nodejs.org/en/download/)
- Yarn ([v1](https://classic.yarnpkg.com/en/docs/install/) or [v2+](https://yarnpkg.com/getting-started/install))
- [Git](https://git-scm.com/downloads)

## Quickstart

To get started with Scaffold-ETH 2, follow the steps below:

1. Clone this repo & install dependencies

```
git clone https://github.com/scaffold-eth/scaffold-eth-2.git
cd scaffold-eth-2
yarn install
```

2. Run a local network in the first terminal:

```
yarn chain
```

This command starts a local Ethereum network using Hardhat. The network runs on your local machine and can be used for testing and development. You can customize the network configuration in `hardhat.config.ts`.

3. On a second terminal, deploy the test contract:

```
yarn deploy
```

This command deploys a test smart contract to the local network. The contract is located in `packages/hardhat/contracts` and can be modified to suit your needs. The `yarn deploy` command uses the deploy script located in `packages/hardhat/deploy` to deploy the contract to the network. You can also customize the deploy script.

4. On a third terminal, start your NextJS app:

```
yarn start
```

Visit your app on: `http://localhost:3000`. You can interact with your smart contract using the contract component or the example ui in the frontend. You can tweak the app config in `packages/nextjs/scaffold.config.ts`.

Run smart contract test with `yarn hardhat:test`

- Edit your smart contract `YourContract.sol` in `packages/hardhat/contracts`
- Edit your frontend in `packages/nextjs/pages`
- Edit your deployment scripts in `packages/hardhat/deploy`

## Documentation

Visit our [docs](https://docs.scaffoldeth.io) to learn how to start building with Scaffold-ETH 2.

To know more about its features, check out our [website](https://scaffoldeth.io).

## Contributing to Scaffold-ETH 2

We welcome contributions to Scaffold-ETH 2!

Please see [CONTRIBUTING.MD](https://github.com/scaffold-eth/scaffold-eth-2/blob/main/CONTRIBUTING.md) for more information and guidelines for contributing to Scaffold-ETH 2.

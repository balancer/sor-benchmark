export const config = {
    // 1: {
    //     rpc: `https://rpc.tenderly.co/fork/f54c8f20-7076-49c6-b0b7-5589cfe06a37`,
    //     rpcLogs: `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`,
    //     subgraph: "https://balancer-v2.stellate.balancer.fi/",
    // },
    10: {
        rpc: `https://rpc.tenderly.co/fork/e3a009f1-c286-4c59-8f6c-ab9ff93d83f1`,
        rpcLogs: `https://optimism-mainnet.infura.io/v3/${process.env.INFURA_KEY}`,
        subgraph: "https://api.thegraph.com/subgraphs/name/beethovenxfi/beethovenx-optimism",
    },
    // 100: {
    //     rpc: `https://rpc.tenderly.co/fork/19c78f9e-a207-4bf4-bfbe-3b39046789ff`,
    //     subgraph: "https://balancer-gnosis-chain-v2.stellate.balancer.fi",
    // },
    // 137: {
    //     rpc: 'https://rpc.tenderly.co/fork/16150d09-0e46-4d15-af4d-de91cb5d88df',
    //     subgraph: "https://balancer-polygon-v2.stellate.balancer.fi",
    // },
    // 250: {
    //     rpc: 'https://rpc.tenderly.co/fork/ea22ba0b-797a-485d-b971-a6f48074f174',
    //     subgraph: "https://api.thegraph.com/subgraphs/name/beethovenxfi/beethovenx-v2-fantom",
    // },
    // // 1101: {
    // //     rpc: `https://rpc.ankr.com/polygon_zkevm/${process.env.ANKR_KEY}`,
    // //     subgraph: "https://api.studio.thegraph.com/query/24660/balancer-polygon-zk-v2/version/latest",
    // // },
    // 8453: {
    //     rpc: 'https://rpc.tenderly.co/fork/ee312746-7ea4-4bdb-94bf-b90d3d227a8a',
    //     subgraph: "https://api.studio.thegraph.com/query/24660/balancer-base-v2/version/latest",
    // },
    // 42161: {
    //     rpc: 'https://rpc.tenderly.co/fork/a32523d6-e8a0-4625-94ab-07b754ebb0b9',
    //     subgraph: "https://balancer-arbitrum-v2.stellate.balancer.fi",
    // },
    // 43114: {
    //     rpc: 'https://rpc.tenderly.co/fork/afb634fb-4315-459a-9d79-b6cdd5a1d1df',
    //     subgraph: "https://api.thegraph.com/subgraphs/name/balancer-labs/balancer-avalanche-v2",
    // },
}

export type Chains = keyof typeof config

export const tokenIn = {
    1: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
    // 10: '0x4200000000000000000000000000000000000006',
    10: '0x9bcef72be871e61ed4fbbc7630889bee758eb81d', // rETH
    100: '0x6a023ccd1ff6f2045c3309768ead9e68f978f6e1',
    137: '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270', // WMATIC
    250: '0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83', // wftm
    1101: '0x4f9a0e7fd2bf6067db6994cf12e4495df938e6e9',
    8453: '0x4200000000000000000000000000000000000006',
    42161: '0x82af49447d8a07e3bd95bd0d56f35241523fbab1',
    43114: '0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7' // wawax
}

export const tokenOut = {
    1: '0xba100000625a3754423978a60c9317c58a424e3d', // bal
    10: '0x1f32b1c2345538c0c6f582fcb022739c4a194ebb', // wstETH
    100: '0x6c76971f98945ae98dd7d4dfca8711ebea946ea6', // wstETH
    137: '0x3a58a54c066fdc0f2d55fc9c89f0415c92ebf3c4', // stMATIC
    250: '0xf24bcf4d1e507740041c9cfd2dddb29585adce1e', // beets
    1101: '0x5d8cff95d7a57c0bf50b30b43c7cc0d52825d4a9', // wsteth
    8453: '0x2ae3f1ec7f1f5012cfeab0185bfc7aa3cf0dec22', // cbeth
    42161: '0xec70dcb4a1efa46b8f2d97c310c9c4790ba5ffa8', // reth
    43114: '0x2b2c81e08f1af8835a78bb2a90ae924ace0ea4be' // sawax
}

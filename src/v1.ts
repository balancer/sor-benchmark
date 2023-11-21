import { config } from "./config";
import { BalancerSDK } from "@balancer-labs/sdk";

export const initV1 = async (chainId: keyof typeof config, blockNumber: number) => {
    // Instantiate SOR
    const sdk = new BalancerSDK({
        network: chainId,
        rpcUrl: config[chainId].rpc,
    })
    const sor = sdk.sor;

    await sor.fetchPools({
        orderBy: 'totalLiquidity',
        orderDirection: 'desc',
        where: {
            swapEnabled: {
                eq: true,
            },
            totalShares: {
                gt: 0.000000000001,
            },
        },
        block: {
            number: blockNumber,
        },
    });

    return sor;
}

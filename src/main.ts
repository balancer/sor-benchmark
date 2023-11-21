import { config, Chains } from "./config";
import { createViemClient, fp } from "./utils";
import { initV1 } from "./v1";
import { Token } from '@balancer/sdk';
import { getV2Payload, initV2, getERC20Info } from "./v2";
import { getSwaps } from "./get_swaps";

type PromiseType<T> = T extends Promise<infer U> ? U : never;

const main = async () => {
    for(const chainId of Object.keys(config).map(Number) as Chains[]) {
        const client = createViemClient(chainId)
        const blockNumber = await client.getBlockNumber();
    
        console.time(`V1 on ${chainId} at block ${blockNumber}`);
        let sorV1: PromiseType<ReturnType<typeof initV1>> | null = null;
        let sorV2: PromiseType<ReturnType<typeof initV2>> | null = null;
        try {
            sorV1 = await initV1(chainId, Number(blockNumber));
        } catch (err) {
            console.error('V1', chainId, err.message);
        }
        console.timeEnd(`V1 on ${chainId} at block ${blockNumber}`);
    
        console.time(`V2 on ${chainId} at block ${blockNumber}`);
        try {
            sorV2 = await initV2(chainId, blockNumber)
        } catch (err) {
            console.error('V2', chainId, err.message);
        }
        console.timeEnd(`V2 on ${chainId} at block ${blockNumber}`);

        const swaps = await getSwaps(chainId, blockNumber);

        console.log(['chainId', 'tokenIn', 'tokenOut', 'amount', 'v1Amount', 'v2Amount', 'diff', 'perf'].join(','));
        for(const { tokenIn, tokenOut, amount } of swaps) {
            const tokenOutDetails = await getERC20Info(client, tokenOut);
            // V1
            let v1Amount = 0;
            if (sorV1) {
                try {
                    const pathV1 = await sorV1.getSwaps(tokenIn, tokenOut, 0, amount);
                    v1Amount = fp(BigInt(String(pathV1.returnAmountFromSwaps)), tokenOutDetails.decimals);
                } catch (err) {
                    console.error('V1', chainId, err.message);
                }
            }
        
            // V2
            let v2Amount = 0;
            if (sorV2) {
                try {
                    const payload = await getV2Payload(tokenIn, tokenOut, amount, chainId, client) as [Token, Token, number, string];
                    const pathV2 = await sorV2.getSwaps(...payload);
                    if (pathV2)
                        v2Amount = fp(pathV2.outputAmount.amount, tokenOutDetails.decimals);
                } catch (err) {
                    console.error('V2', chainId, err.message);
                }
            }

            const diff = v2Amount - v1Amount;
            const perf = diff / Math.max(v1Amount, v2Amount);

            console.log([chainId, tokenIn, tokenOut, amount, v1Amount, v2Amount, diff, perf].join(','));
        }
    }
}

main().then(() => {
    console.log('done');
}).catch((err) => {
    console.error(err);
});

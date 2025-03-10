import { appConfig } from "@delvtech/hyperdrive-appconfig";
import { ReadHyperdrive } from "@delvtech/hyperdrive-viem";
import { useQuery } from "@tanstack/react-query";
import { getReadHyperdrive } from "src/sdk/getReadHyperdrive";
import { Address } from "viem";
import { usePublicClient } from "wagmi";

export function useReadHyperdrive({
  chainId,
  address,
}: {
  chainId: number;
  address: Address | undefined;
}): ReadHyperdrive | undefined {
  const publicClient = usePublicClient({ chainId });

  const enabled = !!address && !!publicClient;

  const { data } = useQuery({
    queryKey: [
      "getReadHyperdrive",
      {
        chainId,
        address,
      },
    ],
    enabled,
    queryFn: enabled
      ? () =>
          getReadHyperdrive({
            hyperdriveAddress: address,
            publicClient,
            appConfig,
          })
      : undefined,
  });

  return data;
}

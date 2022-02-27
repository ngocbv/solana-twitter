import { computed } from 'vue'
import { useAnchorWallet } from 'solana-wallets-vue'
import { Connection, PublicKey } from '@solana/web3.js'
import { Provider, Program } from '@project-serum/anchor'
import idl from '@/idl/solana_twitter.json'

const preflightCommitment = 'processed'
const commitment = 'processed'

const programID = new PublicKey(idl.metadata.address)
const clusterUrl = process.env.VUE_APP_CLUSTER_URL

let workspace = null

export const useWorkspace = () => workspace

export const initWorkspace = () => {
  const wallet = useAnchorWallet()
  console.log("clusterUrl", clusterUrl)
  const connection = new Connection(clusterUrl, commitment)
  const provider = computed(() => new Provider(connection, wallet.value, { preflightCommitment, commitment }))
  const program = computed(() => new Program(idl, programID, provider.value))

  workspace = {
    wallet,
    connection,
    provider,
    program,
  }
  console.log(workspace)
  workspace
}

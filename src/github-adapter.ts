import type { ExecutionProposal } from './executor.js'

export interface GitHubMutationPort {
  createBranch(repository:string, branch:string, baseBranch:string):Promise<void>
  createFile(repository:string, branch:string, path:string, content:string, message:string):Promise<void>
  openDraftPullRequest(repository:string, head:string, base:string, title:string, body:string):Promise<{url:string;number:number}>
}

export async function executeProposal(proposal:ExecutionProposal, github:GitHubMutationPort) {
  if(!proposal.draft || proposal.mergeAllowed) throw new Error('Unsafe proposal: draft-only, no-self-merge policy violated')
  if(proposal.branch===proposal.baseBranch) throw new Error('Unsafe proposal: remediation branch must differ from base branch')
  await github.createBranch(proposal.repository,proposal.branch,proposal.baseBranch)
  for(const patch of proposal.patches) await github.createFile(proposal.repository,proposal.branch,patch.path,patch.content,'fix: apply RepoGuardian remediation for '+patch.controlId)
  const lines=['## RepoGuardian remediation','','Automated, deterministic remediation proposal. Human review is required.','',...proposal.patches.map(p=>'- '+p.path+' — '+p.controlId)]
  if(proposal.manualActions.length) lines.push('','### Manual actions not automated',...proposal.manualActions.map(x=>'- '+x))
  lines.push('','RepoGuardian cannot merge this pull request.')
  return github.openDraftPullRequest(proposal.repository,proposal.branch,proposal.baseBranch,'fix: RepoGuardian remediation proposal',lines.join('\n'))
}

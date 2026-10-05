import { describe,expect,it,vi } from 'vitest'
import { executeProposal } from '../src/github-adapter.js'
import type { ExecutionProposal } from '../src/executor.js'
describe('GitHub execution boundary',()=>{
 it('creates a branch, writes patches and opens a draft PR through the port',async()=>{
  const proposal:ExecutionProposal={repository:'o/r',branch:'repoguardian/remediation-1',baseBranch:'main',patches:[{path:'SECURITY.md',content:'safe',controlId:'security/policy'}],manualActions:['Add tests'],draft:true,mergeAllowed:false}
  const port={findOpenPullRequest:vi.fn(async()=>undefined),createBranch:vi.fn(async()=>{}),createFile:vi.fn(async()=>{}),openDraftPullRequest:vi.fn(async()=>({url:'https://example.invalid/pr/1',number:1}))}
  const result=await executeProposal(proposal,port); expect(result.number).toBe(1);expect(port.createBranch).toHaveBeenCalledOnce();expect(port.createFile).toHaveBeenCalledOnce();expect(port.openDraftPullRequest).toHaveBeenCalledOnce()
 })
 it('refuses a proposal that permits self-merge',async()=>{
  const proposal={repository:'o/r',branch:'x',baseBranch:'main',patches:[],manualActions:[],draft:true,mergeAllowed:true} as unknown as ExecutionProposal
  const port={findOpenPullRequest:vi.fn(),createBranch:vi.fn(),createFile:vi.fn(),openDraftPullRequest:vi.fn()}
  await expect(executeProposal(proposal,port)).rejects.toThrow(/Unsafe/)
 })
 it('returns an existing remediation PR without writing again',async()=>{
  const proposal:ExecutionProposal={repository:'o/r',branch:'repoguardian/remediation-1',baseBranch:'main',patches:[],manualActions:[],draft:true,mergeAllowed:false}
  const port={findOpenPullRequest:vi.fn(async()=>({url:'existing',number:7})),createBranch:vi.fn(),createFile:vi.fn(),openDraftPullRequest:vi.fn()}
  const result=await executeProposal(proposal,port);expect(result.number).toBe(7);expect(port.createBranch).not.toHaveBeenCalled();expect(port.openDraftPullRequest).not.toHaveBeenCalled()
 })
})

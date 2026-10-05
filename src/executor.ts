import { renderPatch, type FilePatch } from './templates.js'
import type { RemediationPlan } from './types.js'
export interface ExecutionProposal { repository:string; branch:string; baseBranch:string; patches:readonly FilePatch[]; manualActions:readonly string[]; draft:true; mergeAllowed:false }
export function createExecutionProposal(plan:RemediationPlan, baseBranch='main'):ExecutionProposal {
 if(plan.directMainWrites!==false) throw new Error('Unsafe plan: direct default-branch writes are forbidden')
 const patches=plan.actions.map(renderPatch).filter((x):x is FilePatch=>Boolean(x))
 const manualActions=plan.actions.filter(a=>!renderPatch(a)).map(a=>a.title)
 const slug=plan.generatedAt.replace(/[^0-9]/g,'').slice(0,14)
 return {repository:plan.repository,branch:'repoguardian/remediation-'+slug,baseBranch,patches,manualActions,draft:true,mergeAllowed:false}
}

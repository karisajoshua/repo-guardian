import { describe,expect,it } from 'vitest'
import { createExecutionProposal } from '../src/executor.js'
import type { RemediationPlan } from '../src/types.js'
describe('execution proposal',()=>{
 it('renders safe patches and leaves high-risk work manual',()=>{const p:RemediationPlan={repository:'o/r',sourceSchemaVersion:'1.0',sourceScore:50,generatedAt:'2026-10-05T12:30:00.000Z',directMainWrites:false,actions:[{controlId:'security/policy',title:'security',kind:'add-file',risk:'low',targetPath:'SECURITY.md',rationale:'missing',requiresHumanApproval:true},{controlId:'quality/tests',title:'tests',kind:'manual-review',risk:'high',rationale:'missing',requiresHumanApproval:true}]};const x=createExecutionProposal(p);expect(x.branch).toMatch(/^repoguardian\//);expect(x.patches).toHaveLength(1);expect(x.manualActions).toEqual(['tests']);expect(x.draft).toBe(true);expect(x.mergeAllowed).toBe(false)})
 it('refuses unsafe plans',()=>expect(()=>createExecutionProposal({...({} as RemediationPlan),directMainWrites:true as false})).toThrow(/Unsafe/))
})

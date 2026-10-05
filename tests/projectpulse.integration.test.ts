import { describe,expect,it } from 'vitest'
import { createRemediationPlan } from '../src/planner.js'
import { createExecutionProposal } from '../src/executor.js'
import type { ProjectPulseReport } from '../src/types.js'

describe('ProjectPulse to RepoGuardian integration',()=>{
 it('turns a v1 health report into safe executable and manual work',()=>{
  const report:ProjectPulseReport={schemaVersion:'1.0',repository:'karisajoshua/example',generatedAt:'2026-10-05T00:00:00.000Z',health:{score:45,level:'critical',components:[
   {id:'docs/readme',label:'README',points:0,maxPoints:15,explanation:'README missing'},
   {id:'security/policy',label:'Security',points:0,maxPoints:10,explanation:'Security policy missing'},
   {id:'quality/tests',label:'Tests',points:0,maxPoints:20,explanation:'Tests missing'},
   {id:'governance/license',label:'License',points:10,maxPoints:10,explanation:'License present'}
  ]}}
  const plan=createRemediationPlan(report,new Date('2026-10-05T12:00:00Z')); const execution=createExecutionProposal(plan)
  expect(plan.actions.map(a=>a.controlId)).toEqual(['docs/readme','security/policy','quality/tests'])
  expect(execution.patches.map(p=>p.path)).toEqual(['README.md','SECURITY.md'])
  expect(execution.manualActions).toEqual(['Add automated tests'])
  expect(execution.draft).toBe(true);expect(execution.mergeAllowed).toBe(false)
 })
})

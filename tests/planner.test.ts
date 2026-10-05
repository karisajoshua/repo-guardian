import { describe,expect,it } from 'vitest'
import { createRemediationPlan } from '../src/planner.js'
import type { ProjectPulseReport } from '../src/types.js'
const report:ProjectPulseReport={schemaVersion:'1.0',repository:'owner/repo',generatedAt:'2026-10-05T00:00:00.000Z',health:{score:55,level:'attention',components:[{id:'docs/readme',label:'README',points:0,maxPoints:15,explanation:'Add README'},{id:'automation/ci',label:'CI',points:0,maxPoints:20,explanation:'Add CI'},{id:'security/policy',label:'Security',points:10,maxPoints:10,explanation:'Present'}]}}
describe('createRemediationPlan',()=>{
 it('plans only failed controls and forbids direct main writes',()=>{const p=createRemediationPlan(report,new Date('2026-10-05T01:00:00Z'));expect(p.actions).toHaveLength(2);expect(p.directMainWrites).toBe(false);expect(p.actions.every(a=>a.requiresHumanApproval)).toBe(true)})
 it('rejects unsupported ProjectPulse reports',()=>expect(()=>createRemediationPlan({...report,schemaVersion:'2.0' as '1.0'})).toThrow(/Unsupported/))
})

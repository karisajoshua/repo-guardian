import { describe,expect,it } from 'vitest'
import { remediationFor } from '../src/policy.js'
describe('remediation policy',()=>{
 it('does not remediate a passing control',()=>expect(remediationFor({id:'docs/readme',label:'README',points:15,maxPoints:15,explanation:'ok'})).toBeUndefined())
 it('requires manual review for licensing',()=>expect(remediationFor({id:'governance/license',label:'License',points:0,maxPoints:10,explanation:'missing'})).toMatchObject({kind:'manual-review',risk:'high',requiresHumanApproval:true}))
})

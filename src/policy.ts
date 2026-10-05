import type { PulseComponent, RemediationAction } from './types.js'

const policies: Record<string,(c:PulseComponent)=>RemediationAction> = {
  'docs/readme': c => action(c,'Add repository documentation','add-file','README.md','low'),
  'governance/license': c => action(c,'Review and add an explicit license','manual-review',undefined,'high'),
  'automation/ci': c => action(c,'Add continuous integration','add-workflow','.github/workflows/ci.yml','medium'),
  'security/policy': c => action(c,'Add responsible security reporting guidance','add-file','SECURITY.md','low'),
  'community/contributing': c => action(c,'Add contribution guidance','add-file','CONTRIBUTING.md','low'),
  'quality/tests': c => action(c,'Add automated tests','manual-review',undefined,'high'),
  'maintenance/activity': c => action(c,'Review repository maintenance status','manual-review',undefined,'medium')
}
function action(c:PulseComponent,title:string,kind:RemediationAction['kind'],targetPath: string|undefined,risk:RemediationAction['risk']):RemediationAction { return {controlId:c.id,title,kind,risk,...(targetPath?{targetPath}:{}),rationale:c.explanation,requiresHumanApproval:true} }
export function remediationFor(component:PulseComponent):RemediationAction|undefined { return component.points < component.maxPoints ? policies[component.id]?.(component) : undefined }
